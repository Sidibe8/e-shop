const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.models');

// Créer un nouvel utilisateur
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, address, password } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet numero est déjà utilisé.' });
        }
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Créer un nouvel utilisateur avec le mot de passe hashé
        const newUser = await User.create({ firstName, lastName, phoneNumber, address, password: hashedPassword });
        res.status(201).json({ message: 'Utilisateur créé avec succès', data: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
};

// Connecter un utilisateur
exports.loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'Numero ou mot de passe incorrect.' });
        }
        // Vérifier si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Numero ou mot de passe incorrect.' });
        }
        // Générer un jeton JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });
        res.status(200).json({ message: 'Utilisateur connecté avec succès', user, token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur', error: error.message });
    }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        // Récupérer l'utilisateur avec le panier et les produits aimés peuplés
        const user = await User.findById(userId)
            .populate('cart.productId')
            .populate('likedProducts');
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
    }
};

// Mettre à jour les informations d'un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, address, password } = req.body;
        // Hasher le nouveau mot de passe si fourni
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        // Mettre à jour l'utilisateur avec les nouvelles données
        const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, address, password: hashedPassword }, { new: true });
        if (updatedUser) {
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès', data: updatedUser });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: error.message });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
};
