const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const cartController = require('../controllers/cart.controller');
const categoryController = require('../controllers/category.controller');
const orderController = require('../controllers/order.controller');
const upload = require('../config/multer.config');
const verifyToken = require('../middlewares/verifyToken');

// Route pour récupérer tous les utilisateurs
router.get('/users', userController.getAllUsers);
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

// Routes pour les produits
router.get('/products', productController.getAllProducts);
router.post('/products', upload.single('image'), productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products', productController.deleteProduct);

// Routes pour le panier
router.post('/cart/add', verifyToken, cartController.addToCart);
// Routes pour le panier
router.delete('/cart/remove', cartController.removeFromCart);
// Route pour effacer le panier d'un utilisateur
// Modifier la route pour effacer le panier d'un utilisateur
router.delete('/cart/clear', cartController.clearUserCart);


// Routes pour les catégories
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.get('/categories/:id', categoryController.getCategoryById);
// router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories', categoryController.deleteCategory);

// / Route pour passer une commande
router.post('/orders', verifyToken, orderController.createOrder);
router.get('/orders/user/:id', verifyToken, orderController.getOrdersByUserId);

module.exports = router;
