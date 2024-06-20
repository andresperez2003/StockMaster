
import { Permiss } from '../models/permiss.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getAllModelsWithJoin, getModelByIdWithJoin, getModelByParameterManyWithJoin, getModelByParameterMany} from "./general.controller.js"
import { Operation } from '../models/operation.model.js';
import { Module } from '../models/module.model.js';



//Metodo que devuelve todos las partes de un producto
export const getPermiss = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterManyWithJoin(Permiss,"id_company",company,[/* "id" */],[
           /*  {model:Operation, required:true, attributes:["name"]},
            {model:Module, required:true, attributes:["name"]} */
        ]);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae la parte especifica de un producto
//Parametros: id
export const getPermissById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterManyWithJoin(Permiss,"id_company", company,[/* "id" */],[
       /*  {model:Operation, required:true, attributes:["name"]},
        {model:Module, required:true, attributes:["name"]} */
    ]);

    for (const campusObj of result.model) {
        if (campusObj.id == id) {
            return res.status(result.status).json({Permiss:campusObj});
        }
    }
    return res.status(result.status).json({ message: 'Permiss not found', error: result.error });
    
}


//Metodo que agrega una parte a un producto
//Parametros: id_product, id_part, id_company
export const createPermiss =  async(req,res)=> {
    const { id_module, id_operation, id_company } = req.body;

    if( !id_module || !id_operation || id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingPermiss = await Permiss.findOne({ where: { id_module: id_module, id_operation: id_operation, id_company:id_company  } });
    if (existingPermiss) {
        return res.status(400).json({ message: 'Cannot add a duplicated permiss' });
    }

    const result = await createModel(Permiss, { id_module, id_operation, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Permiss added' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una pare de un producto
//Parametros: id, id_product, id_part, id_company
export const updatePermiss = async(req,res)=>{
    const { company,id } = req.params;
    let { id_operation, id_module, id_company } = req.body;

    const permisses =  await getModelByParameterMany(Permiss, "id_company", company);
    //price unit

    let permissSelected= null
    let permissFound = false
    permisses.model.forEach(element => {
        if(element.id == id ){
            permissSelected = element
            permissFound=true
        }
    });


    if(id_operation != permissSelected.id_operation || id_module != permissSelected.id_module || id_company != permissSelected.id_company){
        const existingPermiss = await Permiss.findOne({where: { id_module: id_module, id_operation: id_operation, id_company:id_company  }});
        if(existingPermiss) return res.status(400).json({ message: 'Cannot add a duplicate permiss' });
            
    }

    if(!permissFound) return res.status(404).json({message:"Permiss not found"})


    if(permisses.success){
        if (!id_operation) id_operation = permissSelected.model.id_product
        if (!id_module) id_module = permissSelected.model.id_module
        if (!id_company) id_company = permissSelected.model.id_company
    }else{
        res.status(permisses.status).json({ message: permisses.message, error:permisses.error });
    }

    const result = await updateModel(Permiss, id, { id_operation, id_module, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Permiss updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una parte de un producto
//Parametros: id
export const deletePermiss = async(req,res)=>{
    const { company, id } = req.params;

    const permisses = await getModelByParameterMany(Permiss, "id_company", company)

    let permissFound = false;
    for (const campusObj of permisses.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Permiss, id);
            if (result.success) { 
                permissFound= true;
                return res.status(result.status).json({ message: 'Permimss deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!permissFound) {
        return res.status(404).json({ message: 'Permiss not found' });
    }
}