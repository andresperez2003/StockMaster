
import { getCampusByIdMethod } from './campus.controller.js';
import { getRolXPermissByRolAndCompany } from './rolXpermiss.controller.js';
import { getUserXPermissByUserAndCompany } from './userXpermiss.controller.js';

export const addOperation = "Agregar"
export const deleteOperation = "Eliminar"
export const updateOperation = "Editar"
export const searchOperation = "Buscar"

export const createModel = async (Model, data) => {
    try {
        await Model.create(data);
        return { success: true, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong' };
    }
};

export const updateModel = async (Model, id, data, primaryKeyColumn = "id") => {
    try {
        await Model.update(data, { where: { [primaryKeyColumn]: id } });
        return { success: true, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status: 500, message: 'Something went wrong' };
    }
};

export const updateModelManyParameters = async (Model, data, params) => {
    try {
        await Model.update(data, { where: params});
        return { success: true, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status: 500, message: 'Something went wrong' };
    }
};


export const deleteModel = async (Model, id, primaryKeyColumn = "id") => {
    try {
        const numRowsDeleted = await Model.destroy({ where: { [primaryKeyColumn]: id } });
        if (numRowsDeleted === 0) {
            return { success: false, error: 'Model not found', status: 404 };
        }
        return { success: true, status: 200 };
    } catch (error) {
        return { success: false, error: error.message, status: 500, message: 'Something went wrong' };
    }
};

export const getModelById = async (Model, id) => {
    try {
        const model = await Model.findByPk(id);
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const getModelByParameterOne = async (Model, parameter, value) => {
    try {
        const model = await Model.findOne({            
            where: { [parameter]: value }});
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};



export const getModelByManyParameterWithJoinMany = async (Model, parameters, attributes = [], joins = []) => {
    try {
        const model = await Model.findAll({            
            attributes: attributes.length > 0 ? attributes : undefined,
            include: joins.length > 0 ? joins : undefined,
            where: parameters });
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const getModelByManyParameterWithJoinOne = async (Model, parameters, attributes = [], joins = []) => {
    try {
        const model = await Model.findOne({            
            attributes: attributes.length > 0 ? attributes : undefined,
            include: joins.length > 0 ? joins : undefined,
            where: parameters });
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const getModelByManyParameters = async (Model, parameters) => {
    try {
        const model = await Model.findOne({ where: parameters });
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const getModelByParameterMany = async (Model, parameter, value) => {
    try {
        const model = await Model.findAll({ where: { [parameter]: value } });
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const getModelByParameterManyWithJoin = async (Model, parameter,value , atribute,joins) => {
    try {
        const model = await Model.findAll(
            { 
                attributes:atribute.length >0 ? atribute:undefined,
                include:joins.length >0 ? joins:undefined,
                where: { [parameter]: value }  
            }
        );
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const getAllModels = async (Model) => {
    try {
        const models = await Model.findAll();
        return { success: true, models, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500, message:"Something went wrong" };
    }
};

export const getAllModelsWithJoin = async (Model,attributes, joins) => {
    try {
        const models = await Model.findAll({
            include: joins.length > 0 ? joins : undefined,
            attributes: attributes.length > 0 ? attributes : undefined
        });
        return { success: true, models, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500, message:"Something went wrong" };
    }
};





export const getModelByIdWithJoin = async (Model, id, attributes, joins) => {
    try {
        const model = await Model.findByPk(id,{
            attributes:attributes.length > 0 ? attributes : undefined,
            include: joins.length > 0 ? joins : undefined
        });
        if (!model) {
            return { success: false, error: 'Model not found', status:404 };
        }
        return { success: true, model, status:200 };
    } catch (error) {
        return { success: false, error: error.message, status:500,  message: 'Something went wrong'  };
    }
};

export const textCapitalized = (text)=>{
    const textLower = text.toLowerCase();
    const textCapitalize = textLower.charAt(0).toUpperCase() + textLower.slice(1);
    return textCapitalize
}

export const modelAlreadyExist = async(parameters, Model)=>{
    const existingModel = await Model.findOne({ where: parameters });
    return existingModel ? true : false
}

export const hasPermissRol = async(dataToken, operation, module)=>{
    const campus = await getCampusByIdMethod(dataToken.campus)
    const permiss = await getRolXPermissByRolAndCompany(dataToken.rol, campus.dataValues.id_company)
    let hasPermiss = false
    for (const permissObj of permiss) {
        if(permissObj.Permiss.Operation.name == operation && permissObj.Permiss.Module.name == module){
            hasPermiss = true
        }
    }
    return hasPermiss
 }

 export const hasPermissUser= async(dataToken, operation, module)=>{
    const campus = await getCampusByIdMethod(dataToken.campus)
    const userxpermiss = await getUserXPermissByUserAndCompany(dataToken.id, campus.dataValues.id_company)
    let hasPermiss = false
    for (const permissObj of userxpermiss) {
        if(permissObj.Permiss.Operation.name == operation && permissObj.Permiss.Module.name == module){
            hasPermiss = true
        }
    }
    return hasPermiss
 }