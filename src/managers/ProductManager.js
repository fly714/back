const fs = require('fs').promises;
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../data/products.json');

class ProductManager {
    async read(){
        const raw = await fs.readFile(PRODUCTS_PATH, 'utf-8');
        return JSON.parse(raw);
    }

    async write(data){
        await fs.writeFile(PRODUCTS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getAll(){
        return await this.read();
    }

    async getById(id){
        const products = await this.read();
        return products.find(p => p.id === id) || null;
    }

    async create(data){
        const products = await this.read();
        if (!data.producto || data.precio == null) {
            const error = new Error('Faltan campos obligatorios: producto y precio');
            error.status = 400;
            throw error;
        }
        const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

        const newProduct = {
            id: nextId,
            producto: data.producto,
            precio: data.precio,
            descripcion: data.descripcion || '',
            stock: data.stock != null ? data.stock : 0
        };
        
        products.push(newProduct);
        await this.write(products);
        return newProduct;
    }

    async update(id, data){
        const products = await this.read();
        const idx = products.findIndex(p => p.id === id);
        if (idx === -1) return null;

        const {id: ignored, ...rest} = data;
        products[idx] = { ...products[idx], ...rest };
        await this.write(products);
        return products[idx];
    }

    async delete(id){
        const products = await this.read();
        const idx = products.findIndex(p => p.id === id);
        if (idx === -1) return false;
        products.splice(idx, 1);
        await this.write(products);
        return true;
    }

}
module.exports = ProductManager;
