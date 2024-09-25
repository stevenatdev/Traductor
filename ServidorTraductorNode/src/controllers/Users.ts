import { Request, Response } from 'express';
import Users from '../models/users';
import bcrypt from 'bcrypt';

const ControllerUsers = {
    newUser: async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        console.log(req.body);


        // Validamos si ya existe el usuario mediante el email
        const userEmail = await Users.findOne({ where: { email } });
        if (userEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email: ${email}`
            })
        }

        // Encriptamos la contraseña
        const hashPassword = await bcrypt.hash(password, 10);

        // Guardamos los datos
        try {
            await Users.create({
                name: name,
                email: email,
                password: hashPassword
            });
            res.json({ msg: `Te has registrado correctamente` });
        } catch (error) {
            res.status(500).json({ msg: 'Error al registrar el usuario' });
        }
    }
}

export default ControllerUsers