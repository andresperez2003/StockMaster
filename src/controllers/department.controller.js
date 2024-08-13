
import { decodeAccessToken } from '../middleware/token.js';
import { Department } from '../models/department.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany, hasPermissRol, hasPermissUser, searchOperation, addOperation, updateOperation, deleteOperation} from "./general.controller.js"

const module = "Department"


//Metodo que devuelve todos los departamentos
export const getDepartment = async(req,res)=> {
        const result = await getAllModels(Department);
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

//Metodo que trae un departamento especifico
//Parametros: id
export const getDepartmentById = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelById(Department, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Department not found', error: result.error });
    }
}


//Metodo que crea un nuevo departamento
//Parametros: name, id_country
export const createDepartment =  async(req,res)=> {
    const { name, id_country } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingDepartment = await Department.findOne({ where: { name: nameCapitalize, id_country:id_country } });
    if (existingDepartment) {
        return res.status(400).json({ message: 'Cannot create a duplicate department' });
    }

    const result = await createModel(Department, { name:nameCapitalize, id_country });
    if (result.success) {
        res.status(result.status).json({ message: 'Department created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un pais
//Parametros: id, name, id_country
export const updateDepartment = async(req,res)=>{
    const { id } = req.params;
    let { name, id_country } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const department = await getModelById(Department,id)

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if (nameCapitalize != department.name || id_country != department.id_country) {
        const existingDepartment = await Department.findOne({ where: { name: nameCapitalize, id_country:id_country } });
        if(existingDepartment) return res.status(400).json({ message: 'Cannot use a duplicate department name' });
    }

    if(!name){
        name = department.model.name
    }else{
        name = nameCapitalize
    }
    if(!id_country){
        name = department.model.id_country
    }else{
        name = id_country
    }
    

    const result = await updateModel(Department, id, { name, id_country });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Department updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina un pais
//Parametros: id
export const deleteDepartment = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await deleteModel(Department, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Department deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}


//Metodo que trae un pais por su nombre
//Parametros: name
export const getDepartmentByName = async(req,res)=>{
    const { name } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const result = await getModelByParameterOne(Department,"name", nameCapitalize);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Department not found', error: result.error });
    }
}

//Metodo que trae los departamentos por pais
//Parametros: id_country
export const getDepartmentByCountry = async(req,res)=>{
    const { country } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const result = await getModelByParameterMany(Department,"id_country", country);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Department not found', error: result.error });
    } 
}
