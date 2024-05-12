
import { json } from 'sequelize';
import { Product } from '../models/product.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"



//Metodo que devuelve todos los productos
export const getProducts = async(req,res)=> {
        const result = await getAllModels(Product);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un producto especifico
//Parametros: id
export const getProductById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Product, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Product not found', error: result.error });
    }
}


//Metodo que crea un nuevo producto
//Parametros:  name, price, quantity, description, photo, status,discount, id_category, id_company
export const createProduct =  async(req,res)=> {
    const { name, price, quantity, description, photo, status,discount, id_category, id_company } = req.body;
    if(!name || !price || !quantity || !description || !photo || !discount || !id_category || !id_company) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingProduct = await Product.findOne({ where: { name: nameCapitalize } });
    
    if (existingProduct) {
        return res.status(400).json({ message: 'Cannot create a duplicate product' });
    }

    const result = await createModel(Product, { name, price, quantity, description, photo, status,discount, id_category, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Product created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un producto
//Parametros: id, name, price, quantity, description, photo, status,discount, id_category, id_company
export const updateProduct = async(req,res)=>{
    const { id } = req.params;
    let { name, price, quantity, description, photo, status,discount, id_category, id_company } = req.body;

    const product =  await getModelById(Product, id);

    if(product.success){
        if (!name) name = product.model.dataValues.name
        if (!price) price = product.model.dataValues.price
        if (!quantity) quantity = product.model.dataValues.quantity
        if (!description) description = product.model.dataValues.description
        if (!photo) photo = product.model.dataValues.photo
        if (!discount) discount = product.model.dataValues.discount
        if (!id_category) id_category = product.model.dataValues.id_category
        if (!id_company) id_company = product.model.dataValues.id_company
    }else{
        res.status(product.status).json({ message: product.message, error:product.error });
    }

    const result = await updateModel(Product, id, { name, price, quantity, description, photo, status,discount, id_category, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una producto
//Parametros: id
export const deleteProduct = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Product, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Product deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}