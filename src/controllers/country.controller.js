
import { Country } from '../models/country.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos los paises
export const getCountries = async(req,res)=> {
        const result = await getAllModels(Country);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un pais especifico
//Parametros: id
export const getCountryById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Country, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Country not found', error: result.error });
    }
}


//Metodo que crea un nuevo pais
//Parametros:  name
export const createCountry =  async(req,res)=> {
    const {name } = req.body;
    const result = await createModel(Country, { name });
    if (result.success) {
        res.status(result.status).json({ message: 'Country created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un pais
//Parametros: id, name
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
 

//Metodo que elimina un pais
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


//Metodo que trae un pais por su nombre
//Parametros: name
export const getCountryByName = async(req,res)=>{
    const { name } = req.params;
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    console.log(nameCapitalize);
    const result = await getModelByParameterOne(Country,"name" ,nameCapitalize);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        console.log("Entra");
        res.status(result.status).json({ message: 'Country not found', error: result.error });
    }
}
