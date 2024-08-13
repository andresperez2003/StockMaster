
import { decodeAccessToken } from '../middleware/token.js';
import { Unit } from '../models/unit.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterOne, getModelByParameterMany, hasPermissRol, hasPermissUser, searchOperation, addOperation, updateOperation, deleteOperation} from "./general.controller.js"

const module = "Unit"


//Metodo que devuelve todos los estados de factura
export const getUnit = async(req,res)=> {
        const {company} = req.params
        const token = req.headers.authorization;   
        if(!token) return res.status(401).json({message:"Token is required"}) 
        const dataToken = decodeAccessToken(token);
    
        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)
    
        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
        const result = await getModelByParameterMany(Unit, "id_company", company  );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

export const getUnitById = async(req,res)=>{
    const { company, id } = req.params;
    const token = req.headers.authorization;  
    if(!token) return res.status(401).json({message:"Token is required"})  
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    const units = await getModelByParameterMany(Unit, "id_company",company);
    for (const campusObj of units.model) {
        if (campusObj.id == id) {
            return res.status(units.status).json({Unit:campusObj});
        }
    }
    return res.status(units.status).json({ message: 'Unit not found', error: units.error });
    
}

export const getUnitByName = async(req,res)=>{
    const { company, name } = req.params;
    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    const units = await getModelByParameterMany(Unit, "id_company",company);
    for (const campusObj of units.model) {
        if (campusObj.name == name) {
            return res.status(units.status).json({Unit:campusObj});
        }
    }
    return res.status(units.status).json({ message: 'Unit not found', error: units.error });
    
}


//Metodo que crea un nuevo estado de factura
//Parametros: name, description
export const createUnit =  async(req,res)=> {
    const { name, id_company } = req.body;
    
    if(!name || !id_company) return res.status(400).json({message:"Fill all fields"})
    const token = req.headers.authorization;    
    if(!token) return res.status(401).json({message:"Token is required"})
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);


    const existingStatusBill = await Unit.findOne({ where: { name: nameCapitalize, id_company:id_company } });
    if (existingStatusBill) {
        return res.status(400).json({ message: 'Cannot use a duplicate unit name' });
    }


    const result = await createModel(Unit, { name:nameCapitalize, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Unit created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateUnit = async(req,res)=>{
    const { company,id } = req.params;
    let { name, id_company } = req.body;
    const token = req.headers.authorization;   
    if(!token) return res.status(401).json({message:"Token is required"}) 
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, updateOperation, module)
    const userCanGet = await hasPermissUser(dataToken, updateOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const units =  await getModelByParameterMany(Unit, "id_company", company);


    let unitSelected= null
    let unitFound = false
    units.model.forEach(element => {
        if(element.id == id ){
            unitSelected = element
            unitFound=true
        }
    });

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if(!unitFound) return res.status(404).json({message:"Unit not found"})


    if(units.success){
        if (!name){
            name = unitSelected.name
        }else{
            name = nameCapitalize
        }
        if (!id_company) id_company = unitSelected.id_company
    }else{
        res.status(units.status).json({ message: units.message, error:units.error });
    }


    if (nameCapitalize != unitSelected.name) {
        const existingUnit = await Unit.findOne({ where: { name: nameCapitalize, id_company:id_company } });
        if(existingUnit) return res.status(400).json({ message: 'Cannot use a duplicate unit name' });
    }

    const result = await updateModel(Unit, id, { name, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Unit updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina un estado delas facturas
//Parametros: id
export const deleteUnit = async(req,res)=>{
    const { company, id } = req.params;
    const token = req.headers.authorization;   
    if(!token) return res.status(401).json({message:"Token is required"}) 
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, deleteOperation, module)
    const userCanGet = await hasPermissUser(dataToken, deleteOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }
    
    const units = await getModelByParameterMany(Unit, "id_company", company)
    let unitFound = false;
    for (const campusObj of units.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Unit, id);
            if (result.success) { 
                unitFound= true;
                return res.status(result.status).json({ message: 'Unit deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!statusBillFound) {
        return res.status(404).json({ message: 'StatusBill not found' });
    }
}