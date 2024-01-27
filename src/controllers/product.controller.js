import ProductModel from '../models/product.model.js';

class ProductsController {
  /**
   * Gets all products from the ProductModel and renders the index page with the products data.
  */
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  /**
   * Renders the new product page.
   * 
   * @param {Object} req - The request object
   * @param {Object} res - The response object 
   * @param {Function} next - The next middleware function
   */
  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null,
    });
  }
  /**
   * Adds a new product using the request body, 
   * gets all products from the model, 
   * and renders the index page with the updated products.
  */
  postAddProduct(req, res, next) {
    ProductModel.add(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  /**
   * Renders the update product page if the product is found, 
   * otherwise returns a 401 status.
   * 
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  getUpdateProductView(req, res, next) {
    //If product exists, return view; else return err
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render('update-product', {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.status(401).send("Product not found");
    }
  }
  /**
   * Updates a product using the request body,
   * gets all products from the model, 
   * and renders the index page with the updated products.
  */
  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }
  /**
   * Deletes a product by ID.
   * 
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound)
      return res.status(401).send("Product not found");
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

}


export default ProductsController;
