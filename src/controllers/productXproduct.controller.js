
import { json } from 'sequelize';
import { ProductXProduct } from '../models/productXproduct.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos las partes de un producto
export const getProductXProduct = async(req,res)=> {
        const { company } = req.params
        const result = await getModelByParameterMany(ProductXProduct,"id_company", company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getProductXProductById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterMany(ProductXProduct, "id_company", company);

    let productxproductFound=false
    let productxproductSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            productxproductSelected=element
            productxproductFound=true        
        }
    });
    
    if(productxproductFound) return res.status(result.status).json(productxproductSelected);
    if(!productxproductFound) return res.status(404).json({ message: 'ProductXProduct not found', error: result.error });
    
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createProductXProduct =  async(req,res)=> {
    const { id_product, id_part, id_company } = req.body;

    if( !id_part ||!id_product || !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXProduct = await ProductXProduct.findOne({ where: { id_product: id_product, id_part: id_part, id_company:id_company  } });
    if (existingProductXProduct) {
        return res.status(400).json({ message: 'Cannot add a duplicated part to a product' });
    }

    const result = await createModel(ProductXProduct, { id_product, id_part, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Part added to Product' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateProductXProduct = async(req,res)=>{
    let { company , id } = req.params;
    let { id_product, id_part, id_company } = req.body;

    const productxparts =  await getModelByParameterMany(ProductXProduct, "id_company", company);

    let productxproductSelected= null
    let productxproductFound = false
    productxparts.model.forEach(element => {
        if(element.id == id ){
            productxproductSelected = element
            productxproductFound=true
        }
    });

    if(!productxproductFound) return res.status(404).json({message:"ProductXProduct not found"})




    if(productxparts.success){
        if (!id_product) id_product = productxproductSelected.id_product
        if (!id_part) id_part = productxproductSelected.id_part
        if (!id_company) id_company = productxproductSelected.id_company
    }else{
        res.status(productxparts.status).json({ message: productxparts.message, error:productxparts.error });
    }

    if(id_product != productxproductSelected.id_product || id_part != productxproductSelected.id_part || id_company != productxproductSelected.id_company){
        const existingProductXPart = await ProductXProduct.findOne({ where: { id_product: id_product, id_part: id_part, id_company:id_company  } });
        if (existingProductXPart) {
            return res.status(400).json({ message: 'Cannot add a duplicated part to a product' });
        }  
    }


    const result = await updateModel(ProductXProduct, id, { id_product, id_part,id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Part of the product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteProductXProduct = async(req,res)=>{
    const { company, id } = req.params;
    const productxparts = await getModelByParameterMany(ProductXProduct, "id_company", company)
    let productxproductFound = false;

    for (const campusObj of productxparts.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(ProductXProduct, id);
            if (result.success) { 
                productxproductFound= true;
                return res.status(result.status).json({ message: 'ProductXProduct deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!productxproductFound) {
        return res.status(404).json({ message: 'ProductXProduct not found' });
    }
}