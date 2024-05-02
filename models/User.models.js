const mongoose = require('mongoose');

// Schéma du modèle User
const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    addresse: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        size: String, // Ajout de la taille
        color: String // Ajout de la couleur
    }],
    likedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Modèle User basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
