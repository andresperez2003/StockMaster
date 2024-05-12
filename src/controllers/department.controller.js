
import { Department } from '../models/department.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos las compañias
export const getDepartment = async(req,res)=> {
        const result = await getAllModels(Department);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una compañia especifica
//Parametros: nit
export const getDepartmentById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Department, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Department not found', error: result.error });
    }
}


//Metodo que crea una nueva compañia
//Parametros: nit, name, id_masteruser
export const createDepartment =  async(req,res)=> {
    const { name, id_country } = req.body;
    const result = await createModel(Department, { name, id_country });
    if (result.success) {
        res.status(result.status).json({ message: 'Department created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una compañia
//Parametros: name, id_masteruser, nit
export const updateDepartment = async(req,res)=>{
        const { id } = req.params;
    const { name, id_country } = req.body;
    const result = await updateModel(Country, id, { name, id_country });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Department updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteDepartment = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Department, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Department deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}


//Metodo que trae una compañia especifica
//Parametros: nit
export const getDepartmentByName = async(req,res)=>{
    const { name } = req.params;
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const result = await getModelByParameterOne(Department,"name", nameCapitalize);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Department not found', error: result.error });
    }
}

//Metodo que trae una compañia especifica
//Parametros: nit
export const getDepartmentByCountry = async(req,res)=>{
    const { country } = req.params;
    console.log("country ");


    const result = await getModelByParameterMany(Department,"id_country", country);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Department not found', error: result.error });
    } 
}
