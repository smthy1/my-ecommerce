import Product from '../models/productModel.js';
import connectionDb from '../config/connectionDb.js';


const createProduct = async (name, description, price, category, image) => {
    await connectionDb();
    try {
        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            image: image
        });

        await newProduct.save();
        return { message: "Produto cadastrado." };
    } catch (err) {
        return { erro: err };
    }
}


const getAllProducts = async () => {
    await connectionDb();
    return await Product.find();
}


const updateProductPrice = async (productName, newPrice) => {
    await connectionDb();
    
    try {
        const filter = { name: productName };
        const update = { price: newPrice };
        const request = await Product.findOneAndUpdate(filter, update);

        if(request === null) {
            return { erro: "Produto não encontrado" };
        }

        return { message: "Preço alterado com sucesso." };
    } catch (err) {
        return { erro: err };
    }
}


const deleteProduct = async (productName) => {
    await connectionDb();
    
    try {
        const target = await Product.findOneAndDelete({ name: productName });
        if (target === null) {
            return { erro: "Produto não encontrado" };
        }
        
        return { message: "Produto deletado" };
    } catch (err) {
        return { erro: err };
    }
}


export { createProduct, getAllProducts, updateProductPrice, deleteProduct }