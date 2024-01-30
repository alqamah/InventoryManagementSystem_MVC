import ProductModel from '../models/product.model.js';

class ProductsController {

  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products , userEmail: req.session.userEmail});
  }


  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null, userEmail: req.session.userEmail
    });
  }

  postAddProduct(req, res, next) {
    const imageUrl ='images/'+ req.file.filename; //file is received in the req.file and not req.body
    ProductModel.add(req.body, imageUrl);
    var products = ProductModel.getAll();
    res.render('index', { products , userEmail: req.session.userEmail});

  }


  getUpdateProductView(req, res, next) {
    //If product exists, return view; else return err
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render('update-product', {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail
      });
    } else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res, next) {
    const imageUrl ='images/'+ req.file.filename;
    ProductModel.update(req.body, imageUrl);
    var products = ProductModel.getAll();
    res.render('index', { products , userEmail: req.session.userEmail});
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound)
      return res.status(401).send("Product not found");
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render('index', { products , userEmail: req.session.userEmail});
  }

}


export default ProductsController;
