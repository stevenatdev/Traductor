import { Request, Response } from 'express';
import Translation from '../models/translation';

const ControllerTranslation = {
    getTranslation: async (req: Request, res: Response) => {
        const { text, from } = req.body;
        console.log('Buscando traducción para:', text, 'desde el idioma:', from);

        try {
            let translation;

            if (from === 'shuar') {
                // Buscar la traducción de Shuar a Español
                translation = await Translation.findOne({ where: { shuar: text } });
                if (translation && translation.getDataValue('espanol')) {
                    res.json({ translation: translation.getDataValue('espanol') });
                } else {
                    res.json({ translation: 'No se encontró la traducción.' });
                }
            } else if (from === 'espanol') {
                // Buscar la traducción de Español a Shuar
                translation = await Translation.findOne({ where: { espanol: text } });
                if (translation && translation.getDataValue('shuar')) {
                    res.json({ translation: translation.getDataValue('shuar') });
                } else {
                    res.json({ translation: 'No se encontró la traducción.' });
                }
            } else {
                res.status(400).json({ message: 'Idioma no soportado.' });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Error al realizar la traducción',
                error
            });
        }
    }
};

export default ControllerTranslation;
