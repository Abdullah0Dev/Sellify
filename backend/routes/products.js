const express = require('express')
const {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController')

const router = express.Router()
// get all the products data
router.get('/', getProducts)
// get a single  Product by its id
router.get('/:id', getProduct)

// POST a new Product
router.post('/', addProduct)

// DELETE  a Product
router.delete('/:id', deleteProduct)

// UPDATE A PRODUCT
router.put('/:id', updateProduct)

module.exports = router