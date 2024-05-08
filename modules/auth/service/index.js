"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = require("../../../config/db/config");
const jwt = __importStar(require("jsonwebtoken"));
const customError_1 = require("../../../common/customError");
const validation_1 = require("../../../common/validation");
const signUpSchemaValidation_1 = require("../validator/signUpSchemaValidation");
const validator_1 = require("../validator");
const user_entity_1 = require("../../../entities/user/user.entity");
const otp_entity_1 = require("../../../entities/user/otp.entity");
const typeorm_1 = require("typeorm");
const service_1 = require("../../notification/service");
class AuthService {
    /**
     * Generate OTP for the given request.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<boolean>} - returns true if OTP is generated successfully
     */
    generateOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, validator_1.generateOTPSchema);
            yield this.validateGenerateOTP(validatedData.phone, validatedData.operationType);
            const otpRepository = config_1.AppDataSource.getRepository(otp_entity_1.OTP);
            const otp = this.generateRandomOTP();
            const otpToBeCreated = otpRepository.create({
                otp: otp,
                expiresAt: new Date(new Date().getTime() + 5 * 60000),
                destination: validatedData.phone
            });
            yield otpRepository.save(otpToBeCreated);
            return true;
        });
    }
    /**
     * Verify the OTP and sign up the user.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<any>} - an object containing the JWT token, user details, and refresh token
     */
    verifyOTPAndSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = (0, validation_1.validateRequest)(req.body, signUpSchemaValidation_1.signUpSchema);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            yield this.verifyOTP(validatedData.phone, validatedData.otp);
            const userToBeCreated = userRepository.create({
                name: validatedData.name,
                phone: validatedData.phone,
                email: validatedData.email
            });
            const createdUser = yield userRepository.save(userToBeCreated);
            const payload = { phone: validatedData.phone, id: createdUser.id };
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
            createdUser.refreshToken = refreshToken;
            yield userRepository.save(createdUser);
            delete createdUser.refreshToken;
            return { jwt: jwtToken, user: createdUser, refreshToken: refreshToken };
        });
    }
    /**
     * Login with OTP.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<any>} an object containing the JWT token, user information, and refresh token
     */
    loginWithOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, otp } = (0, validation_1.validateRequest)(req.body, validator_1.verifyOTPSchema);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            yield this.verifyOTP(phone, otp);
            let user = yield userRepository.findOne({ where: { phone: phone } });
            if (!user) {
                const userToBeCreated = userRepository.create({
                    name: '',
                    phone: phone,
                });
                user = yield userRepository.save(userToBeCreated);
                yield service_1.notificationService.addNotification({ title: `New user signed up with Number: ${phone}`, path: `/users` });
            }
            const payload = { phone: user.phone, id: user.id, role: 'user' };
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
            user.refreshToken = refreshToken;
            yield userRepository.save(user);
            delete user.refreshToken;
            return { jwt: jwtToken, user: user, refreshToken: refreshToken };
        });
    }
    /**
     * Refreshes the user's JWT token and updates the refresh token.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<any>} an object containing the new JWT token, the user object, and the updated refresh token
     */
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            const decodedToken = yield jwt.verify(refreshToken, process.env.JWT_SECRET);
            const userRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const { id: userId } = decodedToken;
            const user = yield userRepository.findOne({ where: { id: userId, refreshToken } });
            if (!user) {
                throw (0, customError_1.CustomError)("User does not exist", 404);
            }
            const payload = { phone: user.phone, id: user.id };
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            const updatedRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
            user.refreshToken = updatedRefreshToken;
            yield userRepository.save(user);
            delete user.refreshToken;
            return { jwt: jwtToken, user: user, refreshToken: updatedRefreshToken };
        });
    }
    //---------------- Helper Functions -------------------//
    /**
 * Verifies the provided OTP for the given destination.
 *
 * @param {string} destination - The destination for which the OTP is being verified.
 * @param {number} otp - The OTP to be verified.
 * @return {Promise<boolean>} Returns true if the OTP is valid and has been successfully verified, otherwise false.
 */
    verifyOTP(destination, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpRepository = config_1.AppDataSource.getRepository(otp_entity_1.OTP);
            const otpExist = yield otpRepository.findOne({
                where: {
                    destination,
                    otp,
                    isActive: true,
                    expiresAt: (0, typeorm_1.MoreThan)(new Date())
                }
            });
            if (!otpExist) {
                throw (0, customError_1.CustomError)('Invalid OTP OR OTP did not exist', 401);
            }
            otpExist.isActive = false;
            yield otpRepository.save(otpExist);
            return true;
        });
    }
    /**
 * Validates and generates an OTP for the specified phone number and operation type.
 *
 * @param {string} phone - The phone number to validate and generate OTP for.
 * @param {OperationType} operationType - The type of operation to perform.
 * @return {boolean} Returns true if the validation and OTP generation is successful.
 */
    validateGenerateOTP(phone, operationType) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpRepository = config_1.AppDataSource.getRepository(otp_entity_1.OTP);
            const usersRepository = config_1.AppDataSource.getRepository(user_entity_1.Users);
            const otpExist = yield otpRepository.exist({ where: { destination: phone, isActive: true, expiresAt: (0, typeorm_1.MoreThan)(new Date()) } });
            if (otpExist) {
                throw (0, customError_1.CustomError)('You have already requested an OTP', 400);
            }
            // const user = await usersRepository.exist({ where: { phone: phone } });
            // if(operationType === OperationType.SIGN_UP && user){
            //         throw CustomError("You are already registered with us, please login", 400)
            // }
            // if(operationType === OperationType.LOGIN && !user){
            //         throw CustomError("You are not registered with us, please register", 400)
            // }
            return true;
        });
    }
    /**
    * Generates a random one-time password (OTP).
    *
    * @return {number} The randomly generated OTP.
    */
    generateRandomOTP() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.authService = new AuthService();
