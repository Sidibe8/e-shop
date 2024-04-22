const mongoose = require('mongoose');

// Schéma du modèle Product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

// Modèle Product basé sur le schéma
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
