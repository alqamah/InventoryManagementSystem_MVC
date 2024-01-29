/**
 * Imports dependencies for the Express server.
 * 
 * Imports:
 * - express: The Express framework
 * - ProductsController: Controller for product routes 
 * - ejsLayouts: Template engine layouts 
 * - path: Node.js path module
 * - validateMiddleware: Custom middleware for validation
*/
import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validateMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';

const app = express();
const productsController = new ProductsController();
const userController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', productsController.getProducts);

app.get('/add-product', productsController.getAddProduct);
app.post('/', uploadFile.single('imageUrl'),validateMiddleware, productsController.postAddProduct);

app.get('/update-product/:id', productsController.getUpdateProductView);
app.post('/update-product', productsController.postUpdateProduct);

app.get('/delete-product/:id', productsController.deleteProduct);

app.get('/register', userController.getRegister);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
