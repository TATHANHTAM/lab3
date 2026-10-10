const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

let products = [
  { id: 1, name: 'Áo thun basic', price: 150000 },
  { id: 2, name: 'Quần jeans slim', price: 450000 },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { name, price } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || price === '' || price == null
      || !Number.isFinite(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({ error: 'Tên sản phẩm và giá lớn hơn 0 là bắt buộc' });
  }
  const newProduct = { id: Date.now(), name: name.trim(), price: Number(price) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  }
  products.splice(index, 1);
  res.json({ message: 'Đã xoá thành công' });
});

app.listen(5000, () => console.log('Backend chạy tại http://localhost:5000'));
