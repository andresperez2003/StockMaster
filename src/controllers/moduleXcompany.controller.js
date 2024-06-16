
import { ModuleXCompany } from '../models/moduleXcompany.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getAllModelsWithJoin, getModelByIdWithJoin, getModelByParameterMany} from "./general.controller.js"
import { Operation } from '../models/operation.model.js';
import { Module } from '../models/module.model.js';



//Metodo que devuelve todos las partes de un producto
export const getModuleXCompany = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterMany(ModuleXCompany,"id_company",company)
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getModuleXCompanyById = async(req,res)=>{
    const { company,id } = req.params;
    const result = await getModelByParameterMany(ModuleXCompany,"id_company", company);


    let moduleXCompanyFound=false
    let moduleXCompanySelected = null
    result.model.forEach(element => {
        if(element.id == id){
            moduleXCompanySelected=element
            moduleXCompanyFound=true        
        }
    });
    
    if(moduleXCompanyFound) return res.status(result.status).json(moduleXCompanySelected);
    if(!moduleXCompanyFound) return res.status(404).json({ message: 'ModuleXCompany not found', error: result.error });
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createModuleXCompany =  async(req,res)=> {
    const { id_module, id_company } = req.body;

    if( !id_module || !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingModuleXCompany = await ModuleXCompany.findOne({ where: { id_module: id_module, id_company: id_company  } });
    if (existingModuleXCompany) {
        return res.status(400).json({ message: 'Cannot add a duplicated modulexcampus' });
    }

    const result = await createModel(ModuleXCompany, { id_module, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'modulexcampus added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateModuleXCompany = async(req,res)=>{
    const { company,id } = req.params;
    let {  id_module, id_company } = req.body;

    const modulexcampus =  await getModelByParameterMany(ModuleXCompany, "id_company", company);


    let moduleXCompanyFound=false
    let moduleXCompanySelected = null
    modulexcampus.model.forEach(element => {
        if(element.id == id){
            moduleXCompanySelected=element
            moduleXCompanyFound=true        
        }
    });

    if(!moduleXCompanyFound) return res.status(404).json({message:"Category not found"})

    if(modulexcampus.success){
        if (!id_module) id_module = modulexcampus.id_module
        if (!id_company) id_company = modulexcampus.id_company
    }else{
        res.status(modulexcampus.status).json({ message: modulexcampus.message, error:modulexcampus.error });
    }


    const result = await updateModel(ModuleXCompany, id, { id_company, id_module });
    
    if (result.success) {
        res.status(result.status).json({ message: 'ModuleXCompany updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteModuleXCompany = async(req,res)=>{
    const { company,id } = req.params;

    const modulexcampus =  await getModelByParameterMany(ModuleXCompany, "id_company", company);


    let moduleXCompanyFound=false
    let moduleXCompanyId = null
    modulexcampus.model.forEach(element => {
        if(element.id == id){
            moduleXCompanyId=element.id
            moduleXCompanyFound=true        
        }
    });

    if(!moduleXCompanyFound) return res.status(404).json({message:"Rol not found"})

    const result = await deleteModel(ModuleXCompany, moduleXCompanyId);
    if (result.success) {
        res.status(result.status).json({ message: 'modulexcampus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}