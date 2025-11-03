# back
# API de Productos y Carritos (Archivos JSON)

Servidor **Node.js + Express** para gestionar productos y carritos usando archivos `JSON` como persistencia.
Incluye rutas REST para **/api/products** y **/api/carts**, administradores (managers) y archivos de datos.


## Cómo ejecutar
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor (elige el script de `package.json` si existe):
   ```bash
   node index.js
   # o
   node src/index.js
   ```

3. El proyecto suele escuchar en `http://localhost:3000`.

## Ejemplos de uso (Postman)
### Productos
```bash
GET  /api/products
GET  /api/products/:pid
POST /api/products           
PUT  /api/products/:pid      
DELETE /api/products/:pid
```
### Carritos
```bash
POST /api/carts
GET  /api/carts/:cid
POST /api/carts/:cid/product/:pid
```

## Troubleshooting
- **Error 400 en POST**: asegúrate de enviar `Content-Type: application/json` y un body válido.
- **Archivo JSON no encontrado**: crea los archivos requeridos (p. ej., `products.json`, `carts.json`) con `[]` como contenido inicial o ajusta las rutas en los managers.
- **EADDRINUSE**: cambia el puerto o cierra procesos que usen el mismo.
- **CORS**: agrega el middleware `cors` si vas a consumir desde frontend.

