import Cart from "../models/cartModel.js";
import connectionDb from "../config/connectionDb.js";


const addToCart = async (userId, productId, quantity = 1) => {
    await connectionDb();
    
    try {
        let cart = await Cart.findOne({ userId: userId });

        if (cart === null) {
            cart = new Cart({
                userId: userId,
                items: [{ productId: productId, quantity: quantity }]
            });
        }

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId: productId, quantity: quantity });
        }

        await cart.save();
        return cart
    } catch (err) {
        return { erro: err};
    }
}


export { addToCart }