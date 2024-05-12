

import { Part } from '../models/part.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"



//Metodo que devuelve todos las partes
export const getParts = async(req,res)=> {
        const result = await getAllModels(Part);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una parte especifica
//Parametros: id
export const getPartById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Part, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Part not found', error: result.error });
    }
}


//Metodo que crea una nueva parte
//Parametros: name, quantity, price, unit, photo, id_company 
export const createPart =  async(req,res)=> {
    const { name, quantity, price, unit, photo, id_company } = req.body;

    if(!name  || !quantity || !price  ||!photo || !id_company) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingPart = await Part.findOne({ where: { name: nameCapitalize } });
    if (existingPart) {
        return res.status(400).json({ message: 'Cannot create a duplicate part' });
    }

    const result = await createModel(Part, { name, quantity, price, unit, photo, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Part created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una parte
//Parametros: id, name, quantity, price, unit, photo, id_company 
export const updatePart = async(req,res)=>{
    const { id } = req.params;
    let { name, quantity, price,unit, photo } = req.body;

    const part =  await getModelById(Part, id);

    if(part.success){
        if (!name || name=='') name = part.model.dataValues.name
        if (!quantity) quantity = part.model.dataValues.quantity
        if (!price) price = part.model.dataValues.price
        if (!photo || photo=='') photo = part.model.dataValues.photo
        if (!unit) unit = part.model.dataValues.unit
    }else{
        res.status(part.status).json({ message: part.message, error:part.error });
    }

    const result = await updateModel(Part, id, { name, quantity, price, unit, photo });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Part updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte
//Parametros: id
export const deletePart = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Part, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Part deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}