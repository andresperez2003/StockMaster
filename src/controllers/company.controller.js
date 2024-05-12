
import { Company } from '../models/company.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"

const namePrimaryKey='nit'


//Metodo que devuelve todos las compañias
export const getCompanies = async(req,res)=> {
        const result = await getAllModels(Company);
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
    const result = await createModel(Company, { nit, name, photo, address, phone, status, id_city });
    if (result.success) {
        res.status(result.status).json({ message: 'Company created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una compañia
//Parametros: name, id_masteruser, nit
export const updateCompany = async(req,res)=>{
        const { id } = req.params;
    const { name, photo, address, status, id_city } = req.body;
    const result = await updateModel(Company, id, { name, photo, address, status, id_city },namePrimaryKey);
    
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
    let result = await getModelByParameterMany(Company, "status", false);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Company not found', error: result.error });
    }
}
