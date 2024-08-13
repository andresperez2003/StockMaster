
import { decodeAccessToken } from '../middleware/token.js';
import { Bill } from '../models/bill.model.js'; // Importa el modelo Company que defines en otro archivo
import { Campus } from '../models/campus.model.js';
import { Client } from '../models/client.model.js';
import { Company } from '../models/company.model.js';
import { statusBill } from '../models/statusBill.model.js';
import { User } from '../models/user.model.js';
import {createModel, updateModel, getModelByParameterMany, getModelByManyParameterWithJoinMany, getModelByManyParameters, hasPermissRol, hasPermissUser, searchOperation, addOperation, updateOperation, deleteOperation, getModelByManyParameterWithJoinOne} from "./general.controller.js"


const module = "Bill"

//Metodo que devuelve todos las categorias
export const getBills = async(req,res)=> {
        const {campus} = req.params;
        const token = req.headers.authorization;    
        if(!token) return res.status(401).json({message:"Token is required"})
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    
        const result = await getModelByManyParameterWithJoinMany(Bill, {"id_campus":campus}, ["id","date_bill"],[
            {model: statusBill, attributes:["name"]},
            { model:User },
            {model:Client},
            {model:Campus, attributes:["id","name","id_company"]}
        ]);

        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una categoria
//Parametros: id

//Arreglar este metodo
export const getBillsById = async(req,res)=>{
    const { campus, id } = req.params;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByManyParameterWithJoinOne(Bill,{"id_campus":campus, "id":id}, ["id","date_bill"], [
        {model: statusBill, attributes:["name"]},
        { model:User },
        {model:Client},
        {model:Campus, attributes:["id","name"], include:{model:Company, attributes:["nit","name"]}}
    ]);

    if (result.success) {  
        return res.status(result.status).json(result.model);
    } else {
        return res.status(result.status).json({ message: result.message, error: result.error });
    }
}


//Metodo que crea una nueva categoria
//Parametros: name, description
export const createBill =  async(req,res)=> {
    const { id, date_bill, id_campus, status, id_user, id_client } = req.body;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    if( !id || !date_bill || !id_campus || !status || !id_user || !id_client ) return res.status(400).json({message:"Fill all fields"})

    const existingBill = await Bill.findOne({ where: { date_bill: date_bill, id_campus:id_campus, id_user:id_user,id_client:id_client  } });
    if (existingBill) {
        return res.status(400).json({ message: 'Cannot create a duplicate bill' });
    }
    const result = await createModel(Bill, {  id, date_bill, id_campus, status, id_user, id_client});
    if (result.success) {
        res.status(result.status).json({ message: 'Bill created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateBill = async(req,res)=>{
    let { campus, id_bill } = req.params;
    let { id, date_bill, id_company, status, id_user, id_client } = req.body;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const bills =  await getModelByParameterMany(Bill, "id_campus", campus);



    let billSelected= null
    let billFound = false
    bills.model.forEach(element => {
        if(element.id == id_bill ){
            billSelected = element
            billFound=true
        }
    });

    if(!billFound) return res.status(404).json({message:"Bill not found"})
    


    if(bills.success){
        if (!id) id = billSelected.id
        if (!date_bill) date_bill = billSelected.date_bill
        if (!id_company || id_company=='') id_company = billSelected.id_company
        if (!id_user || id_user=='') id_user = billSelected.id_user
        if (!id_client || id_client=='') id_client = billSelected.id_client
    }else{
        res.status(bills.status).json({ message: bills.message, error:bills.error });
    }

    const result = await updateModel(Bill, id_bill, { id, date_bill, id_company, status, id_user, id_client });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Bill updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteBill = async(req,res)=>{
    const { campus, id } = req.params;
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByManyParameters(Bill, {"id_campus":campus, "id":id});
    
    if (result.success) {
        res.status(result.status).json({ message: 'Bill deleted' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}