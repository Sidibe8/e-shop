const Product = require('../models/Product.model');

// Contrôleur pour gérer la création d'un nouveau produit
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body; // Supprimez "image" de la déstructuration
        const image = req.file.path.replace(/\\/g, '/'); // Remplacer tous les anti-slashes par des slashes
        const product = new Product({
            name,
            price,
            description,
            image,
            category // Ajout du champ "category"
        });
        await product.save();
        res.status(201).json({ success: true, message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
    }
};

// Contrôleur pour récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
};

// Contrôleur pour récupérer un produit par son ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
    }
};

// Contrôleur pour mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        const options = { new: true }; // Retourner le document mis à jour
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, options);
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
    }
};

// Contrôleur pour supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.body.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
    }
};

