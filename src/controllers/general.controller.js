

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
        const model = await Model.findOne({ where: { [parameter]: value } });
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
        console.log(attributes);
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