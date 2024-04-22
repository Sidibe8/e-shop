const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/index.routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

// Middleware CORS
app.use(cors());

// Utiliser cookieParser comme middleware
app.use(cookieParser());

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Appelez la fonction db pour établir la connexion à la base de données
connectDB();

// Utilisez express.static pour servir les fichiers statiques depuis le répertoire "uploads"
app.use('/uploads', express.static('uploads'));


app.use('/api', router)






const PORT = process.env.PORT || 4000; // Utilisation du port par défaut 3000 si PORT n'est pas défini dans l'environnement

app.listen(PORT, function () {
    console.log('Server is listening on port ' + PORT);
});
