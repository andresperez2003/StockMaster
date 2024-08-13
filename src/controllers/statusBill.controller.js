
import { decodeAccessToken } from '../middleware/token.js';
import { statusBill } from '../models/statusBill.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany, searchOperation, hasPermissRol, hasPermissUser, addOperation, updateOperation, deleteOperation} from "./general.controller.js"



const module = "StatusBill"

//Metodo que devuelve todos los estados de factura
export const getStatusBill = async(req,res)=> {
        const {company} = req.params
        const token = req.headers.authorization;  
        if(!token) return res.status(401).json({message:"Token is required"})  
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

        const result = await getModelByParameterMany(statusBill, "id_company", company  );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

export const getStatusBillById = async(req,res)=>{
    const { company, id } = req.params;
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message:"Token is required"})    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
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
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
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
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    if(!name || !id_company) return res.status(400).json({message:"Fill all fields"})

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const existingStatusBill = await statusBill.findOne({ where: { name: nameCapitalize, id_company:id_company } });
    if (existingStatusBill) {
        return res.status(400).json({ message: 'Cannot use a duplicate statusBill name' });
    }


    const result = await createModel(statusBill, { name:nameCapitalize, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'StatusBill created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateStatusBill = async(req,res)=>{
    const { company,id } = req.params;
    let { name, id_company } = req.body;
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const statusBills =  await getModelByParameterMany(statusBill, "id_company", company);


    let statusBillSelected= null
    let statusBillFound = false
    statusBills.model.forEach(element => {
        if(element.id == id ){
            statusBillSelected = element
            statusBillFound=true
        }
    });

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);



    if(!statusBillFound) return res.status(404).json({message:"StatusBill not found"})

    if(statusBills.success){
        if (!name){
            name = statusBillSelected.name
        }else{
            name = nameCapitalize
        }
        if (!id_company) id_company = statusBillSelected.id_company
    }else{
        res.status(statusBills.status).json({ message: statusBills.message, error:statusBills.error });
    }

    if (nameCapitalize != statusBillSelected.name) {
        const existingStatusBill = await statusBill.findOne({ where: { name: nameCapitalize, id_company:id_company } });
        if(existingStatusBill) return res.status(400).json({ message: 'Cannot use a duplicate statusBill name' });
    }

    const result = await updateModel(statusBill, id, { name, id_company });
    
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
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
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