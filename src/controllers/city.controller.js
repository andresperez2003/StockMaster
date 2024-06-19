
import { City } from '../models/city.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos las ciudades
export const getCities = async(req,res)=> {
        const result = await getAllModels(City);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una ciudad especifica
//Parametros: id
export const getCityById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(City, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'City not found', error: result.error });
    }
}


//Metodo que crea una nueva ciudad
//Parametros: name, id_department
export const createCity =  async(req,res)=> {
    const { name, id_department, postal_code } = req.body;


    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    
    const existingCity = await City.findOne({ where: { name: nameCapitalize } });
    if (existingCity) {
        return res.status(400).json({ message: 'Cannot create a duplicate city' });
    }

    const result = await createModel(City, { nameCapitalize, id_department, postal_code });
    if (result.success) {
        res.status(result.status).json({ message: 'City created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una ciudad
//Parametros: name, id_department
export const updateCity = async(req,res)=>{
    const { id } = req.params;
    const { name, id_department } = req.body;

    const city = await getModelById(City,id)
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if (nameCapitalize != city.name) {
        const existingCity = await City.findOne({ where: { name: nameCapitalize } });
        if(existingCity) return res.status(400).json({ message: 'Cannot use a duplicate city name' });
    }


    if(!name){
        name = city.model.name
    }else{
        name = nameCapitalize
    }
    
    const result = await updateModel(City, id, { name, id_department });
    
    if (result.success) {
        res.status(result.status).json({ message: 'City updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una ciudad
//Parametros: id
export const deleteCity = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(City, id);
    if (result.success) {
        res.status(result.status).json({ message: 'City deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}


//Metodo que trae una ciudad especifica
//Parametros: nit
export const getCityByName = async(req,res)=>{
    const { name } = req.params;
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const result = await getModelByParameterOne(City,"name",nameCapitalize);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'City not found', error: result.error });
    }
}


//Metodo que trae una ciudad especifica
//Parametros: nit
export const getCityByDepartment = async(req,res)=>{
    const { department } = req.params;
    const result = await getModelByParameterMany(City,"id_department" ,department);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'City not found', error: result.error });
    }
}
