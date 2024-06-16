
import { json } from 'sequelize';
import { ProductXPart } from '../models/productXpart.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos las partes de un producto
export const getProductXParts = async(req,res)=> {
        const { company } = req.params
        const result = await getModelByParameterMany(ProductXPart,"id_company", company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getProductXPartById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterMany(ProductXPart, "id_company", company);

    let productxpartFound=false
    let productxpartSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            productxpartSelected=element
            productxpartFound=true        
        }
    });
    
    if(productxpartFound) return res.status(result.status).json(productxpartSelected);
    if(!productxpartFound) return res.status(404).json({ message: 'ProductXPart not found', error: result.error });
    
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createProductXPart =  async(req,res)=> {
    const { id_product, id_part, id_company } = req.body;

    if( !id_part ||!id_product || !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXPart = await ProductXPart.findOne({ where: { id_product: id_product, id_part: id_part, id_company:id_company  } });
    if (existingProductXPart) {
        return res.status(400).json({ message: 'Cannot add a duplicated part to a product' });
    }

    const result = await createModel(ProductXPart, { id_product, id_part, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Part added to Product' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateProductXPart = async(req,res)=>{
    let { company , id } = req.params;
    let { id_product, id_part,id_company } = req.body;

    const productxparts =  await getModelByParameterMany(ProductXPart, "id_company", company);

    let productxpartSelected= null
    let productxpartFound = false
    productxparts.model.forEach(element => {
        if(element.id == id ){
            productxpartSelected = element
            productxpartFound=true
        }
    });

    if(!productxpartFound) return res.status(404).json({message:"ProductXPart not found"})




    if(productxparts.success){
        if (!id_product) id_product = productxpartSelected.id_product
        if (!id_part) id_part = productxpartSelected.id_part
        if (!id_company) id_company = productxpartSelected.id_company
    }else{
        res.status(productxparts.status).json({ message: productxparts.message, error:productxparts.error });
    }

    const result = await updateModel(ProductXPart, id, { id_product, id_part,id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Part of the product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteProductXPart = async(req,res)=>{
    const { company, id } = req.params;
    const productxparts = await getModelByParameterMany(ProductXPart, "id_company", company)
    let productxpartFound = false;

    for (const campusObj of productxparts.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(ProductXPart, id);
            if (result.success) { 
                productxpartFound= true;
                return res.status(result.status).json({ message: 'ProductXPart deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!productxpartFound) {
        return res.status(404).json({ message: 'ProductXPart not found' });
    }
}