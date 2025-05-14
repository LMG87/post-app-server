// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define la carpeta de destino según el tipo de archivo
        let folder = 'uploads/images/users/others';
        if (file.fieldname === 'avatar') {
            folder = 'uploads/images/users/avatar';
        } else if (file.fieldname === 'post') {
            folder = 'uploads/images/users/post';
        }

        // Verificar si la carpeta existe; si no, crearla
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder); // Carpeta donde se guardan las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Solo imágenes (jpeg, jpg, png, gif) son permitidas'));
    }
};

// Multer middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

module.exports = upload;