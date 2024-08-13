
import { json } from 'sequelize';
import { Supplier } from '../models/supplier.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, getAllModelsWithJoin, getModelByManyParameterWithJoinMany, hasPermissRol, hasPermissUser, searchOperation, addOperation, updateOperation, deleteOperation} from "./general.controller.js"
import { Company } from '../models/company.model.js';
import { decodeAccessToken } from '../middleware/token.js';

const module = "Supplier"

//Metodo que devuelve todos los proveedores
export const getSuppliers = async(req,res)=> {
    const {company} = req.params
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

        const result = await getModelByManyParameterWithJoinMany(Supplier,{"id_company":company}, ["id","name", "phone","name_seller"], [
            { model:Company, attributes: ["nit","name"] }
        ]);

        
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
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const suppliers = await getModelByManyParameterWithJoinMany(Supplier, {"id_company":company, "id":id}, ["name", "phone", "name_seller"],[
        { model:Company, attributes: ["nit","name"] }
    ]);


    if (suppliers.success) {
        res.status(suppliers.status).json(suppliers.model);
    } else {
        res.status(suppliers.status).json({ message: suppliers.message, error: suppliers.error });
    }
    
}


//Metodo que crea un nuevo proveedor
//Parametros: name, phone, name_seller, photo, id_compan
export const createSupplier =  async(req,res)=> {
    const { name, phone, name_seller, id_company } = req.body;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    
    if(!name  || !phone || !name_seller || !id_company) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const nameSellerLower = name_seller.toLowerCase();
    const nameSellerCapitalize = nameSellerLower.charAt(0).toUpperCase() + nameSellerLower.slice(1);

    const existingSupplier = await Supplier.findOne({ where: { name: nameCapitalize, id_company:id_company, name_seller:name_seller } });
    if (existingSupplier) {
        return res.status(400).json({ message: 'Cannot create a duplicate supplier' });
    }

    const result = await createModel(Supplier, { nameCapitalize, phone, nameSellerCapitalize, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un proveedor
//Parametros: id, name, phone, name_seller, photo, id_compan
export const updateSupplier = async(req,res)=>{
    const { company, id } = req.params;
    let { name, phone, name_seller, photo, id_company } = req.body;

    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const suppliers =  await getModelByParameterMany(Supplier, "id_company", company);

    let supplierSelected= null
    let supplierFound = false
    suppliers.model.forEach(element => {
        if(element.id == id ){
            supplierSelected = element
            supplierFound=true
        }
    });

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const nameSellerCapitalize=""
    if(name_seller){
        const nameSellerLower = name_seller.toLowerCase();
        nameSellerCapitalize = nameSellerLower.charAt(0).toUpperCase() + nameSellerLower.slice(1);    
    }

    if (nameCapitalize != supplierSelected.name) {
        const existingSupplier = await Supplier.findOne({ where: { name: nameCapitalize, id_company:company, name_seller:name_seller? nameSellerCapitalize: supplierSelected.name_seller } });
        if(existingSupplier) return res.status(400).json({ message: 'Cannot use a duplicate supplier name' });
    }


    if(!supplierFound) return res.status(404).json({message:"Supplier not found"})
    


    if(suppliers.success){
        if (!name) {name = supplierSelected.name}else{name = nameCapitalize}
        if (!phone) phone = supplierSelected.phone
        if (!name_seller){name_seller = supplierSelected.name_seller}else{name_seller = nameSellerCapitalize}
        if (!photo) photo = supplierSelected.photo
        if (!id_company) id_company = supplierSelected.id_company

    }else{
        res.status(suppliers.status).json({ message: suppliers.message, error:suppliers.error });
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
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

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