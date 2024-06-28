
import { json } from 'sequelize';
import { Rol } from '../models/rol.model.js'; // Importa el modelo Company que defines en otro archivo
import {createModel, updateModel, deleteModel, getModelByParameterMany, getModelByManyParameters, searchOperation, textCapitalized, hasPermissRol, hasPermissUser, modelAlreadyExist, addOperation, getModelByParameterOne, getModelByManyParameterWithJoin} from "./general.controller.js"
import { decodeAccessToken } from '../middleware/token.js';


const module = "Rol"


//Metodo que devuelve todos los roles
export const getRoles = async(req,res)=> {
        const {company} = req.params

        const token = req.headers.authorization;    
        const dataToken = decodeAccessToken(token);

        const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
        const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

        if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

        const result = await getModelByParameterMany(Rol,"id_company",company);
        
        result.success ? res.status(result.status).json(result.model) : res.status(result.status).json({ message: result.message, error: result.error });
        
}



export const getRolByParameters = async(req,res)=> {
    const {name, company} = req.params

    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    const result = await getModelByManyParameters(Rol, { name:name, id_company: company });
    
    result.success ? res.status(result.status).json({ message: result.model }) : res.status(result.status).json({ message: result.message, error: result.error });
    
}



//Metodo que trae un rol especifico
//Parametros: id
export const getRolById = async(req,res)=>{
    const { id,company } = req.params;

    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, searchOperation, module)
    const userCanGet = await hasPermissUser(dataToken, searchOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    const result = await getModelByParameterMany(Rol, "id_company", company);

    let rolFound=false
    let rolSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            rolSelected=element
            rolFound=true        
        }
    });
    
    rolFound ? res.status(result.status).json(rolSelected) :  res.status(404).json({ message: 'Rol not found', error: result.error });
    
}


//Metodo que crea un nuevo rol
//Parametros: name, description
export const createRol =  async(req,res)=> {
    const{ description, id_company } = req.body;
    let { name } = req.body;

    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }


    if(!name) return res.status(400).json({message:"Fill all fields"})


    name = textCapitalized(name)

    const existingRol = await modelAlreadyExist({name, id_company},Rol)
    if (existingRol) {return res.status(400).json({ message: 'Cannot create a duplicate rol' })}

    const result = await createModel(Rol, { name, description, id_company });
    
    result.success ? res.status(result.status).json({ message: 'Rol created' }): res.status(result.status).json({ message: result.message, error: result.error })
 }


 
//Metodo que actualiza un rol
//Parametros: name, description
export const updateRol = async(req,res)=>{
    const { company, id } = req.params;
    let { name, description, id_company } = req.body;

    const token = req.headers.authorization;    
    const dataToken = decodeAccessToken(token);

    const rolCanGet = await hasPermissRol(dataToken, addOperation, module)
    const userCanGet = await hasPermissUser(dataToken, addOperation, module)

    if(!rolCanGet && userCanGet ){ return res.status(403).json({ message: 'User not has necessary permissions ' }); }

    
    name = textCapitalized(name)
    const rols =  await getModelByParameterMany(Rol, "id_company", company);


    const rolFound = await getModelByParameterOne(Rol, "id", id)


    if(!rolFound) return res.status(404).json({message:"Rol not found"})

    
    if(rolFound.model.name != name){
        const existingRol = await modelAlreadyExist({name, id_company},Rol)
        if(existingRol) return res.status(400).json({ message: 'Cannot use a duplicate rol name' });
    }

    if(rols.success){
        if (!name) {name = rolFound.model.name}
        if (!description) description = rolFound.model.description
        if (!id_company) id_company = rolFound.model.id_company
    }else{ res.status(rols.status).json({ message: rols.message, error:rols.error }) }

    const result = await updateModel(Rol, id, { name, description, id_company });
    
    result.success ? res.status(result.status).json({ message: 'Rol updated' }) : res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    
}

 


//Metodo que elimina una compañia
//Parametros: id
export const deleteRol = async(req,res)=>{
    const { company, id } = req.params;
    const rols = await getModelByParameterMany(Rol, "id_company", company)
    let rolFound = false;
    for (const campusObj of rols.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Rol, id);
            if (result.success) { 
                rolFound= true;
                return res.status(result.status).json({ message: 'Rol deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!rolFound) {
        return res.status(404).json({ message: 'Rol not found' });
    }
}