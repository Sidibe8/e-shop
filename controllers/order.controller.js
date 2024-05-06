const Order = require('../models/order.models');

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount, shippingAddress, paymentMethod } = req.body;

        // Créer la nouvelle commande
        const newOrder = await Order.create({
            userId,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        res.status(201).json({ message: 'Commande créée avec succès', order: newOrder });
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la commande." });
    }
};

// Obtenir toutes les commandes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.productId')
            .populate('userId');
        res.status(200).json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commandes." });
    }
};

// Obtenir toutes les commandes de l'utilisateur actuel
exports.getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.id;

        // Récupérer toutes les commandes associées à l'ID utilisateur spécifié
        const orders = await Order.find({ userId }).populate('products.productId')
            .populate('userId');

        // Vérifier si des commandes ont été trouvées
        if (orders.length > 0) {
            res.status(200).json(orders); // Retourner les commandes trouvées
        } else {
            res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur." });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commandes de l'utilisateur." });
    }
};


// Obtenir une commande par son ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Commande non trouvée.' });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la commande." });
    }
};

// Mettre à jour le statut de paiement d'une commande
exports.updatePaymentStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status, paymentDate } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { paymentStatus: status, paymentDate }, { new: true });
        if (order) {
            res.status(200).json({ message: 'Statut de paiement de la commande mis à jour avec succès', order: order });
        } else {
            res.status(404).json({ message: 'Commande non trouvée.' });
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de paiement de la commande :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du statut de paiement de la commande." });
    }
};
