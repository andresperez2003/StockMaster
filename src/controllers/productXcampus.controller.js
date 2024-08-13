
import { decodeAccessToken } from '../middleware/token.js';
import { Campus } from '../models/campus.model.js';
import { Product } from '../models/product.model.js';
import { ProductXCampus } from '../models/productXcampus.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByIdWithJoin, getAllModelsWithJoin, searchOperation, addOperation, updateOperation, deleteOperation, hasPermissRol, hasPermissUser} from "./general.controller.js"


const module = "ProductXCampus"

//Metodo que devuelve todos las partes de un producto
export const getProductXCampus = async(req,res)=> {
        const token = req.headers.authorization;  
        if(!token) return res.status(401).json({message:"Token is required"})  
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getAllModelsWithJoin(ProductXCampus,
        ["id","quantity_available"],
        [
            {model: Campus, required:true},
            {model: Product, required:true}
        ]
    );
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
    const token = req.headers.authorization;  
        if(!token) return res.status(401).json({message:"Token is required"})  
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByIdWithJoin(ProductXCampus,id,["id","quantity_available"],
        [
            {model: Campus, required:true},
            {model: Product, required:true}
        ]
    );
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
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    if( !id_product || !id_campus || !quantity_available) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXCampus = await ProductXCampus.findOne({ where: { id_product: id_product, id_campus: id_campus  } });
    if (existingProductXCampus) {
        let new_quantity = existingProductXCampus.quantity_available + quantity_available
        let update_quantity = await updateModel(ProductXCampus, existingProductXCampus.id, {  quantity_available:new_quantity });
        return res.status(update_quantity.status).json({ message: 'ProductXCampus updated' });
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
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const productXcampus =  await getModelById(ProductXCampus, id);

    if(productXcampus.success){
        if (!id_product) id_product = productXcampus.model.id_product
        if (!id_campus) id_campus = productXcampus.model.id_campus
        if (!quantity_available) quantity_available = productXcampus.model.quantity_available
    }else{
        res.status(productXcampus.status).json({ message: productXcampus.message, error:productXcampus.error });
    }
    
    const existingProductXCampus = await ProductXCampus.findOne({ where: { id_product: id_product, id_campus: id_campus  } });
    
    if (existingProductXCampus && existingProductXCampus.id != id) {
            
            let new_quantity = existingProductXCampus.quantity_available + quantity_available
            const update_quantity = await updateModel(ProductXCampus, existingProductXCampus.id, {  quantity_available:new_quantity });
            await deleteModel(ProductXCampus, id)
            return res.status(update_quantity.status).json({ message: 'ProductXCampus updated' });
        }
    

    const result = await updateModel(ProductXCampus, id, { id_campus, id_product, quantity_available });
    
    if (result.success) {
        return res.status(result.status).json({ message: 'ProductXCampus updated' });
    } else {
        return res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteProductXCampus = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;  
        if(!token) return res.status(401).json({message:"Token is required"})  
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
        const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await deleteModel(ProductXCampus, id);
    if (result.success) {
        res.status(result.status).json({ message: 'productxcampus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}