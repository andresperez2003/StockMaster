
import { json } from 'sequelize';
import { SupplierXPart } from '../models/supplierXpart.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterManyWithJoin, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos los proveedores de cada parte
export const getSupplierXPart = async(req,res)=> {
    const {company} = req.params
    const result = await getModelByParameterManyWithJoin(SupplierXPart,"id_company", company,[],[]);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

//Metodo que trae un proveedor de una parte
//Parametros: id
export const getSupplierXPartById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterManyWithJoin(SupplierXPart, "id_company", company, [] , []);

    let supplierxpartFound=false
    let supplierxpartSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            supplierxpartSelected=element
            supplierxpartFound=true        
        }
    });
    
    if(supplierxpartFound) return res.status(result.status).json(supplierxpartSelected);
    if(!supplierxpartFound) return res.status(404).json({ message: 'SupplierXPart not found', error: result.error });
    
}


//Metodo que agrega un proveedor a una parte
//Parametros: id_supplier, id_part, id_company
export const createSupplierXPart =  async(req,res)=> {
    const { id_supplier, id_part, id_company } = req.body;

    if( !id_supplier ||!id_part || !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingSupplierXPart = await SupplierXPart.findOne({ where: { id_part: id_part, id_supplier: id_supplier, id_company:id_company  } });
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


 
//Metodo que actualiza el proveedor de una parte
//Parametros: id, id_supplier, id_part, id_company
export const updateSupplierXPart = async(req,res)=>{
    const { company,id } = req.params;
    let { id_part, id_supplier, id_company } = req.body;

    const supplierxparts =  await getModelByParameterMany(SupplierXPart, "id_company", company);


    let supplierxpartSelected= null
    let supplierxpartFound = false
    supplierxparts.model.forEach(element => {
        if(element.id == id ){
            supplierxpartSelected = element
            supplierxpartFound=true
        }
    });

    if(!supplierxpartFound) return res.status(404).json({message:"SupplierXPart not found"})

    if(supplierxparts.success){
        if (!id_part) id_part = supplierxpartSelected.id_part
        if (!id_supplier) id_supplier = supplierxpartSelected.id_supplier
        if (!id_company) id_company = supplierxpartSelected.id_company
    }else{
        res.status(supplierxparts.status).json({ message: supplierxparts.message, error:supplierxparts.error });
    }

    if(id_part != supplierxpartSelected.id_part || id_supplier != supplierxpartSelected.id_supplier || id_company != supplierxpartSelected.id_company){
        const existingSupplierXPart = await SupplierXPart.findOne({ where: { id_part: id_part, id_supplier: id_supplier, id_company:id_company  } });
        if (existingSupplierXPart) {
            return res.status(400).json({ message: 'Cannot add a duplicated supplier to a part' });
        }
    }

    const result = await updateModel(SupplierXPart, id, { id_part, id_supplier, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier of the part updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina el proveedor de una parte
//Parametros: id
export const deleteSupplierXPart = async(req,res)=>{
    const { company, id } = req.params;
    const supplierxparts = await getModelByParameterMany(SupplierXPart, "id_company", company)
    let supplierXpartFound = false;

    for (const campusObj of supplierxparts.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(SupplierXPart, id);
            if (result.success) { 
                supplierXpartFound= true;
                return res.status(result.status).json({ message: 'SupplierXPart deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!supplierXpartFound) {
        return res.status(404).json({ message: 'SupplierXPart not found' });
    }
}