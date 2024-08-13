
import { SupplierXCampus } from '../models/supplierXcampus.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getAllModelsWithJoin, getModelByIdWithJoin, getModelByParameterManyWithJoin, getModelByParameterMany, searchOperation, addOperation, updateOperation, deleteOperation, hasPermissRol, hasPermissUser} from "./general.controller.js"
import { Operation } from '../models/operation.model.js';
import { Module } from '../models/module.model.js';
import { Supplier } from '../models/supplier.model.js';
import { Campus } from '../models/campus.model.js';
import { decodeAccessToken } from '../middleware/token.js';


const module = "SupplierXCampus"

//Metodo que devuelve todos las partes de un producto
export const getSupplierXCampus = async(req,res)=> {
        const {campus} = req.params
        const token = req.headers.authorization;    
        if(!token) return res.status(401).json({message:"Token is required"})
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    
        const result = await getModelByParameterManyWithJoin(SupplierXCampus,"id_campus",campus,["id"],
        [
            {model: Supplier, required:true},
            {model: Campus, required:true}
        ]);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getSupplierXCampusById = async(req,res)=>{
    const { campus, id } = req.params;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByParameterManyWithJoin(SupplierXCampus,"id_campus", campus,["id"],[
         {model:Supplier, required:true},
        {model:Campus, required:true}
    ]);

    for (const campusObj of result.model) {
        if (campusObj.id == id) {
            return res.status(result.status).json({SupplierXCampus:campusObj});
        }
    }
    return res.status(result.status).json({ message: 'SupplierXCampus not found', error: result.error });

}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createSupplierXCampus =  async(req,res)=> {
    const { id_supplier, id_campus } = req.body;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const supplierXcampus =  await getModelById(SupplierXCampus, id);

    if(supplierXcampus.success){
        if (!id_supplier) id_supplier = supplierXcampus.model.id_supplier
        if (!id_campus) id_campus = supplierXcampus.model.id_campus
    }else{
        res.status(supplierXcampus.status).json({ message: supplierXcampus.message, error:supplierXcampus.error });
    }


    if(id_supplier != supplierXcampus.id_supplier || id_campus != supplierXcampus.id_campus){
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
    const { campus,id } = req.params;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const supplierxcampus =  await getModelByParameterMany(SupplierXCampus, "id_campus", campus);


    let supplierXCampusFound=false
    let supplierXCampusId = null
    supplierxcampus.model.forEach(element => {
        if(element.id == id){
            supplierXCampusId=element.id
            supplierXCampusFound=true        
        }
    });

    if(!supplierXCampusFound) return res.status(404).json({message:"SupplierXCampus not found"})

    const result = await deleteModel(SupplierXCampus, supplierXCampusId);
    if (result.success) {
        res.status(result.status).json({ message: 'SupplierXCampus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}