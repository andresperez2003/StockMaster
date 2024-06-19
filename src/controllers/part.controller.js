

import { Part } from '../models/part.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany} from "./general.controller.js"



//Metodo que devuelve todos las partes
export const getParts = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterMany(Part,"id_company", company);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una parte especifica
//Parametros: id
export const getPartById = async(req,res)=>{
    const { company, id } = req.params;
    const parts = await getModelByParameterMany(Part,"id_company", company);
    for (const campusObj of parts.model) {
        if (campusObj.id == id) {
            return res.status(parts.status).json({Part:campusObj});
        }
    }
    return res.status(parts.status).json({ message: 'Part not found', error: parts.error });
    
}


//Metodo que crea una nueva parte
//Parametros: name, quantity, price, unit, photo, id_company 
export const createPart =  async(req,res)=> {
    const { name, price_sale, price_unit, photo, id_company } = req.body;

    if(!name   || !price_sale || !price_unit  ||!photo || !id_company) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingPart = await Part.findOne({ where: { name: nameCapitalize } });
    if (existingPart) {
        return res.status(400).json({ message: 'Cannot create a duplicate part' });
    }

    const result = await createModel(Part, { nameCapitalize, price_sale, price_unit, photo, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Part created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una parte
//Parametros: id, name, quantity, price, unit, photo, id_company 
export const updatePart = async(req,res)=>{
    const { company,id } = req.params;
    let { name, quantity, price,unit, photo } = req.body;

    const parts =  await getModelByParameterMany(Part, "id_company", company);

    let partSelected= null
    let partFound = false
    parts.model.forEach(element => {
        console.log(element);
        if(element.id == id ){
            partSelected = element
            partFound=true
        }
    });

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if (nameCapitalize != partSelected.name) {
        const existingPart = await Part.findOne({ where: { name: nameCapitalize } });
        if(existingPart) return res.status(400).json({ message: 'Cannot use a duplicate part name' });
    }

    if(!partFound) return res.status(404).json({message:"Part not found"})
    


    if(parts.success){
        if (!name || name==''){
            name = partSelected.name
        }else{
            name = nameCapitalize
        }
        if (!quantity) quantity = partSelected.quantity
        if (!price) price = partSelected.price
        if (!photo || photo=='') photo = partSelected.photo
        if (!unit) unit = partSelected.unit
    }else{
        res.status(parts.status).json({ message: parts.message, error:parts.error });
    }

    const result = await updateModel(Part, id, { name, quantity, price, unit, photo });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Part updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte
//Parametros: id
export const deletePart = async(req,res)=>{
    const { company, id } = req.params;
    const parts = await getModelByParameterMany(Part, "id_company", company)
    let partFound = false;
    for (const campusObj of parts.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Part, id);
            if (result.success) { 
                partFound= true;
                return res.status(result.status).json({ message: 'Part deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!partFound) {
        return res.status(404).json({ message: 'Part not found' });
    }
}