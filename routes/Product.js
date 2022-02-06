const express = require('express');
const router = express.Router();
const { uploadimage } = require('../multer/multer');
const mongoose = require('mongoose');
const Product = require('../models/product_model');
const checkAuthentication = require('../middleware/check_authentication');


router.post('/add', checkAuthentication, uploadimage.single('product_image'), (req,res, next) => {
    let product_image = '';
    const product = req.body;
    const userdata = req.userData
    if(req.file) {
        product_image = req.file.filename;

    }

    const addProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: product.title,
        price: product.price,
        brand: product.brand,
        description: product.description,
        image: product_image,
        user_id: userdata.user_id,
        created_at: new Date(),
        updated_at: new Date()
    })
    addProduct.save()
        .then(product_result => {
            res.status(200).json({
                message:'Product added successfully.',
                product_id: product_result._id
            })
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
        })
});

router.get('/', checkAuthentication, (req,res, next) => {
    const userdata = req.userData;
    Product.find({user_id:userdata.user_id})
        .exec()
        .then(product => {
            console.log(product);
            if(product.length < 1) {
                return res.status(200).json({
                  product: product,
                  message:"Product Not Found."  
                })
            } else {
                res.status(200).json({
                    product: product
                })
            }
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        })
           
});

router.post('/search', checkAuthentication, (req,res, next) => {
    const {query} = req.body;
    if(query.length <= 0) {
        return res.status(500).json({
            message: "Input valid search parameter."
        })
    }
    Product.find({ $text: { $search : query},})
        .limit(10)
        .exec()
        .then(product => {
            console.log(product)
            if(product.length < 1) {
                return res.status(401).json({
                  message:"Product Not Found."  
                })
            } else {
                res.status(200).json({
                    product: product
                })
            }
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        })
});

router.get('/client', (req,res, next) => {
    const userdata = req.userData;
    Product.find({})
        .exec()
        .then(product => {
            console.log(product);
            if(product.length < 1) {
                return res.status(200).json({
                  product: product,
                  message:"Product Not Found."  
                })
            } else {
                res.status(200).json({
                    product: product
                })
            }
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        })
           
});



router.get('/:product_id', checkAuthentication, (req,res, next) => {
    const product_id = req.params.product_id;
    Product.find({ _id : product_id })
        .exec()
        .then(product => {
            if(product.length < 1) {
                return res.status(401).json({
                  message:"Product Not Found."  
                })
            } else {
                res.status(200).json({
                    product: product[0]
                })
            }
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        })
           
});







router.delete('/:product_id', checkAuthentication, (req, res, next) => {
    const product_id = req.params.product_id;
    Product.remove({ _id: product_id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Deleted Successfully."
            })
        }).catch(error => {
            res.status(500).json({
                error: error
            })
        });
    
})



module.exports = router;
