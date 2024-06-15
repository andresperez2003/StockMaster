
import { Category } from '../models/category.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos las categorias
export const getCategories = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterMany(Category,"id_company",company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una categoria
//Parametros: id
export const getCategoryById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterMany(Category, "id_company", company);


    let categoryFound=false
    let categorySelected = null
    result.model.forEach(element => {
        if(element.id == id){
            categorySelected=element
            categoryFound=true        
        }
    });
    
    if(categoryFound) return res.status(result.status).json(categorySelected);
    if(!categoryFound) return res.status(404).json({ message: 'Rol not found', error: result.error });
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
    const { company, id } = req.params;
    let { name, description,id_company } = req.body;

    const categories =  await getModelByParameterMany(Category, "id_company", company);

    let categorySelected= null
    let categoryFound = false
    categories.model.forEach(element => {
        console.log(element);
        if(element.id == id ){
            categorySelected = element
        }
    });

    if(categoryFound) return res.status(404).json({message:"Cat4egory not found"})

    if (!name) name = categorySelected.name
    if (!description) description = categorySelected.description
    if (!id_company) id_company = categorySelected.id_company



    const result = await updateModel(Category, id, { name, description, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Category updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteCategory = async(req,res)=>{
    const { company, id } = req.params;
    const categories = await getModelByParameterMany(Category, "id_company", company)
    let categoryFound = false;
    for (const campusObj of categories.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Category, id);
            if (result.success) { 
                categoryFound= true;
                return res.status(result.status).json({ message: 'Category deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!categoryFound) {
        return res.status(404).json({ message: 'Rol not found' });
    }
}