"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ControllerUsers = {
    newUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        console.log(req.body);
        // Validamos si ya existe el usuario mediante el email
        const userEmail = yield users_1.default.findOne({ where: { email } });
        if (userEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: ${email}`
            });
        }
        // Encriptamos la contraseña
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        // Guardamos los datos
        try {
            yield users_1.default.create({
                name: name,
                email: email,
                password: hashPassword
            });
            res.json({ msg: `Te has registrado correctamente` });
        }
        catch (error) {
            res.status(500).json({ msg: 'Error al registrar el usuario' });
        }
    })
};
exports.default = ControllerUsers;
