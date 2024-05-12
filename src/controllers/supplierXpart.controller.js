
import { json } from 'sequelize';
import { SupplierXPart } from '../models/supplierXpart.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"



//Metodo que devuelve todos los roles
export const getSupplierXPart = async(req,res)=> {
        const result = await getAllModels(SupplierXPart);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un rol especifico
//Parametros: id
export const getSupplierXPartById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(SupplierXPart, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'SupplierXPart not found', error: result.error });
    }
}


//Metodo que crea un nuevo rol
//Parametros: name, description
export const createSupplierXPart =  async(req,res)=> {
    const { id_supplier, id_part, id_company } = req.body;

    if( !id_supplier ||!id_part|| !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingSupplierXPart = await SupplierXPart.findOne({ where: { id_company: id_company, id_part: id_part, id_supplier: id_supplier  } });
    if (existingSupplierXPart) {
        return res.status(400).json({ message: 'Cannot add a duplicated supplier to a part' });
    }

    const result = await createModel(SupplierXPart, { id_part, id_supplier, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier added to Part' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un rol
//Parametros: name, description
export const updateSupplierXPart = async(req,res)=>{
    const { id } = req.params;
    let { id_part, id_supplier, id_company } = req.body;

    const supplierxpart =  await getModelById(SupplierXPart, id);

    if(supplierxpart.success){
        if (!id_part) id_product = supplierxpart.model.dataValues.id_part
        if (!id_supplier) id_supplier = supplierxpart.model.dataValues.id_supplier
        if (!id_company) id_company = supplierxpart.model.dataValues.id_company
    }else{
        res.status(supplierxpart.status).json({ message: supplierxpart.message, error:supplierxpart.error });
    }s

    const result = await updateModel(SupplierXPart, id, { id_part, id_supplier, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier of the part updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteSupplierXPart = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(SupplierXPart, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier of the part deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}