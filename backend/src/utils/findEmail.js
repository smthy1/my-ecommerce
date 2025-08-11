import User from "../user/userModel.js";
import connectionDb from "../config/connectionDb.js";

const findEmail = async (email) => {
    await connectionDb();
    const user = await User.findOne({ email: email });
    return !!user;
}


export default findEmail