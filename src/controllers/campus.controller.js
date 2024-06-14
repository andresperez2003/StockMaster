
import { Campus } from '../models/campus.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos los campus
export const getCampus = async(req,res)=> {
        const result = await getAllModels(Campus);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un campus
//Parametros: id
export const getCampusById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Campus, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Campus not found', error: result.error });
    }
}

export const getCampusByCompany = async(req,res)=>{
    const { company } = req.params;
    const result = await getModelByParameterMany(Campus,"id_company",company );
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Campus not found', error: result.error });
    }
}




//Metodo que crea un nuevo campus
//Parametros: name, description
export const createCampus =  async(req,res)=> {
    const { name, address, phone, id_city,status,main_campus, id_company } = req.body;

    if(!name || !address || !phone || !id_city || !status  || !id_company) return res.status(400).json({message:"Fill all fields"})
 
    const result = await createModel(Campus, { name, address, phone, id_city,status,main_campus, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Campus created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateCampus = async(req,res)=>{
    const { id } = req.params;
    let {name, address, phone, id_city,status,main_campus, id_company  } = req.body;

    const campus =  await getModelById(Campus, id);

    if(category.success){
        if (!name) name = campus.model.dataValues.name
        if (!address) address = campus.model.dataValues.address
        if (!phone) phone = campus.model.dataValues.phone
        if (!id_city) id_city  = campus.model.dataValues.id_city
        if (!status) status = campus.model.dataValues.status
        if (!main_campus) main_campus = campus.model.dataValues.main_campus
        if (!id_company) id_company = campus.model.dataValues.id_company
    }else{
        res.status(campus.status).json({ message: campus.message, error:campus.error });
    }

    const result = await updateModel(Campus, id, { name, address, phone, id_city,status,main_campus, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Campus updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteCampus = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Campus, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Campus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}

//Metodo que elimina una categoria
//Parametros: id
export const deleteCampusByCompany = async (req, res) => {
    const { company, id } = req.params;
    const campus = await getModelByParameterMany(Campus, "id_company", company);
    
    let campusFound = false;

    for (const campusObj of campus.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Campus, id);
            if (result.success) { 
                campusFound = true;
                return res.status(result.status).json({ message: 'Campus deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!campusFound) {
        return res.status(404).json({ message: 'Campus not found' });
    }
};
