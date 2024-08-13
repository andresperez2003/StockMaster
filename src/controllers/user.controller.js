
import { User } from '../models/user.model.js'; // Importa el modelo Company que defines en otro archivo
import {getModelById, createModel, updateModel, getModelByParameterOne, getAllModelsWithJoin, getModelByIdWithJoin, getModelByParameterMany, getModelByParameterManyWithJoin, textCapitalized, modelAlreadyExist, hasPermissRol, hasPermissUser, getModelByManyParameterWithJoinMany, getModelByManyParameterWithJoinOne, searchOperation, addOperation, updateOperation, deleteOperation} from "./general.controller.js"
import { Rol } from '../models/rol.model.js';
import {config} from 'dotenv'
import bcrypt from 'bcrypt'
import { decodeAccessToken, generateAccessToken } from '../middleware/token.js';
import { Campus } from '../models/campus.model.js';
import { City } from '../models/city.model.js';
import { Company } from '../models/company.model.js';


config()

const namePrimaryKey='identification'
const module = 'User'
const nameRol = "Administrador"


//Metodo que devuelve todos los usuarios
export const getUsers = async(req,res)=> {
        const {campus} = req.params

        const token = req.headers.authorization;    
        if(!token) return res.status(401).json({message:"Token is required"})
        const dataToken = decodeAccessToken(token);
    
        let rolHasPermiss = await hasPermissRol(dataToken, searchOperation, module)
        let userHasPermiss = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolHasPermiss && !userHasPermiss){ return res.status(401).json({message:"User has no permission to search users"})}
        
    
        
        const result = await getModelByManyParameterWithJoinMany(User, {"id_campus":campus, "status":true},
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

export const getUsersInactive = async(req,res)=> {
    const {campus} = req.params

    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    let rolHasPermiss = await hasPermissRol(dataToken, "Agregar", module)
    let userHasPermiss = await hasPermissUser(dataToken, "Agregar", module)

    if(!rolHasPermiss && !userHasPermiss){ return res.status(401).json({message:"User has no permission to search a user"})}
    

    
    const result = await getModelByManyParameterWithJoinMany(User, {"id_campus":campus, "status":false},
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
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    let rolHasPermiss = await hasPermissRol(dataToken, searchOperation, module)
    let userHasPermiss = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolHasPermiss && !userHasPermiss){ return res.status(401).json({message:"User has no permission to search a user"})}
    
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
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    let rolHasPermiss = await hasPermissRol(dataToken, addOperation, module)
    let userHasPermiss = await hasPermissUser(dataToken, addOperation, module)
    console.log(rolHasPermiss, userHasPermiss);
    if(!rolHasPermiss && !userHasPermiss){ return res.status(401).json({message:"User has no permission to create a user"})}
    
    
    if(!name || !identification || !lastname || !email || !id_rol || !id_campus || !username) return res.status(400).json({message:"Fill all fields"})
    
    const nameCapitalize = textCapitalized(name)
    const lastnameCapitalize = textCapitalized(lastname)

    const userRepeat = await modelAlreadyExist({identification:identification},User)
    const emailRepeat = await modelAlreadyExist({email:email},User)

    if(userRepeat || emailRepeat) return res.status(400).json({ message: 'Cannot create a duplicate user' });

    password = await hashPassword(password)

    const result = await createModel(User, { identification, name:nameCapitalize, lastname:lastnameCapitalize, username, password, status, photo, email, phone, id_rol, id_campus });
    if (result.success) {
        res.status(result.status).json({ message: 'User created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }



export const hashPassword = async(password)=>{
    const saltRounds = 10; // Número de rondas de hashing (mayor es más seguro pero más lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword
    return password
}


 
//Metodo que actualiza un usuario
//Parametros: identification, name, lastname, username, password, status, photo, email, phone, id_rol, id_company
export const updateUser = async (req, res) => {
    const { identification } = req.params;
    let { name, lastname, username, password, status, email, phone, id_rol, id_company } = req.body;

    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    let rolHasPermiss = await hasPermissRol(dataToken, updateOperation, module)
    let userHasPermiss = await hasPermissUser(dataToken, updateOperation, module)
    let rolToken = await getModelById(Rol, dataToken.rol)

    const user = await getModelByParameterOne(User, namePrimaryKey, identification)

    if(name) name = textCapitalized(name)
    if(lastname) lastname = textCapitalized(lastname)
    if(password) password = await hashPassword(password)

    if(!user.success) return res.status(404).json({message:"User not found"})
    
    if (!name || name == ''){name = user.model.name}
    if (!lastname || lastname == ''){ lastname = user.model.lastname}
    if (!username || username == '') username = user.model.username;
    if (!password || password == '') password = user.model.password; 
    if (status ==undefined) status = user.model.status;
    if (!email || email == '') email = user.model.email; 
    if (!phone || phone == '') phone = user.model.phone;
    if (!id_rol) id_rol = user.model.id_rol;
    if (!id_company || id_company == '') id_company = user.model.id_company;
 
    console.log(userHasPermiss , rolHasPermiss);
    if(identification != dataToken.id && rolToken.model.name == nameRol && (!userHasPermiss && !rolHasPermiss)){ return res.status(401).json({message:"Admin has no permission to update a user"})}
    
    if(identification != dataToken.id && rolToken.model.name != nameRol){ return res.status(401).json({message:"User has no permission to update a user"})}
    


    //Posibles casos
    //1. El usuario administrador quiere actualizar su información
    //2. El usuario administrador quiere actualizar la información de otro usuario y tiene habilitada la opcion Editar User
    //3. El usuario empleado quiere actualizar su información y tiene habilitada la opcion Editar User
    if(( identification == dataToken.id && rolToken.model.name == nameRol) || (identification != dataToken.id && rolToken.model.name == nameRol && (!userHasPermiss && !rolHasPermiss)) || (identification == dataToken.id && rolToken.model.name != nameRol && (userHasPermiss || rolHasPermiss))){
        const userPermiss = await updateCompleteUser(identification,name, lastname, username, password, status, email, phone, id_rol, id_company, namePrimaryKey);
        return userPermiss.success ? res.status(userPermiss.status).json({ message: 'User updated' }) : res.status(userPermiss.status).json({ message: 'Something went wrong', error: userPermiss.error });
    }

    //Usuario diferente a administrador desea actualizar su informamcion (No tiene permisos de Edit User)
    const userWithoutPermiss = await updateOtherRol(identification,name, lastname, username, password, namePrimaryKey);
    return userWithoutPermiss.success ? res.status(userWithoutPermiss.status).json({ message: 'User updated' }) : res.status(userWithoutPermiss.status).json({ message: 'Something went wrong', error: userWithoutPermiss.error });
    
};


export const updateCompleteUser = async( identification ,name, lastname, username, password, status, email, phone, id_rol, id_company, namePrimaryKey )=>{
    const result = await updateModel(User, identification, { name, lastname, username, password, status, email, phone, id_rol, id_company },namePrimaryKey);

    return result.success ?  {success:true, status:result.status} : {success:false, error:result.error, status:result.status}
    
}

export const updateOtherRol = async(identification,name, lastname, username, password, namePrimaryKey )=>{
    const result = await updateModel(User, identification, { name, lastname, username, password },namePrimaryKey);

    return result.success ?  {success:true, status:result.status} : {success:false, error:result.error, status:result.status}
    
}




//Metodo que elimina una usuario
//Parametros: identification
export const deleteUser = async(req,res)=>{
    const { campus, identification } = req.params;

    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    let rolHasPermiss = await hasPermissRol(dataToken, deleteOperation, module)
    let userHasPermiss = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolHasPermiss && !userHasPermiss){ return res.status(401).json({message:"User has no permission to delete a user"})}
    

    const user = await getModelByManyParameterWithJoinOne(User, {"id_campus":campus, "identification":identification})

    if(!user.success) return res.status(404).json({message:"User not found"})

    const campusUserToken = await getModelById(Campus, dataToken.campus)
    const campusUser = await getModelById(Campus, campus)

    if(campusUserToken.model.id_company != campusUser.model.id_company) return res.status(401).json({message:"Forbidden"})



    const result = await updateModel(User,user.model.identification, {"status":false}, namePrimaryKey);
    return result.success ? res.status(result.status).json({ message: 'User deleted' }) : res.status(result.status).json({ message: result.message, error: result?.error });
    
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




export const getUserByDetails = async(req, res) => {
    const { name, identification, id_rol, lastname, email, username, status, phone } = req.body; // Cambiado a req.body para un método POST
    
    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module);
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module);

    if (!rolCanGet && !userCanGet) {return res.status(403).json({ message: 'User does not have necessary permissions' })}

    // Ajustar la consulta para buscar por name, lastname, o email
    let conditions={}
    conditions["id_campus"] = dataToken.campus
    if(name) conditions["name"] = name
    if(identification) conditions["identification"] = identification
    if(username) conditions["username"] = username
    if(lastname) conditions["lastname"] = lastname
    if(email) conditions["email"] = email
    if(id_rol) conditions["id_rol"] = id_rol
    if(status != null) conditions["status"] = status
    if(phone) conditions["phone"] = phone


    const user = await getModelByManyParameterWithJoinMany(User, conditions, ["identification", "name", "lastname", "email", "phone", "username","status"], 
        [{ model: Rol, required: true, attributes: ["id", "name"] }, { model: Campus, required: true, attributes: ["name", "address"] }]);
    
     console.log(user);   
       return  !user.success ?  res.status(404).json({ message: 'User not found' }) :  res.status(200).json({ User: user.model });
    
};



