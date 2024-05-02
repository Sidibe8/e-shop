const User = require('../models/User.models');

const { ObjectId } = require('mongoose').Types;

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        console.log('productId', productId);

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Convertir productId en ObjectId si ce n'est pas déjà le cas
        const productObjectId = typeof productId === 'string' ? new ObjectId(productId) : productId;

        // Vérifier si le produit existe déjà dans le panier de l'utilisateur
        const existingProduct = user.cart.find(item => item.productId.equals(productObjectId));

        if (existingProduct) {
            // Le produit existe déjà, incrémenter la quantité
            existingProduct.quantity += 1; // Incrémentation de la quantité
        } else {
            // Si le produit n'existe pas encore dans le panier, l'ajouter avec une quantité de 1
            user.cart.push({ productId: productObjectId, quantity: 1 });
        }

        // Enregistrer les modifications dans la base de données
        await user.save();

        res.status(200).json({ message: "Produit ajouté au panier avec succès.", user: user });
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du produit au panier." });
    }
};







// Retirer un produit du panier d'un utilisateur
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Retirer le produit du panier de l'utilisateur
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);

        // Enregistrer les modifications dans la base de données
        await user.save();

        res.status(200).json({ message: "Produit retiré du panier avec succès.", user: user });
    } catch (error) {
        console.error("Erreur lors de la suppression du produit du panier :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du produit du panier." });
    }
};

// Vider le panier d'un utilisateur
exports.clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vider le panier de l'utilisateur
        user.cart = [];

        // Enregistrer les modifications dans la base de données
        await user.save();

        res.status(200).json({ message: "Panier vidé avec succès.", user: user });
    } catch (error) {
        console.error("Erreur lors de la suppression du panier de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du panier de l'utilisateur." });
    }
};
