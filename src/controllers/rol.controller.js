
import { json } from 'sequelize';
import { Rol } from '../models/rol.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, getModelByParameterOne} from "./general.controller.js"



//Metodo que devuelve todos los roles
export const getRoles = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterMany(Rol,"id_company",company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un rol especifico
//Parametros: id
export const getRolById = async(req,res)=>{
    const { id,company } = req.params;
    const result = await getModelByParameterMany(Rol, "id_company", company);

    let rolFound=false
    let rolSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            rolSelected=element
            rolFound=true        
        }
    });
    
    if(rolFound) return res.status(result.status).json(rolSelected);
    if(!rolFound) return res.status(404).json({ message: 'Rol not found', error: result.error });
    
        
    
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
    const { company, id } = req.params;
    let { name, description, id_company } = req.body;

    const rols =  await getModelByParameterMany(Rol, "id_company", company);


    let rolSelected= null
    let rolFound = false
    rols.model.forEach(element => {
        if(element.id == id ){
            rolSelected = element
            rolFound=true
        }
    });

    if(!rolFound) return res.status(404).json({message:"Rol not found"})

    if(rols.success){
        if (!name) name = rolSelected.name
        if (!description) description = rolSelected.description
        if (!id_company) id_company = rolSelected.id_company
    }else{
        res.status(rols.status).json({ message: rols.message, error:rols.error });
    }

    const result = await updateModel(Rol, id, { name, description, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Rol updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 


//Metodo que elimina una compañia
//Parametros: id
export const deleteRol = async(req,res)=>{
    const { company, id } = req.params;
    const rols = await getModelByParameterMany(Rol, "id_company", company)
    let rolFound = false;
    for (const campusObj of rols.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Rol, id);
            if (result.success) { 
                rolFound= true;
                return res.status(result.status).json({ message: 'Rol deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!rolFound) {
        return res.status(404).json({ message: 'Rol not found' });
    }
}