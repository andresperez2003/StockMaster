
import { json } from 'sequelize';
import { Product } from '../models/product.model.js'; // Importa el modelo Company que defines en otro archivo
import {getAllModels, getModelById, createModel, updateModel, deleteModel, getModelByParameterMany, getModelByParameterOne, getModelByParameterManyWithJoin} from "./general.controller.js"
import { Category } from '../models/category.model.js';



//Metodo que devuelve todos los productos
export const getProducts = async(req,res)=> {
        const {company} = req.params
        console.log(company);
        const result = await getModelByParameterManyWithJoin(Product, "id_company", company,
            ["id","name","price_sale","price_unit","description","photo","status","discount","id_company"],
            [
                {model: Category,required: true, attributes:['name']},
            ]
        );
        if (result.success) {
            res.status(result.status).json(result.model);
        } else {
            res.status(result.status).json({ message: result.message, error: result.error });
        }
}

//Metodo que trae un producto especifico
//Parametros: id
export const getProductById = async(req,res)=>{
    const { company, id } = req.params;
    const products = await getModelByParameterMany(Product, "id_company",company);
    for (const campusObj of products.model) {
        if (campusObj.id == id) {
            return res.status(products.status).json({Product:campusObj});
        }
    }
    return res.status(products.status).json({ message: 'Product not found', error: products.error });
    
}


//Metodo que crea un nuevo producto
//Parametros:  name, price, quantity, description, photo, status,discount, id_category, id_company
export const createProduct =  async(req,res)=> {
    const { name, price_sale, price_unit, description, photo, status,discount, id_category, id_company, id_unit, can_sell } = req.body;
    if(!name || !price_sale || !price_unit || !description || !photo || !discount || !id_category || !id_company || !id_unit) return res.status(400).json({message:"Fill all fields"})
    const nameLower = name.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    const existingProduct = await Product.findOne({ where: { name: nameCapitalize, id_company:id_company } });
    
    if (existingProduct) {
        return res.status(400).json({ message: 'Cannot create a duplicate product' });
    }

    const result = await createModel(Product, { nameCapitalize, price_sale, description, price_unit, photo, status,discount, id_category, id_company, id_unit, can_sell });
    if (result.success) {
        res.status(result.status).json({ message: 'Product created' });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
 }


 
//Metodo que actualiza un producto
//Parametros: id, name, price, quantity, description, photo, status,discount, id_category, id_company
export const updateProduct = async(req,res)=>{
    const { company, id } = req.params;
    let { name, price_unit, price_sale, description, photo, status,discount, id_category, id_company, id_unit, can_sell } = req.body;

    const products =  await getModelByParameterMany(Product, "id_company", company);
    //price unit

    let productSelected= null
    let productFound = false
    products.model.forEach(element => {
        console.log(element);
        if(element.id == id ){
            productSelected = element
            productFound=true
        }
    });

    const nameLower = productSelected.toLowerCase();
    const nameCapitalize = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if (nameCapitalize != productSelected.name) {
        const existingModule = await Product.findOne({ where: { name: nameCapitalize, id_company:id_company } });
        if(existingModule) return res.status(400).json({ message: 'Cannot use a duplicate product name' });
    }


    if(!productFound) return res.status(404).json({message:"Product not found"})


    if(products.success){
        if (!name){
            name = productSelected.name
        }else{
            name = nameCapitalize
        }
        if (!price_sale) price_sale = productSelected.price_sale
        if (!price_unit) price_unit = productSelected.price_unit
        if (!description) description = productSelected.description
        if (!photo) photo = productSelected.photo
        if (!discount) discount = productSelected.discount
        if (!id_category) id_category = productSelected.id_category
        if (!id_company) id_company = productSelected.id_company
        if (!id_unit) id_unit = productSelected.id_unit
        if (status == undefined) status = productSelected.status
        if (can_sell == undefined) can_sell = productSelected.can_sell
        

    }else{
        res.status(products.status).json({ message: products.message, error:products.error });
    }

    const result = await updateModel(Product, id, { name, price_sale, price_unit,description, photo, status,discount, id_category, id_company, id_unit, can_sell});
    
    if (result.success) {
        res.status(result.status).json({ message: 'Product updated' });
    } else {
        res.status(result.status).json({ message: 'Something went wrong', error: result.error });
    }
}
 

//Metodo que elimina una producto
//Parametros: id
export const deleteProduct = async(req,res)=>{
    const { company, id } = req.params;
    const products = await getModelByParameterMany(Product, "id_company", company)
    let productFound = false;
    for (const campusObj of products.model) {
        if (campusObj.id == id) {
            const result = await deleteModel(Product, id);
            if (result.success) { 
                productFound= true;
                return res.status(result.status).json({ message: 'Product deleted' });
            } else {
                return res.status(result.status).json({ message: result.message, error: result?.error });
            }
        }
    }

    if (!productFound) {
        return res.status(404).json({ message: 'Product not found' });
    }
}

export const getProductPerCategory = async(req,res)=>{
    const {company} = req.params
    const categories = await getModelByParameterMany(Category, "id_company", company)
    const dicCategoryName ={}
    const dicCategory ={}
    let nuevoDicCategory = {};

    for(let campusObj of categories.model ){
        dicCategoryName[campusObj.id] = campusObj.name
    }

    for(let campusObj of categories.model ){
        dicCategory[campusObj.id] = []
    }

    const products = await getModelByParameterMany(Product, "id_company", company)

    for (let campusObj of products.model) {
        if (campusObj.id_category in dicCategory) {
            if (campusObj.status) {
                dicCategory[campusObj.id_category].push({
                    name: campusObj.name,
                    price: campusObj.price_unit,
                    description: campusObj.description,
                    photo: campusObj.photo,
                    discount: campusObj.discount
                });
            }
        }
    }

    for (let clave in dicCategoryName) {
        if (dicCategoryName.hasOwnProperty(clave)) {
            let nombreCategoria = dicCategoryName[clave];
            nuevoDicCategory[nombreCategoria] = dicCategory[clave] || []; // Añadimos el valor correspondiente de dicCategory o un array vacío si no existe
        }
    }



    return res.status(categories.status).json({ menu:nuevoDicCategory });

}