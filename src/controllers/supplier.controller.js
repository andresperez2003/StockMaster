
import { json } from 'sequelize';
import { Supplier } from '../models/supplier.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos los proveedores
export const getSuppliers = async(req,res)=> {
    const {company} = req.params
        const result = await getModelByParameterMany(Supplier,"id_company",company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un proveedor especifico
//Parametros: id
export const getSupplierById = async(req,res)=>{
    const { company, id } = req.params;
    const suppliers = await getModelByParameterMany(Supplier, "id_company",company);
    for (const campusObj of suppliers.model) {
        if (campusObj.id == id) {
            return res.status(suppliers.status).json({Supplier:campusObj});
        }
    }
    return res.status(products.status).json({ message: 'Supplier not found', error: suppliers.error });
    
}


//Metodo que crea un nuevo proveedor
//Parametros: name, phone, name_seller, photo, id_compan
export const createSupplier =  async(req,res)=> {
    const { name, phone, name_seller, id_company } = req.body;

    if(!name  || !phone || !name_seller || !id_company) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingSupplier = await Supplier.findOne({ where: { name: nameCapitalize } });
    if (existingSupplier) {
        return res.status(400).json({ message: 'Cannot create a duplicate supplier' });
    }

    const result = await createModel(Supplier, { name, phone, name_seller, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un proveedor
//Parametros: id, name, phone, name_seller, photo, id_compan
export const updateSupplier = async(req,res)=>{
    const { id } = req.params;
    let { name, phone, name_seller, photo, id_company } = req.body;

    const supplier =  await getModelById(Supplier, id);

    if(supplier.success){
        if (!name) name = supplier.model.dataValues.name
        if (!phone) phone = supplier.model.dataValues.phone
        if (!name_seller) name_seller = supplier.model.dataValues.name_seller
        if (!photo) photo = supplier.model.dataValues.photo
        if (!id_company) id_company = supplier.model.dataValues.id_company

    }else{
        res.status(supplier.status).json({ message: supplier.message, error:supplier.error });
    }

    const result = await updateModel(Supplier, id, { name, phone, name_seller, photo, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una proveedor
//Parametros: id
export const deleteSupplier = async(req,res)=>{
    const { company, id } = req.params;
    const suppliers = await getModelByParameterMany(Supplier, "id_company", company)
    let supplierFound = false;
    for (const campusObj of suppliers.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Supplier, id);
            if (result.success) { 
                supplierFound= true;
                return res.status(result.status).json({ message: 'Supplier deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!supplierFound) {
        return res.status(404).json({ message: 'Supplier not found' });
    }
}