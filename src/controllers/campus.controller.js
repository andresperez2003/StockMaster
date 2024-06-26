
import { Campus } from '../models/campus.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, getModelByParameterManyWithJoin} from "./general.controller.js"
import {City} from '../models/city.model.js'
import { Department } from '../models/department.model.js';
import { Country } from '../models/country.model.js';
import {Company} from '../models/company.model.js'



//Metodo que devuelve todos los campus
export const getCampus = async(req,res)=> {
    const {company} = req.params
        const result = await getModelByParameterManyWithJoin(Campus,"id_company", company,
            ["id","name","address","phone","status","main_campus"],
            [
                {model: Company, required:true, attributes:["nit","name", "photo"]},
                {model: City,required: true, attributes:["id","name","postal_code"], include:[
                    {model:Department, required:true, attributes:["name"], include:[
                        {model:Country, required:true,attributes:["name"]}
                    ]}
                ]}
            ]
        );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un campus
//Parametros: id
export const getCampusById = async(req,res)=>{
    const { id } = req.params;
    const result = await getModelById(Campus, id);
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Campus not found', error: result.error });
    }
}

export const getCampusByCompany = async(req,res)=>{
    const { company } = req.params;
    const result = await getModelByParameterMany(Campus,"id_company",company );
    if (result.success) {
        res.status(result.status).json(result.model);
    } else {
        res.status(result.status).json({ message: 'Campus not found', error: result.error });
    }
}



export const getCampusByIdMethod = async(id) =>{
    const result = await getModelById(Campus, id);
    if (result.success) {
        return result.model;
    } else {
        return null;
    }
}





//Metodo que crea un nuevo campus
//Parametros: name, description
export const createCampus =  async(req,res)=> {
    const { name, address, phone, id_city,status,main_campus, id_company } = req.body;

    if(!name || !address || !phone || !id_city || !status  || !id_company) return res.status(400).json({message:"Fill all fields"})
 

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const addressLower = name.toLowerCase();
    const addressCapitalize = addressLower.charAt(0).toUpperCase() + addressLower.slice(1);

    
    const existingCampus = await Campus.findOne({ where: { name: nameCapitalize, id_city:id_city, id_company:id_company } });
    if (existingCampus) {
        return res.status(400).json({ message: 'Cannot create a duplicate campus' });
    }

    const result = await createModel(Campus, { name, address, phone, id_city,status,main_campus, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Campus created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una categoria
//Parametros: name, description
export const updateCampus = async(req,res)=>{
    const { company, id } = req.params;
    let {name, address, phone, id_city,status,main_campus, id_company  } = req.body;

    const campus =  await getModelByParameterMany(Campus, "id_company", company);
    let campusSelected= null
    let campusFound = false
    for(let campusObj in campus.model){
        if(campusObj.id == id){
            campusSelected=campusObj
            campusFound = true
        }
    }

    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    const addressLower = name.toLowerCase();
    const addressCapitalize = addressLower.charAt(0).toUpperCase() + addressLower.slice(1);

    

    if(campusFound) return res.status(404).json({message:"Campus not found"})

    if(campus.success){
        if (!name){name = campusSelected.name}else{ name = nameCapitalize}
        if (!address){address = campusSelected.address}else{ address = addressCapitalize}
        if (!phone) phone = campusSelected.phone
        if (!id_city) id_city  = campusSelected.id_city
        if (status == undefined) status = campusSelected.status
        if (main_campus == undefined) main_campus = campusSelected.main_campus
        if (!id_company) id_company = campusSelected.id_company
    }else{
        res.status(campus.status).json({ message: campus.message, error:campus.error });
    }

    const result = await updateModel(Campus, id, { name, address, phone, id_city,status,main_campus, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Campus updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una categoria
//Parametros: id
export const deleteCampus = async(req,res)=>{
    const { id } = req.params;
    const result = await deleteModel(Campus, id);
    if (result.success) {
        res.status(result.status).json({ message: 'Campus deleted' });
    } else {
        res.status(result.status).json({ message: result.message, error: result?.error });
    }
}

//Metodo que elimina una categoria
//Parametros: id
export const deleteCampusByCompany = async (req, res) => {
    const { company, id } = req.params;
    const campus = await getModelByParameterMany(Campus, "id_company", company);
    
    let campusFound = false;

    for (const campusObj of campus.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Campus, id);
            if (result.success) { 
                campusFound = true;
                return res.status(result.status).json({ message: 'Campus deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!campusFound) {
        return res.status(404).json({ message: 'Campus not found' });
    }
};
