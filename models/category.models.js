const mongoose = require('mongoose');

// Schéma du modèle Category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

// Modèle Category basé sur le schéma
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
