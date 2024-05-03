const Category = require('../models/category.models');

// Méthode pour créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour récupérer une catégorie par son ID
exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour supprimer une catégorie par son ID
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        console.log(req.body);
        console.log(categoryId);
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
    }
};