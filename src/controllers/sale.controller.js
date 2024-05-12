
import { Sale } from '../models/sale.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel} from "./general.controller.js"



//Metodo que devuelve todas las ventas
export const getSales = async(req,res)=> {
        const result = await getAllModels(Sale);
        if (result.success) {
            res.status(result.status).json(result.models);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una venta especifica
//Parametros: id
export const getSaleById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Sale, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Sale not found', error: result.error });
    }
}


//Metodo que crea una nueva venta
//Parametros: id, date_bill, id_company, status, id_user, id_client, end_date
export const createSale =  async(req,res)=> {
    const { id_product, quantity, id_bill, id_company } = req.body;

    if( !id_product || !quantity || !id_bill || !id_company ) return res.status(400).json({message:"Fill all fields"})

    const result = await createModel(Sale, {  id_product, quantity, id_bill, id_company });
    if (result.success) {

        res.status(result.status).json({ message: 'Sale created' });

    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una vevnta
//Parametros: name, description
export const updateSale = async(req,res)=>{
    const { id } = req.params;
    let {  id_product, quantity, id_bill, id_company } = req.body;

    const sale =  await getModelById(Sale, id);

    if(bill.success){
        if (!id_product || id_product=='') id_product = sale.model.dataValues.id_product
        if (!quantity) quantity = sale.model.dataValues.quantity
        if (!id_bill || id_bill=='') id_bill = sale.model.dataValues.id_bill
        if (!id_company || id_company=='') id_company = sale.model.dataValues.id_company
    }else{
        res.status(sale.status).json({ message: sale.message, error:sale.error });
    }

    const result = await updateModel(Sale, id, {  id_product, quantity, id_bill, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Sale updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una venta
//Parametros: id
export const deleteSale = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Sale, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Sale deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}