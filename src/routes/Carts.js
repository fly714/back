const { Router } = require('express');
const CartManager = require('../managers/CartsManager.js');
const router = Router();

const cartManager = new CartManager();

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if (result?.error === 'Carrito no encontrado') return res.status(404).json({ error: 'Carrito no encontrado' });
    if (result?.error === 'Producto no encontrado') return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(201).json(result);
});

module.exports = router;