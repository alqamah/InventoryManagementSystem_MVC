
import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validateMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';

const app = express();
const productsController = new ProductsController();
const userController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
/**
 * Configures session middleware using the given options.
 * - `secret` is the secret key used to sign session cookies.
 * - `resave` forces session to be saved even if unmodified.
 * - `saveUninitialized` saves new sessions that have not been modified. 
 * - `cookie.secure` sets the secure flag on session cookies.
 */
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
})); //session configured

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', auth,productsController.getProducts);

app.get('/add-product',auth,productsController.getAddProduct);
app.post('/',auth,uploadFile.single('imageUrl'),validateMiddleware, productsController.postAddProduct);

app.get('/update-product/:id',auth,productsController.getUpdateProductView);
app.post('/update-product',auth,productsController.postUpdateProduct);

app.get('/delete-product/:id',auth,productsController.deleteProduct);

app.get('/register', userController.getRegister);
app.get('/login', userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
