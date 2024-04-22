const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Récupérer le token d'authentification à partir de l'en-tête Authorization
    const authHeader = req.headers['authorization'];

    // Vérifier si l'en-tête Authorization est présent
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No Token');
        return res.status(401).json({ message: 'No token provided' });
    }

    // Extraire le token du header
    const token = authHeader.split(' ')[1];

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Ajouter le payload décodé à l'objet de requête pour une utilisation ultérieure
        req.user = decoded.user;

        // Passer au middleware suivant
        next();
    } catch (error) {
        // En cas d'erreur de vérification du token
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Token verification failed' });
    }
}

module.exports = verifyToken;
