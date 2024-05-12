
import { Category } from '../models/category.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"




//Metodo que devuelve todos las categorias
export const getCategories = async(req,res)=> {
        const result = await getAllModels(Category);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una categoria
//Parametros: id
export const getCategoryById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Category, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Category not found', error: result.error });
    }
}


//Metodo que crea una nueva categoria
//Parametros: name, description
export const createCategory =  async(req,res)=> {
    const { name, description, id_company } = req.body;

    if(!name) return res.status(400).json({message:"Fill all fields"})

    const result = await createModel(Category, { name, description, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Category created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateCategory = async(req,res)=>{
    const { id } = req.params;
    let { name, description } = req.body;

    const category =  await getModelById(Category, id);

    if(category.success){
        if (!name) name = category.model.dataValues.name
        if (!description) description = category.model.dataValues.description
    }else{
        res.status(category.status).json({ message: category.message, error:category.error });
    }

    const result = await updateModel(Category, id, { name, description });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Category updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteCategory = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Category, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Category deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}