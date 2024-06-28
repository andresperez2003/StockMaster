
import { Client } from '../models/client.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"

const namePrimaryKey = "identification"


//Metodo que devuelve todos los clientes
export const getClients = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterMany(Client, "id_company", company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae solo un cliente
export const getClientById = async(req,res)=>{
    const { company, identification } = req.params;


    const clients = await getModelByParameterMany(Client, "id_company", company);
    let clientFound = false;
    for (const campusObj of clients.model) {
        if (campusObj.identification == identification) {
            clientFound = true
            return res.status(clients.status).json({ Client:campusObj }); 
        }
    }

    if (!clientFound) {
        return res.status(404).json({ message: 'Product not found' });
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
    const { company, identification } = req.params;
    let { name, lastname, email, status, id_city, phone, id_company, address } = req.body;

    const clients = await getModelByParameterMany(Client, "id_company", company);
    
    let clientSelected= null
    let clientFound = false
    clients.model.forEach(element => {
        if(element.identification == identification ){
            clientSelected = element
            clientFound=true
        }
    });

    if(!clientFound) return res.status(404).json({message:"Client not found"})
    
    if (clients.success) {
        // Update the variables only if they are not provided or empty
        if (!name || name == '') name = clientSelected.name;
        if (!lastname || lastname == '') lastname = clientSelected.lastname;
        if (!email || photo == '') email = clientSelected.email; // Should this be email instead of photo?
        if (!phone || photo == '') phone = clientSelected.phone; // Should this be phone instead of photo?
        if (!id_city) id_city = clientSelected.id_city;
        if (!address || address=='') address = clientSelected.address;
        if (!id_company || id_company == '') id_company = clientSelected.id_company;
    } else {
        // If user retrieval fails, send an error response and return from the function
        return res.status(clients.status).json({ message: clients.message, error: clients.error });
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
    const { company, identification } = req.params;
    const clients = await getModelByParameterMany(Client, "id_company", company)
    let clientFounds = false;
    for (const campusObj of clients.model) {
        if (campusObj.identification == identification) {
            const result = await deleteModel(Client,identification,"identification");
            if (result.success) { 
                clientFounds= true;
                return res.status(result.status).json({ message: 'Client deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!clientFounds) {
        return res.status(404).json({ message: 'Client not found' });
    }
}