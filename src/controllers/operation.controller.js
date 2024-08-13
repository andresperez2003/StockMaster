
import { Operation } from '../models/operation.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, searchOperation, addOperation, updateOperation, deleteOperation, hasPermissRol, hasPermissUser} from "./general.controller.js"
import { decodeAccessToken } from "../middleware/token.js"

const module = "Operation"


//Metodo que devuelve todos las operaciones
export const getOperations = async(req,res)=> {
        const result = await getAllModels(Operation);
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

//Metodo que trae una operacion
//Parametros: id
export const getOperationById = async(req,res)=>{
    const { id } = req.params;        const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    
    const result = await getModelById(Operation, id);


    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Operation not found', error: result.error });
    }
}


//Metodo que crea una nueva operacion
//Parametros: name
export const createOperation =  async(req,res)=> {
    const { name } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    if(!name) return res.status(400).json({message:"Fill all fields"})

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    console.log(nameCapitalize);
    
    const existingOperation = await Operation.findOne({ where: { name: nameCapitalize } });
    if (existingOperation) {
        return res.status(400).json({ message: 'Cannot create a duplicate operation' });
    }


    const result = await createModel(Operation, { name:nameCapitalize });
    if (result.success) {
        res.status(result.status).json({ message: 'Operation created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateOperations = async(req,res)=>{
    const { id } = req.params;
    let { name } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const operation = await getModelById(Operation,id)
    
    if(!name){
        name = operation.model.name
    }else{
        name = nameCapitalize
    }



    if (nameCapitalize != operation.name) {
        const existingOperation = await Operation.findOne({ where: { name: nameCapitalize } });
        if(existingOperation) return res.status(400).json({ message: 'Cannot use a duplicate operation name' });
    }

    const result = await updateModel(Operation, id, { name });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Operation updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteOperations = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await deleteModel(Operation, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Operation deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
    
}