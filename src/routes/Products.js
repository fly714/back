const { Router } = require("express")
const ProductManager = require("../managers/ProductManager")
const router = Router()

const prodMan = new ProductManager()

router.get("/", async (req, res) => {
    const products = await prodMan.getAll()
    res.json(products)
})

router.get("/:pid", async (req, res) => {
    const products = await prodMan.getById(req.params.pid)
    if (!products) return res.status(404).json({ error: "Producto no encontrado" })
        res.json(products)
})

router.post("/", async (req, res) => {
    try {
        const newProduct = await prodMan.create(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message })
    }
})

router.put("/:pid", async (req, res) => {
    const updatedProduct = await prodMan.update(req.params.pid, req.body)
    if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" })
    res.json(updatedProduct)
})

router.delete("/:pid", async (req, res) => {
    const deleted = await prodMan.delete(req.params.pid)
    if (!deleted) return res.status(404).json({ error: "Producto no encontrado" })
    res.json({ message: "Producto eliminado" })
})

module.exports = router