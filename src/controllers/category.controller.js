
import { Category } from '../models/category.model.js'; // Importa el modelo Company que defines en otro archivo
import {createModel, updateModel, deleteModel, getModelByParameterMany, searchOperation, addOperation, updateOperation, deleteOperation, hasPermissRol, hasPermissUser} from "./general.controller.js"
import { decodeAccessToken } from "../middleware/token.js"

const module = "Category"


//Metodo que devuelve todos las categorias
export const getCategories = async(req,res)=> {
        const {company} = req.params
        const token = req.headers.authorization;  
        if(!token) return res.status(401).json({message:"Token is required"})  
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
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
    if(!categoryFound) return res.status(404).json({ message: 'Category not found', error: result.error });
}


//Metodo que crea una nueva categoria
//Parametros: name, description
export const createCategory =  async(req,res)=> {
    const { name, description, id_company } = req.body;
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    if(!name) return res.status(400).json({message:"Fill all fields"})

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);


    const existingCategoria = await Category.findOne({ where: { name: nameCapitalize } });
    if (existingCategoria) {
        return res.status(400).json({ message: 'Cannot create a duplicate category' });
    }
    
        const result = await createModel(Category, { name:nameCapitalize, description, id_company });



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
    const token = req.headers.authorization;   
    if(!token) return res.status(401).json({message:"Token is required"}) 
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    let { name, description,id_company } = req.body;

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const categories =  await getModelByParameterMany(Category, "id_company", company);

    let categorySelected= null
    let categoryFound = false
    categories.model.forEach(element => {
        if(element.id == id ){
            categorySelected = element
            categoryFound=true
        }
    });


    
    if (nameCapitalize != categorySelected.name) {
        const existingCategoria = await Category.findOne({ where: { name: nameCapitalize } });
        if(existingCategoria) return res.status(400).json({ message: 'Cannot use a duplicate category name' });
    }

    if(!categoryFound) return res.status(404).json({message:"Category not found"})

    if (!name){
        name = categorySelected.name
    }else{
        name = nameCapitalize
    }
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
    const token = req.headers.authorization;   
    if(!token) return res.status(401).json({message:"Token is required"}) 
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    
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