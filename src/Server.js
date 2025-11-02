const express = require('express');
const productsRouter = require('../data/products.json');
const cartsRouter = require('../data/carts.json');
const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    res.send('API de Productos');
});

app.listen(PORT, () => {
    console.log(`Server corre en http://localhost:${PORT}`);
});
