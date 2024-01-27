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

/**
 * Initialize Express app and controller instances.
 * 
 * app will be used as the main Express app instance.
 * productsController contains the route handlers.
*/
const app = express();
const productsController = new ProductsController();

/**
 * Configure middleware for handling requests.
 * 
 * - ejsLayouts: Template engine layouts
 * - express.json(): Parse JSON request bodies
 * - express.urlencoded(): Parse URL-encoded request bodies 
 * - express.static(): Serve static files from public folder
*/
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Set EJS as the view engine for Express.
 * Set the views directory to src/views.
 */
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));


/**
 * Handle GET request to root route.
 * 
 * Calls productsController.getProducts handler.
 */
app.get('/', productsController.getProducts);

/**
 * Handle GET request to add product page.
 * Calls productsController.getAddProduct handler.
 * 
 * Handle POST request to add new product.
 * Calls validateMiddleware middleware for validation.
 * Calls productsController.postAddProduct handler.
 */
app.get('/add-product', productsController.getAddProduct);
app.post('/', validateMiddleware, productsController.postAddProduct);

/**
 * Handle GET request to update product page.
 * Calls productsController.getUpdateProductView handler.
 * 
 * Handle POST request to update existing product.
 * Calls productsController.postUpdateProduct handler.
 */
app.get('/update-product/:id', productsController.getUpdateProductView);
app.post('/update-product', productsController.postUpdateProduct);

/**
 * Handle GET request to delete a product.
 * 
 * Calls productsController.deleteProduct handler to delete 
 * the product with the given id.
 */
app.get('/delete-product/:id', productsController.deleteProduct);

/**
 * Start the Express server listening on port 3000.
 * Log a message when the server starts.
 */
app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
