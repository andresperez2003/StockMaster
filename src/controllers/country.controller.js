
import { Country } from '../models/country.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos las compañias
export const getCountries = async(req,res)=> {
        const result = await getAllModels(Country);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una compañia especifica
//Parametros: nit
export const getCountryById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Country, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Country not found', error: result.error });
    }
}


//Metodo que crea una nueva compañia
//Parametros: nit, name, id_masteruser
export const createCountry =  async(req,res)=> {
    const { nit, name, id_masteruser } = req.body;
    const result = await createModel(Country, { name });
    if (result.success) {
        res.status(result.status).json({ message: 'Country created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una compañia
//Parametros: name, id_masteruser, nit
export const updateCountry = async(req,res)=>{
        const { id } = req.params;
    const { name } = req.body;
    const result = await updateModel(Country, id, { name });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Country updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteCountry = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Country, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Country deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}


//Metodo que trae una compañia especifica
//Parametros: nit
export const getCountryByName = async(req,res)=>{
    const { name } = req.params;
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const result = await getModelByParameterOne(Country,"name" ,nameCapitalize);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Country not found', error: result.error });
    }
}
