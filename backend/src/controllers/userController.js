import * as userOperations from "../services/userService.js";


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ erro: "Preencha corretamente os campos de cadastro." });
    }

    if (name.length < 3 || name > 30) {
        return res.status(400).json({ erro: "O nome de usuário deve ter entre 3 a 30 caracteres." });
    }

    
}