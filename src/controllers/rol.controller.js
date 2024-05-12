
import { json } from 'sequelize';
import { Rol } from '../models/rol.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"



//Metodo que devuelve todos los roles
export const getRoles = async(req,res)=> {
        const result = await getAllModels(Rol);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un rol especifico
//Parametros: id
export const getRolById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Rol, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Rol not found', error: result.error });
    }
}


//Metodo que crea un nuevo rol
//Parametros: name, description
export const createRol =  async(req,res)=> {
    const { name, description, id_company } = req.body;

    if(!name) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingRol = await Rol.findOne({ where: { name: nameCapitalize } });
    if (existingRol) {
        return res.status(400).json({ message: 'Cannot create a duplicate rol' });
    }

    const result = await createModel(Rol, { name, description, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Rol created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un rol
//Parametros: name, description
export const updateRol = async(req,res)=>{
    const { id } = req.params;
    let { name, description } = req.body;

    const rol =  await getModelById(Rol, id);

    if(rol.success){
        if (!name) name = rol.model.dataValues.name
        if (!description) description = rol.model.dataValues.description
    }else{
        res.status(rol.status).json({ message: rol.message, error:rol.error });
    }

    const result = await updateModel(Rol, id, { name, description });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Rol updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una compañia
//Parametros: id
export const deleteRol = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Rol, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Rol deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}