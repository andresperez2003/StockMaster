
import { Client } from '../models/client.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"

const namePrimaryKey = "identification"


//Metodo que devuelve todos los clientes
export const getClients = async(req,res)=> {
        const result = await getAllModels(Client);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae solo un cliente
export const getClientById = async(req,res)=>{
    const { identification } = req.params;
    const result = await getModelById(Client, identification);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Client not found', error: result.error });
    }
}


//Metodo que crea un nuevo cliente
//Parametros: identification, name, lastname, email, status, phone, id_city, id_company, address
export const createClient =  async(req,res)=> {
    const { identification, name, lastname, email, status, phone, id_city, id_company, address } = req.body;

    if(!name || !identification || !lastname || !email || !id_city  || !phone || !id_company || !address) return res.status(400).json({message:"Fill all fields"})
    
    const existingClient = await Client.findOne({ where: { identification: identification } });
    if (existingClient) {
        return res.status(400).json({ message: 'Cannot create a duplicate client' });
    }

    const result = await createModel(Client, {  identification, name, lastname, email, status, id_city, phone, id_company, address });
    if (result.success) {
        res.status(result.status).json({ message: 'Client created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un nuevo cliente
//Parametros: identification, name, lastname, email, status, phone, id_city, id_company, address
export const updateClient = async (req, res) => {
    const { identification } = req.params;
    let { name, lastname, email, status, id_city, phone, id_company, address } = req.body;

    const client = await getModelById(Client, identification);
    if (client.success) {
        // Update the variables only if they are not provided or empty
        if (!name || name == '') name = client.model.dataValues.name;
        if (!lastname || lastname == '') lastname = client.model.dataValues.lastname;
        if (!email || photo == '') email = client.model.dataValues.email; // Should this be email instead of photo?
        if (!phone || photo == '') phone = client.model.dataValues.phone; // Should this be phone instead of photo?
        if (!id_city) id_city = client.model.dataValues.id_city;
        if (!address || address=='') address = client.model.dataValues.address;
        if (!id_company || id_company == '') id_company = client.model.dataValues.id_company;
    } else {
        // If user retrieval fails, send an error response and return from the function
        return res.status(client.status).json({ message: client.message, error: client.error });
    }

    // Update the user model
    const result = await updateModel(Client, identification, { name, lastname, email, status, id_city, phone, id_company, address }, namePrimaryKey);

    // Check the result of the update operation and send the appropriate response
    if (result.success) {
        res.status(result.status).json({ message: 'Client updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
};


//Metodo que elimina un cliente
//Parametros: identification
export const deleteClient = async(req,res)=>{
    const { identification } = req.params;
    const result = await deleteModel(Client, identification, namePrimaryKey);
    if (result.success) {
        res.status(result.status).json({ message: 'Client deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}