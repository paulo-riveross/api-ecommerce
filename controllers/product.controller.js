import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    const imageUrl = req.file?.path; 
    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      category,
      images: imageUrl ? [imageUrl] : [],
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
    try {
        const {category, search} = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }
        if (search) {
            filter.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los productos", error: err.message });
    }
};


export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: "Error al obtener el producto", error: err.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) 
            return res.status(404).json({ message: "Producto no encontrado" });
            
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: "Error al actualizar el producto", error: err.message });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) 
            return res.status(404).json({ message: "Producto no encontrado" });
            
        res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(400).json({ message: "Error al eliminar el producto", error: err.message });
    }     
}
   