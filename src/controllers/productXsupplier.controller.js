
import { json } from 'sequelize';
import { ProductXSupplier } from '../models/productXsupplier.model.js';
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterManyWithJoin, getModelByParameterMany} from "./general.controller.js"


//Metodo que devuelve todos los proveedores de los producto
export const getProductXSupplier = async(req,res)=> {
        const {company} = req.params
        const result = await getModelByParameterManyWithJoin(ProductXSupplier,"id_company", company,[],[]);
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae los proveedores de un producto
//Parametros: id
export const getProductXSupplierById = async(req,res)=>{
    const { company, id } = req.params;
    const result = await getModelByParameterManyWithJoin(ProductXSupplier, "id_company", company, [] , []);

    let productxsupplierFound=false
    let productxsupplierSelected = null
    result.model.forEach(element => {
        if(element.id == id){
            productxsupplierSelected=element
            productxsupplierFound=true        
        }
    });
    
    if(productxsupplierFound) return res.status(result.status).json(productxsupplierSelected);
    if(!productxsupplierFound) return res.status(404).json({ message: 'ProductXSupplier not found', error: result.error });
    
        
}


//Metodo que agrega un proveedor a un producto
//Parametros: name, description
export const createProductXSupplier =  async(req,res)=> {
    const { id_product, id_supplier, id_company } = req.body;

    if( !id_supplier || !id_product || !id_company) return res.status(400).json({message:"Fill all fields"})
    

    const existingProductXSupplier = await ProductXSupplier.findOne({ where: { id_product: id_product, id_supplier: id_supplier, id_company:id_company  } });
    if (existingProductXSupplier) {
        return res.status(400).json({ message: 'Cannot add a duplicated supplier to a product' });
    }

    const result = await createModel(ProductXSupplier, { id_product, id_supplier, id_company });
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier added to Product' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza el proveedor de un producto
//Parametros: id,id_product, id_supplier, id_company
export const updateProductXSupplier = async(req,res)=>{
    const { company,id } = req.params;
    let { id_product, id_supplier, id_company } = req.body;

    const productxsupplier =  await getModelByParameterMany(ProductXSupplier, "id_company", company);


    let productxsupplierSelected= null
    let productxsupplierFound = false
    productxsupplier.model.forEach(element => {
        if(element.id == id ){
            productxsupplierSelected = element
            productxsupplierFound=true
        }
    });

    if(!productxsupplierFound) return res.status(404).json({message:"ProductXSupplier not found"})

    if(productxsupplier.success){
        if (!id_product) id_product = productxsupplierSelected.id_product
        if (!id_supplier) id_supplier = productxsupplierSelected.id_supplier
        if (!id_company) id_company = productxsupplierSelected.id_company
    }else{
        res.status(productxsupplier.status).json({ message: productxsupplier.message, error:productxsupplier.error });
    }

    const result = await updateModel(ProductXSupplier, id, { id_product, id_supplier, id_company });
    
    if (result.success) {
        res.status(result.status).json({ message: 'Supplier of the product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina el proveedor de un producto
//Parametros: id
export const deleteProductXSupplier = async(req,res)=>{
    const { company, id } = req.params;
    const productxsuppliers = await getModelByParameterMany(ProductXSupplier, "id_company", company)
    let productxsupplierFound = false;

    for (const campusObj of productxsuppliers.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(ProductXSupplier, id);
            if (result.success) { 
                productxsupplierFound= true;
                return res.status(result.status).json({ message: 'ProductXSupplier deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!productxsupplierFound) {
        return res.status(404).json({ message: 'ProductXSupplier not found' });
    }
}