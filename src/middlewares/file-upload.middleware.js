import multer from "multer";

/**diskStorage()
 * Configures the multer disk storage settings.
 * This handles where uploaded files are stored on disk.
 */
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => { //destination 
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => { //filename
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

/**
 * Configures multer middleware to handle file uploads. 
 * Uses the storageConfig to determine where files are stored.
 */
export const uploadFile = multer({
    storage: storageConfig,
});