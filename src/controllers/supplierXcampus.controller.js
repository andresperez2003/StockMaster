
import { SupplierXCampus } from '../models/supplierXcampus.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getAllModelsWithJoin, getModelByIdWithJoin} from "./general.controller.js"
import { Operation } from '../models/operation.model.js';
import { Module } from '../models/module.model.js';



//Metodo que devuelve todos las partes de un producto
export const getSupplierXCampus = async(req,res)=> {
        const result = await getAllModels(SupplierXCampus)
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getSupplierXCampusById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(SupplierXCampus,id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'SupplierXCampus not found', error: result.error });
    }
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createSupplierXCampus =  async(req,res)=> {
    const { id_supplier, id_campus } = req.body;

    if( !id_supplier || !id_campus) return res.status(400).json({message:"Fill all fields"})
    

    const existingSupplierXCampus = await SupplierXCampus.findOne({ where: { id_supplier: id_supplier, id_campus: id_campus  } });
    if (existingSupplierXCampus) {
        return res.status(400).json({ message: 'Cannot add a duplicated supplierxcampus' });
    }

    const result = await createModel(SupplierXCampus, { id_campus, id_supplier });
    if (result.success) {
        res.status(result.status).json({ message: 'supplierxcampus added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateSupplierXCampus = async(req,res)=>{
    const { id } = req.params;
    let { id_supplier, id_campus } = req.body;

    const supplierXcampus =  await getModelById(SupplierXCampus, id);

    if(supplierXcampus.success){
        if (!id_supplier) id_supplier = supplierXcampus.model.id_supplier
        if (!id_campus) id_campus = supplierXcampus.model.id_campus
    }else{
        res.status(supplierXcampus.status).json({ message: supplierXcampus.message, error:supplierXcampus.error });
    }


    if(id_supplier != supplierXcampus.model.id_supplier || id_campus != supplierXcampus.model.id_campus){
        const existingSupplierXCampus = await SupplierXCampus.findOne({ where: { id_supplier: id_supplier, id_campus: id_campus  } });
        if (existingSupplierXCampus) {
            return res.status(400).json({ message: 'Cannot add a duplicated supplierxcampus' });
        }
    }
    
    const result = await updateModel(SupplierXCampus, id, { id_campus, id_supplier });
    
    if (result.success) {
        res.status(result.status).json({ message: 'SupplierXCampus updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteSupplierXCampus = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(SupplierXCampus, id);
    if (result.success) {
        res.status(result.status).json({ message: 'supplierxcampus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}