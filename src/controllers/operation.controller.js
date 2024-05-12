
import { Operation } from '../models/operation.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"




//Metodo que devuelve todos las compañias
export const getOperation = async(req,res)=> {
        const result = await getAllModels(Operation);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un modelo especifico
//Parametros: nit
export const getOperationById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Operation, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Operation not found', error: result.error });
    }
}


//Metodo que crea un nuevo modelo
//Parametros: name, id_company
export const createOperation =  async(req,res)=> {
    const { name, id_module, id_company } = req.body;

    if(!name || !id_company || id_module) return res.status(400).json({message:"Fill all fields"})

    const result = await createModel(Operation, { name, id_module, id_module });
    if (result.success) {
        res.status(result.status).json({ message: 'Operation created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una compañia
//Parametros: name, id_masteruser, nit
export const updateOperation = async(req,res)=>{
    const { id } = req.params;
    let { name, id_module, id_company } = req.body;

    const module =  await getModelById(Operation, id);

    if(module.success){
        if (!name) name = module.model.dataValues.name
        if (!id_module) id_module = module.model.dataValues.id_module

    }else{
        res.status(module.status).json({ message: category.message, error:category.error });
    }

    const result = await updateModel(Module, id, { name, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Module updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteModule = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Module, id, namePrimaryKey);
    if (result.success) {
        res.status(result.status).json({ message: 'Module deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}