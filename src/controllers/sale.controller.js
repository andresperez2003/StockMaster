
import { Sale } from '../models/sale.model.js'; // Importa el modelo Company que defines en otro archivo
import {getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, getModelByParameterManyWithJoin, getModelByParameterOne} from "./general.controller.js"
import { Product } from '../models/product.model.js';
import { Category } from '../models/category.model.js';


//Metodo que devuelve todas las ventas
export const getSales = async(req,res)=> {
        const {campus} = req.params
        const result = await  getModelByParameterManyWithJoin(Sale, "id_campus", campus, 
            ["quantity","id_bill"],
            [
                {model: Product,required: true, attributes:["id","name","price_sale","price_unit","description","photo","status","discount","id_company"]},
            ]
        );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae una venta especifica
//Parametros: id
export const getSaleById = async(req,res)=>{
    const { campus, id } = req.params;
    const sales = await getModelByParameterMany(Sale,"id_campus", campus);
    for (const campusObj of sales.model) {
        if (campusObj.id == id) {
            return res.status(sales.status).json({Sale:campusObj});
        }
    }
    return res.status(sales.status).json({ message: 'Sale not found', error: sales.error });
    
}


//Metodo que crea una nueva venta
//Parametros: id, date_bill, id_company, status, id_user, id_client, end_date
export const createSale =  async(req,res)=> {
    const { id_product, quantity, id_bill, id_campus } = req.body;

    if( !id_product || !quantity || !id_bill || !id_campus ) return res.status(400).json({message:"Fill all fields"})

    const result = await createModel(Sale, {  id_product, quantity, id_bill, id_campus });
    if (result.success) {

        res.status(result.status).json({ message: 'Sale created' });

    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza una vevnta
//Parametros: name, description
export const updateSale = async(req,res)=>{
    const { id } = req.params;
    let {  id_product, quantity, id_bill, id_company } = req.body;

    const sale =  await getModelById(Sale, id);

    if(bill.success){
        if (!id_product || id_product=='') id_product = sale.model.dataValues.id_product
        if (!quantity) quantity = sale.model.dataValues.quantity
        if (!id_bill || id_bill=='') id_bill = sale.model.dataValues.id_bill
        if (!id_company || id_company=='') id_company = sale.model.dataValues.id_company
    }else{
        res.status(sale.status).json({ message: sale.message, error:sale.error });
    }

    const result = await updateModel(Sale, id, {  id_product, quantity, id_bill, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Sale updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una venta
//Parametros: id
export const deleteSale = async(req,res)=>{
    const { campus, id } = req.params;
    const sales = await getModelByParameterMany(Sale, "id_campus", campus);
    
    let saleFound = false;

    for (const campusObj of sales.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Sale, id);
            if (result.success) { 
                saleFound = true;
                return res.status(result.status).json({ message: 'Sale deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!saleFound) {
        return res.status(404).json({ message: 'Sale not found' });
    }
}


export const getSaleByBill = async(req,res)=>{
    const { bill } = req.params;
    const sales = await getModelByParameterManyWithJoin(Sale,"id_bill", bill,
        ["id_bill","quantity"],
        [
            {model: Product,required: true, attributes:["id","name","price_sale","price_unit","description","photo","status","discount"], 
            include:[{model:Category, required:true, attributes:["name"]}] },

        ]
    );
    
    return res.status(sales.status).json({ sales:sales.model });
    
}