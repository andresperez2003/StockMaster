
import { Bill } from '../models/bill.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos las categorias
export const getBills = async(req,res)=> {
        const {campus} = req.params
        const result = await getModelByParameterMany(Bill,"id_campus",campus);
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
    const bills = await getModelByParameterMany(Bill,"id_campus", campus);
    for (const campusObj of bills.model) {
        if (campusObj.id == id) {
            return res.status(bills.status).json({Bill:campusObj});
        }
    }
    return res.status(bills.status).json({ message: 'Bill not found', error: bills.error });
    
}


//Metodo que crea una nueva categoria
//Parametros: name, description
export const createBill =  async(req,res)=> {
    const { id, date_bill, id_campus, status, id_user, id_client } = req.body;
    console.log(id, date_bill, id_campus, status, id_user, id_client );
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
    const bills = await getModelByParameterMany(Bill, "id_campus", campus);
    
    let billFound = false;

    for (const campusObj of bills.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Bill, id);
            if (result.success) { 
                billFound = true;
                return res.status(result.status).json({ message: 'Bill deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!billFound) {
        return res.status(404).json({ message: 'Bill not found' });
    }
}