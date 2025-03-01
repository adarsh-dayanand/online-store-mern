const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) =>{

    Category.findById(id).exec((err, category) =>{
        if(err){
            return res.status(400).json({ error: 'Category not found'})
        }
        req.category = category
        next();
    })
}

exports.createCategory = (req, res) =>{
    const category = new Category(req.body)
    category.save((err, category) =>{
        if(err){
            return res.status(400).json({ error: 'Not able to save category'})
        }
        res.json({category})
    })

}

exports.getCategory = (req, res) =>{
    return res.json(req.category)
}

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({ error: 'No categories found'})
        }

        res.json(categories)
    })
}

exports.updateCategory = (req, res) =>{
    const category = req.category
    category.name = req.body.name

    category.save((error, updateCategory)=>{
        if(error){
            return res.status(400).json({ error: 'No categories found'})
        }

        res.json(updateCategory)

    })

}

exports.removeCategory = (req, res)=>{
    const category = req.category

    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({ error: 'Failed to delete category'})
        }

        res.json({
            message: `${category.name} deleted successfully`
        })
    })

}