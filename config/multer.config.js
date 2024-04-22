const multer = require('multer');

// Configuration de Multer pour l'upload d'images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Le dossier où les fichiers seront enregistrés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom du fichier sauvegardé
    }
});

// Filtre pour n'accepter que certains types de fichiers (ici, des images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accepter le fichier
    } else {
        cb(new Error('Only images are allowed!'), false); // Rejeter le fichier
    }
};

// Configuration de Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
