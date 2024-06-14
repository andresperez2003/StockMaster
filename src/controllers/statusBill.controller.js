
import { statusBill } from '../models/statusBill.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany} from "./general.controller.js"




//Metodo que devuelve todos los estados de factura
export const getStatusBill = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterMany(statusBill, "id_company", company  );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

export const getStatusBillById = async(req,res)=>{
    const { company, id } = req.params;
    const statusBills = await getModelByParameterMany(statusBill, "id_company",company);
    for (const campusObj of statusBills.model) {
        if (campusObj.id == id) {
            return res.status(statusBills.status).json({StatusBill:campusObj});
        }
    }
    return res.status(statusBills.status).json({ message: 'StatusBill not found', error: statusBills.error });
    
}

export const getStatusBillByName = async(req,res)=>{
    const { company, name } = req.params;
    const statusBills = await getModelByParameterMany(statusBill, "id_company",company);
    for (const campusObj of statusBills.model) {
        if (campusObj.name == name) {
            return res.status(statusBills.status).json({StatusBill:campusObj});
        }
    }
    return res.status(statusBills.status).json({ message: 'StatusBill not found', error: statusBills.error });
    
}


//Metodo que crea un nuevo estado de factura
//Parametros: name, description
export const createStatusBill =  async(req,res)=> {
    const { name, id_company } = req.body;
    console.log(id_company);
    if(!name || !id_company) return res.status(400).json({message:"Fill all fields"})

    const result = await createModel(statusBill, { name, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'StatusBill created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateStatusBill = async(req,res)=>{
    const { id } = req.params;
    let { name, id_company } = req.body;

    const statusBills =  await getModelById(statusBill, id);

    if(statusBills.success){
        if (!name) name = statusBills.model.dataValues.name
        if (!id_company) id_company = statusBills.model.dataValues.id_company
    }else{
        res.status(statusBills.status).json({ message: statusBills.message, error:statusBills.error });
    }

    const result = await updateModel(statusBills, id, { name, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'StatusBill updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina un estado delas facturas
//Parametros: id
export const deleteStatusBill = async(req,res)=>{
    const { company, id } = req.params;
    const statusBills = await getModelByParameterMany(statusBill, "id_company", company)
    let statusBillFound = false;
    for (const campusObj of statusBills.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(statusBill, id);
            if (result.success) { 
                statusBillFound= true;
                return res.status(result.status).json({ message: 'StatusBill deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!statusBillFound) {
        return res.status(404).json({ message: 'StatusBill not found' });
    }
}