
import { Client } from '../models/client.model.js'; // Importa el modelo Company que defines en otro archivo
import {createModel, updateModel, deleteModel, getModelByParameterMany, hasPermissRol, hasPermissUser, getModelByManyParameterWithJoinMany, getModelByManyParameterWithJoinOne, modelAlreadyExist, getModelById, getModelByParameterOne, updateModelManyParameters} from "./general.controller.js"
import { searchOperation, addOperation, deleOperation, updateOperation  } from "./general.controller.js"
import { decodeAccessToken } from "../middleware/token.js"
import { City } from '../models/city.model.js';
import { Company } from '../models/company.model.js';
const namePrimaryKey = "identification"
const module = "Client"

//Metodo que devuelve todos los clientes
export const getClients = async(req,res)=> {
        const {company} = req.params

        const token = req.headers.authorization;    
        const dataToken = decodeAccessToken(token);

        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

        const result = await getModelByManyParameterWithJoinMany(Client, {"id_company":company, "status":true});
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

export const getClientsInactive = async(req,res)=> {
    const {company} = req.params

    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByManyParameterWithJoinMany(Client, {"id_company":company, "status":false});
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}


//Metodo que trae solo un cliente
export const getClientById = async(req,res)=>{
    const { company, identification } = req.params;
    
    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const client = await getModelByManyParameterWithJoinOne(Client, {"identification": identification, "id_company": company}, ["identification","name","lastname","email","phone","status", "address"],
        [{model: City, required:true, attributes:["id","name"]}, {model:Company, required:true, attributes:["nit","name"]}]);


    !client.success ? res.status(404).json({ message: 'Client not found' }) :res.status(200).json({Client: client.model.dataValues})
}

export const getClientByDetails = async(req, res) => {
    const { identification , name, lastname, email, status, phone, id_city } = req.body; // Cambiado a req.body para un método POST
    const {company} = req.params
    
    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module);
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module);

    if (!rolCanGet && !userCanGet) {return res.status(403).json({ message: 'User does not have necessary permissions' })}

    // Ajustar la consulta para buscar por name, lastname, o email
    let conditions={}
    conditions["id_company"] = company
    if(identification) conditions["identification"] = identification
    if(name) conditions["name"] = name
    if(lastname) conditions["lastname"] = lastname
    if(email) conditions["email"] = email
    if(status != null) conditions["status"] = status
    if(id_city) conditions["id_city"] = id_city
    if(phone) conditions["phone"] = phone



    const client = await getModelByManyParameterWithJoinMany(Client, conditions, ["identification", "name", "lastname", "email", "phone", "status", "address"], 
        [{ model: City, required: true, attributes: ["id", "name"] }, { model: Company, required: true, attributes: ["nit", "name"] }]);
    
       return  !client.success ?  res.status(404).json({ message: 'Client not found' }) :  res.status(200).json({ Client: client.model });
    
};


//Metodo que crea un nuevo cliente
//Parametros: identification, name, lastname, email, status, phone, id_city, id_company, address
export const createClient =  async(req,res)=> {
    const { identification, name, lastname, email, status, phone, id_city, id_company, address } = req.body;
    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module);
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module);

    if (!rolCanGet && !userCanGet) {return res.status(403).json({ message: 'User does not have necessary permissions' })}


    if(!name || !identification || !lastname || !email || !id_city  || !phone || !id_company || !address) return res.status(400).json({message:"Fill all fields"})
    
    const existingClient = await modelAlreadyExist({"identification":identification, "id_company":id_company}, Client)
    if(existingClient) return res.status(400).json({ message: 'Cannot create a duplicate client' });

    const result = await createModel(Client, {  identification, name, lastname, email, status, id_city, phone, id_company, address });
    
    return result.success ? res.status(result.status).json({ message: 'Client created' }) : res.status(result.status).json({ message: result.message, error: result.error });
    
 }


 
//Metodo que actualiza un nuevo cliente
//Parametros: identification, name, lastname, email, status, phone, id_city, id_company, address
export const updateClient = async (req, res) => {
    const { company, identification } = req.params;
    let { name, lastname, email, status, id_city, phone, address } = req.body;


    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module);
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module);

    if (!rolCanGet && !userCanGet) {return res.status(403).json({ message: 'User does not have necessary permissions' })}




    const  clientFound = await modelAlreadyExist({"identification":identification, "id_company":company}, Client)

    const clientSelected = await getModelByManyParameterWithJoinOne(Client, {"identification":identification, "id_company":company})

    if(clientSelected.model.email != email && email){
        const emailExist = await modelAlreadyExist({"email":email}, Client)
        if(emailExist) return res.status(400).json({message: "Cant use this email, email registered"})
    }

    if(!clientFound) return res.status(404).json({message:"Client not found"})
    
    if (clientSelected.success) {
        // Update the variables only if they are not provided or empty
        if (!name || name == '') name = clientSelected.model.name;
        if (!lastname || lastname == '') lastname = clientSelected.model.lastname;
        if (!phone ) phone = clientSelected.phone; 
        if (!id_city) id_city = clientSelected.model.id_city;
        if (!address || address=='') address = clientSelected.model.address;
        if (!email || email == '') email = clientSelected.model.email; // Should this be email instead of photo?
    } else {
        // If user retrieval fails, send an error response and return from the function
        return res.status(clientSelected.status).json({ message: clientSelected.message, error: clientSelected.error });
    }

    // Update the user model
    const result = await updateModel(Client, identification, { name, lastname, email, status, id_city, phone, address }, namePrimaryKey);

    // Check the result of the update operation and send the appropriate response
    return result.success ? res.status(result.status).json({ message: 'Client updated' }) : res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    
};


//Metodo que elimina un cliente
//Parametros: identification
export const deleteClient = async(req,res)=>{
    const { company, identification } = req.params;
    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module);
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module);

    if (!rolCanGet && !userCanGet) {return res.status(403).json({ message: 'User does not have necessary permissions' })}


    const result = await updateModelManyParameters(Client,{ status:false}, {"id_company":company, "identification":identification});

    return !result.success? res.status(404).json({ message: 'Client not found' }) : res.status(200).json({ message: 'Client successful deleted' });
    
}