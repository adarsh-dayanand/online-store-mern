const Product = require('../models/product')
const formidable = require('formidable')
const _= require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product)=>{
        if(err){
            return res.status(400).json({
                error: 'Product not found'
            })
        }

        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    //form-data
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: 'Problem with file'
            })
        }

        //Destructure the fields
        //Restriction on fields

        const {price, name, description, category, stock} = fields
        const product = new Product(fields)

        if(
            !name ||
            !description ||
            !category ||
            !price
        ){
            return res.status(400).json({
                error : 'Please include all fields'
            })
        }

        //handle file here

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: 'File is too large!'
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }        

        //Save to database
        
        product.save((err, prod) => {
        //console.log(prod);

            if(err){ 
                console.log(err);
                return res.status(400).json({error: 'Failed to create product'})
            }

            res.json(prod)
        })

    })

}


exports.getProduct = (req, res) =>{

    req.product.photo = undefined

    return res.json(req.product)
}

//Middleware - load data
exports.photo = (req, res, next) =>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

//Delete
exports.deleteProduct = (req, res)=>{
    const product = req.product

    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({error: 'Error in deleting'})
        }

        res.json({message : 'Deletion successful', deletedProduct})

    })
}

//Update
exports.updateProduct = (req, res)=>{
    //form-data
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: 'Problem with file'
            })
        }

        //updation code
        var product = req.product
        product = _.extend(product, fields)

        //handle file here

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: 'File is too large!'
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }        

        //Save to database
        product.save((err, prod) => {

            if(err){ 
                console.log(err);
                
                return res.status(400).json({error: 'Updation failed'})
            }

            res.json(prod)
        })

    })
}

//Product listing 
exports.getAllProducts = (req, res) =>{
    const limit = req.query.limit ? parseInt(req.query.limit) : 8
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, 'asc']])
        .limit(limit)
        .exec((err, products) =>{
            if(err){
                res.status(400).json({error: 'Product listing failed'})
            }

            res.json(products)
        })
}

exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct('category', {}, (err, categories)=>{
        if(err){ return res.status(400).json({error: 'Category listing failed'}) }

        res.json(categories)
    })
}

//middleware to frontend
exports.updateStock = (req, res, next) =>{
    const myOperations = req.body.order.products.map(prod => {
        return {
            updateOne : {
                filter: {_id: prod._id},
                update: {$inc : {stock: -prod.count , sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products)=>{
        if(err){ return res.status(400).json({error: 'Bulk operation failed'})}
        next()
    })

}

