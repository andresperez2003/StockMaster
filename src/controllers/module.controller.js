
import { Module } from '../models/module.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, searchOperation, hasPermissRol, hasPermissUser, addOperation, updateOperation, deleteOperation} from "./general.controller.js"
import { decodeAccessToken } from "../middleware/token.js"

const module = "Module"

//Metodo que devuelve todos low modulow
export const getModules = async(req,res)=> {
        const result = await getAllModels(Module);

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

//Metodo que trae un modulo
//Parametros: id
export const getModuleById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Module, id);
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Module not found', error: result.error });
    }
}


//Metodo que crea una nueva operacion
//Parametros: name
export const createModule =  async(req,res)=> {
    let { name, description } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    if(!name) return res.status(400).json({message:"Fill all fields"})
    if(!description) description =""
    
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const existingModule = await Module.findOne({ where: { name: nameCapitalize } });
    if (existingModule) {
        return res.status(400).json({ message: 'Cannot use a duplicate module name' });
    }


    const result = await createModel(Module, { name: nameCapitalize,description });
    if (result.success) {
        res.status(result.status).json({ message: 'Module created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un modulo
//Parametros: name, description
export const updateModule = async(req,res)=>{
    const { id } = req.params;
    let { name,description } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const findModule = await getModelById(Module,id)

    if(!name){
        name = findModule.model.name
    }else{
        name = nameCapitalize
    }
    if(!description) description = findModule.model.description


    if (nameCapitalize != findModule.name) {
        const existingModule = await Module.findOne({ where: { name: nameCapitalize } });
        if(existingModule) return res.status(400).json({ message: 'Cannot create a duplicate module' });
    }

    const result = await updateModel(Module, id, { name, description });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Module updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina un modulo
//Parametros: id
export const deleteModule = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    const result = await deleteModel(Module, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Module deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}