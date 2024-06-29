
import { json } from 'sequelize';
import { RolXPermiss } from '../models/rolXPermiss.model.js';
import { createModel, updateModel, deleteModel, getModelByParameterManyWithJoin, getModelByParameterMany, getModelByManyParameterWithJoinMany} from "./general.controller.js"
import { UserXPermiss } from '../models/userXpermiss.model.js';
import { Rol } from '../models/rol.model.js';
import { Permiss } from '../models/permiss.model.js';
import { Module } from '../models/module.model.js';
import { Operation } from '../models/operation.model.js';



//Metodo que devuelve todos las partes de un producto
export const getRolXPermiss = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterManyWithJoin(RolXPermiss,"id_company",company,[/* "id" */],
            [
         /*        {model: Rol, required:true, attributes:["name"]},
                {model: Permiss, required:true, attributes:["id"], include:[
                    {model:Operation, required:true, attributes:["name"]},
                    {model:Module, required:true, attributes:["name"]}
                ]} */
            ]);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getRolXPermissById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterManyWithJoin(RolXPermiss,"id_company" , company ,["id"],
        [
            {model: Rol, required:true, attributes:["name"]},
            {model: Permiss, required:true, attributes:["id"], include:[
                {model:Operation, required:true, attributes:["name"]},
                {model:Module, required:true, attributes:["name"]}
            ]}
        ]);
    for (const campusObj of result.model) {
            if (campusObj.id == id) {
                return res.status(result.status).json({RolXPermiss:campusObj});
            }
        }
    return res.status(result.status).json({ message: 'Permiss not found', error: result.error });
        

}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createRolXPermiss =  async(req,res)=> {
    const { id_rol, id_permiss, id_company } = req.body;

    if( !id_rol || !id_permiss ||  !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingRolXPermiss = await RolXPermiss.findOne({ where: { id_rol: id_rol, id_permiss: id_permiss, id_company: id_company  } });
    if (existingRolXPermiss) {
        return res.status(400).json({ message: 'Cannot add a duplicated rolxpermiss' });
    }

    const result = await createModel(RolXPermiss, { id_rol, id_permiss,  id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'RolXPermiss added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }

export const getRolXPermissByRolAndCompany = async(id_rol, id_company)=> {   
    const result = await getModelByManyParameterWithJoinMany(RolXPermiss, {"id_rol":id_rol, "id_company": id_company}, ["id"],
        [
            {model: Rol, required:true, attributes:["name"]},
            {model: Permiss, required:true, attributes:["id"], include:[
                {model:Operation, required:true, attributes:["name"]},
                {model:Module, required:true, attributes:["name"]}
            ]}
        ]);
    if (result.success) {
        return result.model;
    } else {
        return null
    }

}


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateRolXPermiss = async(req,res)=>{
    const { company,id } = req.params;
    let { id_rol, id_permiss, id_company } = req.body;

    const rolxpermiss =  await getModelByParameterMany(RolXPermiss, "id_company", company);

    let rolxpermissSelected= null
    let rolxpermissFound = false
    rolxpermiss.model.forEach(element => {
        if(element.id == id ){
            rolxpermissSelected = element
            rolxpermissFound=true
        }
    });

    if(!rolxpermissFound) return res.status(404).json({message:"RolxPermiss not found"})



    if(rolxpermiss.success){
        if (!id_rol) id_rol = rolxpermiss.model.id_rol
        if (!id_permiss) id_permiss = rolxpermiss.model.id_permiss
        if (!id_company) id_company = rolxpermiss.model.id_company
    }else{
        res.status(rolxpermiss.status).json({ message: rolxpermiss.message, error:rolxpermiss.error });
    }

    if(id_rol != rolxpermissSelected.id_rol || id_permiss != rolxpermissSelected.id_permiss || id_company != rolxpermissSelected.id_company){
        const existingRolXPermiss = await RolXPermiss.findOne({ where: { id_rol: id_rol, id_permiss: id_permiss, id_company: id_company  } });
        if (existingRolXPermiss) {
            return res.status(400).json({ message: 'Cannot add a duplicated rolxpermiss' });
        }
    }

    const result = await updateModel(RolXPermiss, id, { id_rol, id_permiss, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'RolXPermiss updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteRolXPermiss = async(req,res)=>{
    const { company, id } = req.params;

    const rolxpermisses = await getModelByParameterMany(RolXPermiss, "id_company", company)

    let rolxpermissFound = false;
    for (const campusObj of rolxpermisses.model) {
        if (campusObj.id == id) {
            rolxpermissFound= true;
            const result = await deleteModel(RolXPermiss, id);
            if (result.success) { 
                return res.status(result.status).json({ message: 'RolXPermiss deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!rolxpermissFound) {
        return res.status(404).json({ message: 'RolXPermiss not found' });
    }
}