
import { Operation } from '../models/operation.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos las operaciones
export const getOperations = async(req,res)=> {
        const result = await getAllModels(Operation);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una operacion
//Parametros: id
export const getOperationById = async(req,res)=>{
    const { id } = req.params;
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

    if(!name) return res.status(400).json({message:"Fill all fields"})

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const existingOperation = await Operation.findOne({ where: { name: nameCapitalize } });
    if (existingOperation) {
        return res.status(400).json({ message: 'Cannot create a duplicate operation' });
    }


    const result = await createModel(Operation, { nameCapitalize });
    if (result.success) {
        res.status(result.status).json({ message: 'Operation created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateOperation = async(req,res)=>{
    const { id } = req.params;
    let { name } = req.body;

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
export const deleteOperation = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Operation, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Operation deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
    
}