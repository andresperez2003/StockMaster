
import { User } from '../models/user.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"

const namePrimaryKey='identification'


//Metodo que devuelve todos los usuarios
export const getUsers = async(req,res)=> {
        const result = await getAllModels(User);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que devuelve un usuario por su id
export const getUserById = async(req,res)=>{
    const { identification } = req.params;
    const result = await getModelById(User, identification);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'User not found', error: result.error });
    }
}


//Metodo que crea un nuevo usuario
//Parametros: identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company
export const createUser =  async(req,res)=> {
    const { identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company } = req.body;

    if(!name) return res.status(400).json({message:"Fill all fields"})
    
    const existingRol = await User.findOne({ where: { identification: identification } });
    if (existingRol) {
        return res.status(400).json({ message: 'Cannot create a duplicate user' });
    }

    const result = await createModel(User, { identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'User created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un usuario
//Parametros: identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company
export const updateUser = async (req, res) => {
    const { identification } = req.params;
    let { name, lastname, username, password, status, photo, email, phone, id_rol, id_company } = req.body;

    const user = await getModelById(User, identification);
    console.log(user);
    if (user.success) {
        // Update the variables only if they are not provided or empty
        if (!name || name == '') name = user.model.dataValues.name;
        if (!lastname || lastname == '') lastname = user.model.dataValues.lastname;
        if (!username || username == '') username = user.model.dataValues.username;
        if (!password || password == '') password = user.model.dataValues.password; 
        if (status) status = user.model.dataValues.status;
        if (!photo || photo == '') photo = user.model.dataValues.photo;
        if (!email || photo == '') email = user.model.dataValues.email; // Should this be email instead of photo?
        if (!phone || photo == '') phone = user.model.dataValues.phone; // Should this be phone instead of photo?
        if (!id_rol) id_rol = user.model.dataValues.id_rol;
        if (!id_company || id_company == '') id_company = user.model.dataValues.id_company;
    } else {
        // If user retrieval fails, send an error response and return from the function
        return res.status(user.status).json({ message: user.message, error: user.error });
    }

    // Update the user model
    const result = await updateModel(User, identification, { name, lastname, username, password, status, photo, email, phone, id_rol, id_company },namePrimaryKey);

    // Check the result of the update operation and send the appropriate response
    if (result.success) {
        res.status(result.status).json({ message: 'User updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
};


//Metodo que elimina una usuario
//Parametros: identification
export const deleteUser = async(req,res)=>{
    const { identification } = req.params;
    const result = await deleteModel(User, identification, namePrimaryKey);
    if (result.success) {
        res.status(result.status).json({ message: 'User deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}