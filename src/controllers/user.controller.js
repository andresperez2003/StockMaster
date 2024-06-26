
import { User } from '../models/user.model.js'; // Importa el modelo Company que defines en otro archivo
import {getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getAllModelsWithJoin, getModelByIdWithJoin, getModelByParameterMany, getModelByParameterManyWithJoin} from "./general.controller.js"
import { Rol } from '../models/rol.model.js';
import {config} from 'dotenv'
import bcrypt from 'bcrypt'
import { decodeAccessToken, generateAccessToken, validateTokenOnMethods } from '../middleware/token.js';
import { getRolByIdMethod } from './rol.controller.js';
import { getCampusByIdMethod } from './campus.controller.js';
import { getRolXPermissByRolAndCompany } from './rolXpermiss.controller.js';

config()

const namePrimaryKey='identification'
const module = 'User'


//Metodo que devuelve todos los usuarios
export const getUsers = async(req,res)=> {
        const {campus} = req.params
        const result = await getModelByParameterManyWithJoin(User, "id_campus", campus,
            ['identification','name','lastname','username','phone','email','status','password','id_campus'],
            [
                {model: Rol,required: true,attributes: ['name']},
            ]
        );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que devuelve un usuario por su id
export const getUserById = async (req, res) => {
    const { campus, identification } = req.params;
    const result = await getModelByParameterManyWithJoin(User, "id_campus", campus,
        ['identification', 'name', 'lastname', 'username', 'phone', 'email', 'status', 'id_campus'],
        [
            { model: Rol, required: true, attributes: ['name'] },
        ]
    );

    let userFound = false;

    result.model.forEach(element => {
        if (element.identification == identification) {
            userFound = true;
            res.status(result.status).json(element);
            return; // Salir del bucle forEach una vez que se encontró al usuario
        }
    });

    // Si no se encontró ningún usuario
    if (!userFound) {
        res.status(result.status).json({ message: 'User not found', error: result.error });
    }
};



//Metodo que crea un nuevo usuario
//Parametros: identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company
export const createUser =  async(req,res)=> {
    const { identification, name, lastname, username, status, photo, email, phone, id_rol, id_campus } = req.body;
    let {password} = req.body;

    const token = req.headers.authorization;
    const formattedToken = token && token.startsWith('Bearer ') ? token.slice(7) : token;
    const validToken = await validateTokenOnMethods(formattedToken);
    
    if(!token){return res.status(401).json({message:"Access denied"})}

    if (!validToken) {return res.status(401).json({ message: 'Access denied, token not valid' });}

    const dataToken = decodeAccessToken(formattedToken);
    
    console.log(dataToken.campus);

    const campus = await getCampusByIdMethod(dataToken.campus)


    const permiss = await getRolXPermissByRolAndCompany(dataToken.rol, campus.dataValues.id_company)
    
    let hasPermiss = false

    for (const permissObj of permiss) {
        if(permissObj.Permiss.Operation.name == "Agregar" && permissObj.Permiss.Module.name == module){
            hasPermiss = true
        }
    }

    if(!hasPermiss){ return res.status(401).json({message:"User has no permission to create a user"})}
        

    if(dataToken.rol != 1) return res.status(401).json({message:"Unauthorized"})
    
    if(!name) return res.status(400).json({message:"Fill all fields"})
    
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const lastnameLower = lastname.toLowerCase();
    const lastnameCapitalize = lastnameLower.charAt(0).toUpperCase() + lastnameLower.slice(1);


    const existingUser = await User.findOne({ where: { identification: identification, id_campus:id_campus } });
    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingUser || existingEmail) {
        return res.status(400).json({ message: 'Cannot create a duplicate user' });
    }
    const saltRounds = 10; // Número de rondas de hashing (mayor es más seguro pero más lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword

    const result = await createModel(User, { identification, name:nameCapitalize, lastname:lastnameCapitalize, username, password, status, photo, email, phone, id_rol, id_campus });
    if (result.success) {
        res.status(result.status).json({ message: 'User created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un usuario
//Parametros: identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company
export const updateUser = async (req, res) => {
    const { campus, identification } = req.params;
    let { name, lastname, username, password, status, photo, email, phone, id_rol, id_company } = req.body;

    const users = await getModelByParameterMany(User, "id_campus", campus);


    let userSelected= null
    let userFound = false
    users.model.forEach(element => {
        console.log(element);
        if(element.identification == identification ){
            userSelected = element
        }
    });

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const lastnameLower = lastname.toLowerCase();
    const lastnameCapitalize = lastnameLower.charAt(0).toUpperCase() + lastnameLower.slice(1);

    if(userFound) return res.status(404).json({message:"User not found"})
    if (users.success) {
        // Update the variables only if they are not provided or empty
        if (!name || name == ''){
            name = userSelected.name;
        } else{
            name = nameCapitalize
        }
        if (!lastname || lastname == ''){
            lastname = userSelected.lastname;
        }else{
            lastname = lastnameCapitalize
        }
        if (!username || username == '') username = userSelected.username;
        if (!password || password == '') password = userSelected.password; 
        if (status ==undefined) status = userSelected.status;
        if (!photo || photo == '') photo = userSelected.photo;
        if (!email || photo == '') email = userSelected.email; // Should this be email instead of photo?
        if (!phone || photo == '') phone = userSelected.phone; // Should this be phone instead of photo?
        if (!id_rol) id_rol = userSelected.id_rol;
        if (!id_company || id_company == '') id_company = userSelected.id_company;
    } else {
        // If user retrieval fails, send an error response and return from the function
        return res.status(users.status).json({ message: users.message, error: users.error });
    }

    // Update the user model

    const saltRounds = 10; // Número de rondas de hashing (mayor es más seguro pero más lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword
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
    const { campus, identification } = req.params;

    const users = await getModelByParameterMany(User,"id_campus",campus)
    console.log(users);
    let userFound = false;
    let userSelected=null
    users.model.forEach(element => {
        if (element.identification == identification) {
            userFound = true;
            userSelected=element
            return; // Salir del bucle forEach una vez que se encontró al usuario
        }
    });

    // Si no se encontró ningún usuario
    if (!userFound) {
        return res.status(result.status).json({ message: 'User not found', error: result.error });
    }

    const result = await deleteModel(User, userSelected.identification, namePrimaryKey);
    if (result.success) {
        res.status(result.status).json({ message: 'User deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}

export const getUserByEmail = async(email,req,res)=>{
    return await getModelByParameterOne(User, "email", email)
}

export const UserLogin = async(req,res)=>{
    const { password, email } = req.body;
    const user = await getUserByEmail(email)
    const hashedPassword = user.model.dataValues.password
    if(bcrypt.compare(password, hashedPassword)){
        const userToken = {
            email: user.model.email, 
            username: user.model.username, 
            status:user.model.status,
            name:user.model.name, 
            lastname: user.model.lastname,
            id: user.model.identification, 
            rol: user.model.id_rol, 
            campus: user.model.id_campus
        }
        const accessToken = generateAccessToken(userToken);
        return res.status(200).json({ message: 'Logged', token:accessToken });
    }

    return res.status(401).json({ message: "Not authorized" });
}



