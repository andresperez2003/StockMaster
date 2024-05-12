
import { json } from 'sequelize';
import { ProductXSupplier } from '../models/productXsupplier.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"


//Metodo que devuelve todos los roles
export const getProductXSupplier = async(req,res)=> {
        const result = await getAllModels(ProductXSupplier);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un rol especifico
//Parametros: id
export const getProductXSupplierById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(ProductXSupplier, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'ProductXSupplier not found', error: result.error });
    }
}


//Metodo que crea un nuevo rol
//Parametros: name, description
export const createProductXSupplier =  async(req,res)=> {
    const { id_product, id_supplier, id_company } = req.body;

    if( !id_supplier ||!id_product|| !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXSupplier = await ProductXSupplier.findOne({ where: { id_company: id_company, id_product: id_product, id_supplier: id_supplier  } });
    if (existingProductXSupplier) {
        return res.status(400).json({ message: 'Cannot add a duplicated supplier to a product' });
    }

    const result = await createModel(ProductXSupplier, { id_product, id_supplier, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier added to Product' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un rol
//Parametros: name, description
export const updateProductXSupplier = async(req,res)=>{
    const { id } = req.params;
    let { id_product, id_supplier, id_company } = req.body;

    const productxpart =  await getModelById(ProductXSupplier, id);

    if(productxpart.success){
        if (!id_product) id_product = productxpart.model.dataValues.id_product
        if (!id_supplier) id_supplier = productxpart.model.dataValues.id_supplier
        if (!id_company) id_company = productxpart.model.dataValues.id_company
    }else{
        res.status(productxpart.status).json({ message: part.message, error:part.error });
    }

    const result = await updateModel(ProductXSupplier, id, { id_product, id_supplier, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier of the product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteProductXSupplier = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(ProductXSupplier, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier of the product deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}