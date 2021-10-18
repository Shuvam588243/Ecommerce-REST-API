const Category = require('../../db/Category');
const slugify = require('slugify');
const {createCategoryValidation} = require('../../validation/createcategoryValidation');


function createCategories(categories, parentId = null)
{
    const categoryList = [];
    let category;
    if(parentId == null)
    {
        category = categories.filter( cat => cat.parentId == undefined);
    }
    else
    {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id : cate._id,
            name : cate.name,
            slug : cate.slug,
            children : createCategories(categories, cate._id)
        })
    }

    return categoryList;
}

exports.createCategory = async(req,res) => {
    try{
        await createCategoryValidation(req.body);

        const categoryObj = {
            name : req.body.name,
            slug : slugify(req.body.name)
        }
    
        if(req.body.parentId)
        {
            categoryObj.parentId = req.body.parentId;
        }
    
        const newCategory = await Category.create(categoryObj);
    
        if(newCategory)
        {
            res.status(200).json({ msg : `Category ${categoryObj.name} added successfully`})
        }
        else
        {
            res.status(400).json({ msg : 'Category Addition Failed ! ', data : newCategory})
        }
    }catch(error)
    {
        res.status(500).json({ error : error.message })
    }
}

exports.getCategories = async(req,res) => {
    const categories = await Category.find();
    if(!categories)
    {
        return res.status(400).json({ msg : 'No Category Found' })
    }
    else
    {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
    }
}