
import { ProductXCampus } from '../models/productXcampus.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"




//Metodo que devuelve todos las partes de un producto
export const getProductXCampus = async(req,res)=> {
        const result = await getAllModels(ProductXCampus)
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getProductXCampusById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(ProductXCampus,id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'ProductXCampus not found', error: result.error });
    }
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createProductXCampus =  async(req,res)=> {
    const { id_product, id_campus, quantity_available } = req.body;

    if( !id_product || !id_campus || !quantity_available) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXCampus = await ProductXCampus.findOne({ where: { id_product: id_product, id_campus: id_campus  } });
    if (existingProductXCampus) {
        return res.status(400).json({ message: 'Cannot add a duplicated productxcampus' });
    }

    const result = await createModel(ProductXCampus, { id_campus, id_product, quantity_available });
    if (result.success) {
        res.status(result.status).json({ message: 'productxcampus added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateProductXCampus = async(req,res)=>{
    const { id } = req.params;
    let { id_product, id_campus, quantity_available } = req.body;

    const productXcampus =  await getModelById(ProductXCampus, id);

    if(productXcampus.success){
        if (!id_product) id_product = productXcampus.model.id_product
        if (!id_campus) id_campus = productXcampus.model.id_campus
        if (!quantity_available) quantity_available = productXcampus.model.quantity_available
    }else{
        res.status(productXcampus.status).json({ message: productXcampus.message, error:productXcampus.error });
    }

    const result = await updateModel(ProductXCampus, id, { id_campus, id_product, quantity_available });
    
    if (result.success) {
        res.status(result.status).json({ message: 'ProductXCampus updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteProductXCampus = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(ProductXCampus, id);
    if (result.success) {
        res.status(result.status).json({ message: 'productxcampus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}