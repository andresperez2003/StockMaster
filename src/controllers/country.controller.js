
import { decodeAccessToken } from '../middleware/token.js';
import { Country } from '../models/country.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany, hasPermissRol, hasPermissUser, searchOperation, addOperation, updateOperation, deleteOperation} from "./general.controller.js"


const module = "Country"

//Metodo que devuelve todos los paises
export const getCountries = async(req,res)=> {
        const result = await getAllModels(Country);
        const token = req.headers.authorization;   
        
        if(!token) return res.status(401).json({message:"Token is required"})
        const dataToken = decodeAccessToken(token);
     
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingCountry = await Country.findOne({ where: { name: nameCapitalize } });
    if (existingCountry) {
        return res.status(400).json({ message: 'Cannot create a duplicate country' });
    }

    const result = await createModel(Country, { name:nameCapitalize });
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
    let { name } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const country = await getModelById(Country,id)

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if (nameCapitalize != country.name) {
        const existingOperation = await Country.findOne({ where: { name: nameCapitalize } });
        if(existingOperation) return res.status(400).json({ message: 'Cannot use a duplicate country name' });
    }

    if(!name){
        name = operation.model.name
    }else{
        name = nameCapitalize
    }


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
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);


    const result = await getModelByParameterOne(Country,"name" ,nameCapitalize);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Country not found', error: result.error });
    }
}
