
import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validateMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/last-visit.middleware.js';

const app = express();
const productsController = new ProductsController();
const userController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

//Inside the setLastVisit middleware, we are checking for the cookie in the req obj and if it's not found, 
//we are setting the cookie inside the res obj. The job of the cookie parser is to parse the data between req and res.
app.use(cookieParser()); //it parses the data from and b/w req and res objects
app.use(setLastVisit);

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', auth,productsController.getProducts);

app.get('/add-product',auth,productsController.getAddProduct);
app.post('/',auth,uploadFile.single('imageUrl'),validateMiddleware, productsController.postAddProduct);

app.get('/update-product/:id',auth,productsController.getUpdateProductView);
app.post('/update-product',auth,uploadFile.single('imageUrl'), productsController.postUpdateProduct);

app.get('/delete-product/:id',auth,productsController.deleteProduct);

app.get('/register', userController.getRegister);
app.get('/login', userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);
app.get('/logout', userController.getLogout);


app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
