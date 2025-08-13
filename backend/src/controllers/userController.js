import * as userService from "../services/userService.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ erro: "Preencha corretamente os campos de cadastro." });
        }

        if (name.length < 3 || name > 30) {
            return res.status(400).json({ erro: "O nome de usuário deve ter entre 3 a 30 caracteres." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ erro: "Formato de e-mail inválido" });
        }
        
        if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
            return res.status(400).json({ erro: "A senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula e um número" });
        }

        const newUser = await userService.createUser(name, email, password);

        if (newUser?.erro) {
            return res.status(400).json(newUser);
        }
        if (newUser?.message)  {
            return res.status(201).json(newUser);
        }
    } catch (err) {
        return res.status(500).json({ erro: `Erro inesperado ${err}` });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ erro: "Preencha os campos de usuário e senha" });
        }

        const userLogin = await userService.login(email, password);

        if (userLogin?.erro) {
            return res.status(400).json(userLogin);
        }

        if (userLogin?.message) {
            const userId = userLogin.userId;
            const username = userLogin.username;
            
            const token = jwt.sign (
                {
                    userId: userId,
                    username: username
                }, process.env.SECRET, { expiresIn: '1h' }
            );

            return res.status(200).json({ message: "Logado como " + username, token: token });
        }
    } catch (err) {
        return res.status(500).json({ erro: "Erro inesperado " + err });
    }
}