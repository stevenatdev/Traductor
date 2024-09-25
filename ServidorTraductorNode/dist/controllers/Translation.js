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
const translation_1 = __importDefault(require("../models/translation"));
const ControllerTranslation = {
    getTranslation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { text, from } = req.body;
        console.log('Buscando traducción para:', text, 'desde el idioma:', from);
        try {
            let translation;
            if (from === 'shuar') {
                // Buscar la traducción de Shuar a Español
                translation = yield translation_1.default.findOne({ where: { shuar: text } });
                if (translation && translation.getDataValue('espanol')) {
                    res.json({ translation: translation.getDataValue('espanol') });
                }
                else {
                    res.json({ translation: 'No se encontró la traducción.' });
                }
            }
            else if (from === 'espanol') {
                // Buscar la traducción de Español a Shuar
                translation = yield translation_1.default.findOne({ where: { espanol: text } });
                if (translation && translation.getDataValue('shuar')) {
                    res.json({ translation: translation.getDataValue('shuar') });
                }
                else {
                    res.json({ translation: 'No se encontró la traducción.' });
                }
            }
            else {
                res.status(400).json({ message: 'Idioma no soportado.' });
            }
        }
        catch (error) {
            res.status(500).json({
                message: 'Error al realizar la traducción',
                error
            });
        }
    })
};
exports.default = ControllerTranslation;
