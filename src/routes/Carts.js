const { Router } = require('express');
const CartManager = require('../managers/CartManager');
const router = Router();

const cartManager = new CartManager();

router.post('/', async (req, res) => {
    const newCart = await cartManager.create();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if (result?.error === 'Carrito no encontrado') return res.status(404).json({ error: 'Carrito no encontrado' });
    if (result?.error === 'Producto no encontrado') return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(201).json(result);
});

module.exports = router;