import ProductModel from '../models/product.model.js';

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null,
    });
  }

  postAddProduct(req, res, next) {
    ProductModel.add(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  getUpdateProductView(req, res, next) {
    //Step 1: If product exists, return view; else return err
    const id = req.params.id;
    console.log('id:',id);
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render('update-product', {
        product: productFound,
        errorMessage: null,
      });
    }else{
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res){
      ProductModel.update(req.body);
      var products = ProductModel.getAll();
      res.render('index', { products });
  }
}


export default ProductsController;
