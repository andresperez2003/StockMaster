
import { json } from 'sequelize';
import { UserXPermiss } from '../models/userXpermiss.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterManyWithJoin, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos las partes de un producto
export const getUserXPermiss = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterManyWithJoin(UserXPermiss,"id_company",company,[],[]);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getUserXPermissById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterManyWithJoin(UserXPermiss, "id_company",company,[],[]);


    let userxpermissFound=false
    let userxpermissSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            userxpermissSelected=element
            userxpermissFound=true        
        }
    });
    
    if(userxpermissFound) return res.status(result.status).json(userxpermissSelected);
    if(!userxpermissFound) return res.status(404).json({ message: 'UserXPermiss not found', error: result.error });
    
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createUserXPermiss =  async(req,res)=> {
    const { id_user , id_permiss, id_company } = req.body;

    if( !id_user || !id_permiss || !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingUserXPermiss = await UserXPermiss.findOne({ where: { id_user: id_user, id_permiss: id_permiss, id_company:id_company  } });
    if (existingUserXPermiss) {
        return res.status(400).json({ message: 'Cannot add a duplicated userxpermiss' });
    }

    const result = await createModel(UserXPermiss, { id_user, id_permiss, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'UserXPermiss added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updateUserXPermiss = async(req,res)=>{
    const { company, id } = req.params;
    let { id_user, id_permiss, id_company } = req.body;

    const userxpermiss =  await getModelByParameterManyWithJoin(UserXPermiss, "id_company", company, [], []);


    let userXpermissSelected= null
    let userXpermissFound = false
    userxpermiss.model.forEach(element => {
        if(element.id == id ){
            userXpermissSelected = element
            userXpermissFound=true
        }
    });

    if(!userXpermissFound) return res.status(404).json({message:"UserXPermiss not found"})


    if(userxpermiss.success){
        if (!id_user) id_user = userxpermiss.model.id_user
        if (!id_permiss) id_permiss = userxpermiss.model.id_permiss
        if (!id_company) id_company = userxpermiss.model.id_company
    }else{
        res.status(userxpermiss.status).json({ message: userxpermiss.message, error:userxpermiss.error });
    }

    const result = await updateModel(UserXPermiss, id, { id_permiss, id_user, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'UserXPermiss updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deleteUserXPermiss = async(req,res)=>{
    const { company, id } = req.params;
    const userxpermiss = await getModelByParameterMany(UserXPermiss, "id_company", company)
    let userxpermissFound = false;
    for (const campusObj of userxpermiss.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(UserXPermiss, id);
            if (result.success) { 
                userxpermissFound= true;
                return res.status(result.status).json({ message: 'UserXPermiss deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!userxpermissFound) {
        return res.status(404).json({ message: 'UserXPermiss not found' });
    }
}