
import { decodeAccessToken } from '../middleware/token.js';
import { City } from '../models/city.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany, hasPermissRol, hasPermissUser, searchOperation, addOperation, updateOperation, deleteOperation} from "./general.controller.js"


const module = "City"

//Metodo que devuelve todos las ciudades
export const getCities = async(req,res)=> {
        const result = await getAllModels(City);
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

//Metodo que trae una ciudad especifica
//Parametros: id
export const getCityById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(City, id);
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    if(!name || !id_department || !postal_code){
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    
    const existingCity = await City.findOne({ where: { name: nameCapitalize } });
    if (existingCity) {
        return res.status(400).json({ message: 'Cannot create a duplicate city' });
    }

    const result = await createModel(City, { name:nameCapitalize, id_department, postal_code });
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
    let { name, id_department } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


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
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
