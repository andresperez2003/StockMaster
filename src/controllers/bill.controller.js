
import { Bill } from '../models/bill.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"




//Metodo que devuelve todos las categorias
export const getBills = async(req,res)=> {
        const result = await getAllModels(Bill);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una categoria
//Parametros: id
export const getBillsById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Bill, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Bill not found', error: result.error });
    }
}


//Metodo que crea una nueva categoria
//Parametros: name, description
export const createBill =  async(req,res)=> {
    const { id, date_bill, id_company, status, id_user, id_client, end_date } = req.body;

    if( !id || !date_bill || !id_company || !status || !id_user || !id_client || !end_date ) return res.status(400).json({message:"Fill all fields"})

    const result = await createModel(Category, {  id, date_bill, id_company, status, id_user, id_client, end_date});
    if (result.success) {
        res.status(result.status).json({ message: 'Bill created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateBill = async(req,res)=>{
    const { id } = req.params;
    let {  date_bill, id_company, status, id_user, id_client, end_date } = req.body;

    const bill =  await getModelById(Bill, id);

    if(bill.success){
        if (!date_bill) date_bill = bill.model.dataValues.date_bill
        if (!id_company || id_company=='') id_company = bill.model.dataValues.id_company
        if (!id_user || id_user=='') id_user = bill.model.dataValues.id_user
        if (!id_client || id_client=='') id_client = bill.model.dataValues.id_client
        if (!end_date) end_date = bill.model.dataValues.end_date
    }else{
        res.status(bill.status).json({ message: bill.message, error:bill.error });
    }

    const result = await updateModel(Bill, id, { date_bill, id_company, status, id_user, id_client, end_date });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Bill updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteBill = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Bill, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Bill deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}