
import { PartXCampus } from '../models/partXcampus.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getAllModelsWithJoin, getModelByIdWithJoin} from "./general.controller.js"
import { Operation } from '../models/operation.model.js';
import { Module } from '../models/module.model.js';



//Metodo que devuelve todos las partes de un producto
export const getPartXCampus = async(req,res)=> {
        const result = await getAllModels(PartXCampus)
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getPartXCampusById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(PartXCampus,id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'PartXCampus not found', error: result.error });
    }
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createPartXCampus =  async(req,res)=> {
    const { id_part, id_campus, quantity_available } = req.body;

    if( !id_part || !id_campus) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXCampus = await PartXCampus.findOne({ where: { id_part: id_part, id_campus: id_campus  } });
    if (existingProductXCampus) {
        return res.status(400).json({ message: 'Cannot add a duplicated partxcampus' });
    }

    const result = await createModel(PartXCampus, { id_campus, id_part,quantity_available });
    if (result.success) {
        res.status(result.status).json({ message: 'partxcampus added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updatePartXCampus = async(req,res)=>{
    const { id } = req.params;
    let { id_part, id_campus, quantity_available } = req.body;

    const partXcampus =  await getModelById(PartXCampus, id);

    if(partXcampus.success){
        if (!id_part) id_part = permiss.model.id_part
        if (!id_campus) id_campus = permiss.model.id_campus
        if (!quantity_available) quantity_available = permiss.model.quantity_available
    }else{
        res.status(partXcampus.status).json({ message: partXcampus.message, error:partXcampus.error });
    }

    const result = await updateModel(PartXCampus, id, { id_campus, id_part,quantity_available });
    
    if (result.success) {
        res.status(result.status).json({ message: 'PartXCampus updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deletePartXCampus = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(PartXCampus, id);
    if (result.success) {
        res.status(result.status).json({ message: 'partxcampus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}