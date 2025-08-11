import User from "../models/userModel.js";
import connectionDb from '../config/connectionDb.js';
import findEmail from "../utils/findEmail.js";
import bcrypt from 'bcrypt';

const createUser = async (name, email, password) => {
    await connectionDb();

    try {
        const query = await findEmail(email);

        if(query) {
            return { erro: "Email já cadastrado." }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        return { message: "Usuário cadastrado" };
    } catch (err) {
        return { erro: err };
    }
}


const login = async (email, password) => {
    await connectionDb();

    try {
        const query = findEmail(email);
        if(!query) {
            return { erro: "Email não cadastrado" };
        }

        const userCredentials = await User.findOne({ email: email });

        const hashedPassword = userCredentials.password;
        const compare = await bcrypt.compare(password, hashedPassword);

        if(!compare) {
            return { erro: "Credenciais inválidas." };
        }

        return { message: "Credenciais válidas." };
    } catch (err) {
        return { erro: err };
    }
}

const updateCart = async ()

export { createUser, login }