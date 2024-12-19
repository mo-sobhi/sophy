const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); 


const dbURL = 'mongodb://127.0.0.1:27017/book_store'; 
mongoose.connect(dbURL)
  .then(() => {
    console.log('Connected to Book Store DB');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


const bookSchema = new mongoose.Schema({
  book_id: Number,
  title: String,
  author: String,
  price: Number,
  stock: Number
});
const BookModel = mongoose.model("Books", bookSchema);


const customerSchema = new mongoose.Schema({
  customer_id: Number,
  name: String,
  email: String,
  phone: String,
  address: String
});
const CustomerModel = mongoose.model("Customers", customerSchema);

const salesSchema = new mongoose.Schema({
  sale_id: Number,
  customer_id: Number,
  book_id: Number,
  quantity: Number,
  sale_date: { type: Date, default: Date.now },
});
const SalesModel = mongoose.model("Sales", salesSchema);


app.post('/books', async (req, res) => {
  try {
    const newBook = new BookModel(req.body);
    await newBook.save();
    res.status(201).send(newBook);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/books/:id', async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.delete('/books/:id', async (req, res) => {
  try {
    const book = await BookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/customers', async (req, res) => {
  try {
    const newCustomer = new CustomerModel(req.body);
    await newCustomer.save();
    res.status(201).send(newCustomer);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/customers', async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/sales', async (req, res) => {
  try {
    const newSale = new SalesModel(req.body);
    await newSale.save();
    res.status(201).send(newSale);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/sales', async (req, res) => {
  try {
    const sales = await SalesModel.find();
    res.status(200).send(sales);
  } catch (err) {
    res.status(500).send(err);
  }
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running on port 4000');
});


const booksData = [
  {"book_id": 1, "title": "Book One", "author": "Author One", "price": 10.99, "stock": 100},
  {"book_id": 2, "title": "Book Two", "author": "Author Two", "price": 15.49, "stock": 150},
  {"book_id": 3, "title": "Book Three", "author": "Author Three", "price": 20.99, "stock": 80},
  {"book_id": 4, "title": "Book Four", "author": "Author Four", "price": 25.99, "stock": 60},
  {"book_id": 5, "title": "Book Five", "author": "Author Five", "price": 30.00, "stock": 50},
  {"book_id": 6, "title": "Book Six", "author": "Author Six", "price": 12.49, "stock": 40},
  {"book_id": 7, "title": "Book Seven", "author": "Author Seven", "price": 18.79, "stock": 200},
  {"book_id": 8, "title": "Book Eight", "author": "Author Eight", "price": 9.99, "stock": 300},
  {"book_id": 9, "title": "Book Nine", "author": "Author Nine", "price": 8.49, "stock": 120},
  {"book_id": 10, "title": "Book Ten", "author": "Author Ten", "price": 5.99, "stock": 250},
  {"book_id": 11, "title": "Book Eleven", "author": "Author Eleven", "price": 22.99, "stock": 75},
  {"book_id": 12, "title": "Book Twelve", "author": "Author Twelve", "price": 17.50, "stock": 100},
  {"book_id": 13, "title": "Book Thirteen", "author": "Author Thirteen", "price": 13.99, "stock": 150},
  {"book_id": 14, "title": "Book Fourteen", "author": "Author Fourteen", "price": 19.49, "stock": 90},
  {"book_id": 15, "title": "Book Fifteen", "author": "Author Fifteen", "price": 11.89, "stock": 180},
  {"book_id": 16, "title": "Book Sixteen", "author": "Author Sixteen", "price": 14.99, "stock": 65},
  {"book_id": 17, "title": "Book Seventeen", "author": "Author Seventeen", "price": 27.99, "stock": 40},
  {"book_id": 18, "title": "Book Eighteen", "author": "Author Eighteen", "price": 23.99, "stock": 30},
  {"book_id": 19, "title": "Book Nineteen", "author": "Author Nineteen", "price": 6.99, "stock": 70},
  {"book_id": 20, "title": "Book Twenty", "author": "Author Twenty", "price": 9.49, "stock": 60}
];


const customersData = [
  {"customer_id": 1, "name": "Customer One", "email": "customer1@example.com", "phone": "1234567890", "address": "Address One"},
  {"customer_id": 2, "name": "Customer Two", "email": "customer2@example.com", "phone": "1234567891", "address": "Address Two"},
  {"customer_id": 3, "name": "Customer Three", "email": "customer3@example.com", "phone": "1234567892", "address": "Address Three"},
  {"customer_id": 4, "name": "Customer Four", "email": "customer4@example.com", "phone": "1234567893", "address": "Address Four"},
  {"customer_id": 5, "name": "Customer Five", "email": "customer5@example.com", "phone": "1234567894", "address": "Address Five"},
  {"customer_id": 6, "name": "Customer Six", "email": "customer6@example.com", "phone": "1234567895", "address": "Address Six"},
  {"customer_id": 7, "name": "Customer Seven", "email": "customer7@example.com", "phone": "1234567896", "address": "Address Seven"},
  {"customer_id": 8, "name": "Customer Eight", "email": "customer8@example.com", "phone": "1234567897", "address": "Address Eight"},
  {"customer_id": 9, "name": "Customer Nine", "email": "customer9@example.com", "phone": "1234567898", "address": "Address Nine"},
  {"customer_id": 10, "name": "Customer Ten", "email": "customer10@example.com", "phone": "1234567899", "address": "Address Ten"},
  {"customer_id": 11, "name": "Customer Eleven", "email": "customer11@example.com", "phone": "1234567800", "address": "Address Eleven"},
  {"customer_id": 12, "name": "Customer Twelve", "email": "customer12@example.com", "phone": "1234567801", "address": "Address Twelve"},
  {"customer_id": 13, "name": "Customer Thirteen", "email": "customer13@example.com", "phone": "1234567802", "address": "Address Thirteen"},
  {"customer_id": 14, "name": "Customer Fourteen", "email": "customer14@example.com", "phone": "1234567803", "address": "Address Fourteen"},
  {"customer_id": 15, "name": "Customer Fifteen", "email": "customer15@example.com", "phone": "1234567804", "address": "Address Fifteen"},
  {"customer_id": 16, "name": "Customer Sixteen", "email": "customer16@example.com", "phone": "1234567805", "address": "Address Sixteen"},
  {"customer_id": 17, "name": "Customer Seventeen", "email": "customer17@example.com", "phone": "1234567806", "address": "Address Seventeen"},
  {"customer_id": 18, "name": "Customer Eighteen", "email": "customer18@example.com", "phone": "1234567807", "address": "Address Eighteen"},
  {"customer_id": 19, "name": "Customer Nineteen", "email": "customer19@example.com", "phone": "1234567808", "address": "Address Nineteen"},
  {"customer_id": 20, "name": "Customer Twenty", "email": "customer20@example.com", "phone": "1234567809", "address": "Address Twenty"}
];


const salesData = [
  {"sale_id": 1, "customer_id": 1, "book_id": 1, "quantity": 2},
  {"sale_id": 2, "customer_id": 2, "book_id": 2, "quantity": 1},
  {"sale_id": 3, "customer_id": 3, "book_id": 3, "quantity": 3},
  {"sale_id": 4, "customer_id": 4, "book_id": 4, "quantity": 4},
  {"sale_id": 5, "customer_id": 5, "book_id": 5, "quantity": 2},
  {"sale_id": 6, "customer_id": 6, "book_id": 6, "quantity": 1},
  {"sale_id": 7, "customer_id": 7, "book_id": 7, "quantity": 5},
  {"sale_id": 8, "customer_id": 8, "book_id": 8, "quantity": 2},
  {"sale_id": 9, "customer_id": 9, "book_id": 9, "quantity": 1},
  {"sale_id": 10, "customer_id": 10, "book_id": 10, "quantity": 4},
  {"sale_id": 11, "customer_id": 11, "book_id": 11, "quantity": 3},
  {"sale_id": 12, "customer_id": 12, "book_id": 12, "quantity": 2},
  {"sale_id": 13, "customer_id": 13, "book_id": 13, "quantity": 1},
  {"sale_id": 14, "customer_id": 14, "book_id": 14, "quantity": 5},
  {"sale_id": 15, "customer_id": 15, "book_id": 15, "quantity": 3},
  {"sale_id": 16, "customer_id": 16, "book_id": 16, "quantity": 2},
  {"sale_id": 17, "customer_id": 17, "book_id": 17, "quantity": 4},
  {"sale_id": 18, "customer_id": 18, "book_id": 18, "quantity": 3},
  {"sale_id": 19, "customer_id": 19, "book_id": 19, "quantity": 5},
  {"sale_id": 20, "customer_id": 20, "book_id": 20, "quantity": 4}
];


const insertData = async () => {
  await BookModel.insertMany(booksData);
  await CustomerModel.insertMany(customersData);
  await SalesModel.insertMany(salesData);
  console.log('Sample data inserted');
};


insertData();