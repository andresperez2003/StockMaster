
import { decodeAccessToken } from '../middleware/token.js';
import { Company } from '../models/company.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, getModelByParameterOne, searchOperation, addOperation, updateOperation, deleteOperation, hasPermissRol, hasPermissUser} from "./general.controller.js"

const namePrimaryKey='nit'
const module = "Company"

//Metodo que devuelve todos las compañias
export const getCompanies = async(req,res)=> {
        const result = await getAllModels(Company);
        const token = req.headers.authorization;   
        
        if(!token) return res.status(401).json({message:"Token is required"})
        const dataToken = decodeAccessToken(token);
     
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una compañia especifica
//Parametros: nit
export const getCompanyById = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelById(Company, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Company not found', error: result.error });
    }
}


//Metodo que crea una nueva compañia
//Parametros: nit, name, id_masteruser
export const createCompany =  async(req,res)=> {
    const { nit, name, photo, address, phone, status, id_city } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const existingCompany = await Company.findOne({ where: { nit: nit } });
    if (existingCompany) {
        return res.status(400).json({ message: 'Cannot create a duplicate company' });
    }


    const result = await createModel(Company, { nit, name:nameCapitalize, photo, address, phone, status, id_city });



    if (result.success) {
        res.status(result.status).json({ message: 'Company created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una compañia
//Parametros: name, id_masteruser, nit
export const updateCompany = async(req,res)=>{
    const { nit } = req.params;
    let { name, photo,phone, status, id_city } = req.body;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    
    const company = await getModelByParameterOne(Company,"nit", nit) 

    if(!name){
        name =company.model.name
    }else{
        name = nameCapitalize
    }
    if(!photo) photo =company.model.photo
    if(!phone) phone =company.model.phone
    if(status==undefined) status =company.model.status
    if(!id_city) id_city =company.model.id_city


    if (name != company.name) {
        const existingCompany = await Company.findOne({ where: { name: name } });
        if(existingCompany) return res.status(400).json({ message: 'Cannot use a duplicate company name' });
    }


    const result = await updateModel(Company, nit, { name, photo, phone, status, id_city },namePrimaryKey);
    
    if (result.success) {
        res.status(result.status).json({ message: 'Company updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteCompany = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await deleteModel(Company, id, namePrimaryKey);
    if (result.success) {
        res.status(result.status).json({ message: 'Company deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}


//Metodo que trae una compañia especifica
//Parametros: nit
export const getCompanyOnlyActive = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByParameterMany(Company, "status", true);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Company not found', error: result.error });
    }
}

//Metodo que trae una compañia especifica
//Parametros: nit
export const getCompanyOnlyInactive = async(req,res)=>{
    const { id } = req.params;
    const token = req.headers.authorization;   
        
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);
 
    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    let result = await getModelByParameterMany(Company, "status", false);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Company not found', error: result.error });
    }
}
