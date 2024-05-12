
import { json } from 'sequelize';
import { ProductXPart } from '../models/productXpart.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"



//Metodo que devuelve todos los roles
export const getProductXParts = async(req,res)=> {
        const result = await getAllModels(ProductXPart);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un rol especifico
//Parametros: id
export const getProductXPartById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(ProductXPart, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'ProductXPart not found', error: result.error });
    }
}


//Metodo que crea un nuevo rol
//Parametros: name, description
export const createProductXPart =  async(req,res)=> {
    const { id_product, id_part, id_company } = req.body;

    if( !id_part ||!id_product|| !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXPart = await ProductXPart.findOne({ where: { id_company: id_company, id_product: id_product, id_part: id_part  } });
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


 
//Metodo que actualiza un rol
//Parametros: name, description
export const updateProductXPart = async(req,res)=>{
    const { id } = req.params;
    let { id_product, id_part, id_company } = req.body;

    const productxpart =  await getModelById(ProductXPart, id);

    if(productxpart.success){
        if (!id_product) id_product = productxpart.model.dataValues.id_product
        if (!id_part) id_part = productxpart.model.dataValues.id_part
        if (!id_company) id_company = productxpart.model.dataValues.id_company
    }else{
        res.status(productxpart.status).json({ message: part.message, error:part.error });
    }

    const result = await updateModel(ProductXPart, id, { id_product, id_part, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Part of the product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteProductXPart = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(ProductXPart, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Part of the product deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}