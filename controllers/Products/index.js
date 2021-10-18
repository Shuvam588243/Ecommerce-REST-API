const Product = require('../../db/Product');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = async(req,res) => {
    try{
        const {name,price,quantity,description, category, createdBy} = req.body;
        let productPictures = [];

        if(req.files.length > 0){
            req.files.map( file => {
                return { img : file.filename }
            })
        }

        const newProduct = {
            name,
            slug : slugify(name),
            price,
            quantity,
            description,
            productPictures,
            category,
            createdBy : req.user._id
        }
    
        const product = await Product.create(newProduct);
        res.status(200).json({ msg : 'Product Added Successfully '})
    }catch(error)
    {
        res.status(400).json({ error : error.message })
    }
  
}


exports.getProduct = (req,res) => {

}