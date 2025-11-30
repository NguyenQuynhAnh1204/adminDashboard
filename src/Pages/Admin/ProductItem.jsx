import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../API/api";
import MyModal from "../../Components/Modal"
import ImportForm from "../../Components/ImportProduct"


const ProductItem = ({type}) => {

    const {productId} = useParams();

    const [product, setProduct] = useState({
        name: "",
        barcode: "",
        cateName: "",
        brandName: "",
        unit: "",
        variant: "",
        price: "",
        expiry_date: "",
        path: "",
    });

    const [stockProduct, setStockProduct] = useState({
        quantity: 0,
        stock: 1,
        status: ""
    });

    const [file, setFile] = useState("");
    // const [change, setChange] = useState(false);
    // const [isUpdate, setIsUpdate] = useState(false);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/product/${productId}`);
            const proData = res.data.product;
            setProduct({
                name: proData.name,
                barcode: proData.barcode,
                cateName: proData.cateName,
                brandName: proData.brandName,
                unit: proData.unit,
                variant: proData.variant,
                price: proData.price,
                expiry_date: proData.expiry_date && proData.expiry_date.split("T")[0],
                path: proData.path
            }); 

        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchStock = async () => {
        try {
            const res = await axios.get(`/product/stock/${productId}`)
            setStockProduct({
                quantity: res.data.stock.quantity,
                cost: res.data.stock.cost,
                status: res.data.stock.quantity>0 ? 1 : 0 
            })
        }   
        catch (e) {
            console.log(e)
        }
    }

    // const fetchUpdate = async () => {
    //     try {

    //         const formData = new FormData();

    //         if(file) {
    //             formData.append("avatar", file);
    //         }

    //         Object.keys(form).forEach(key => {
    //             if(key !== 'avatar') {
    //                 formData.append(key, form[key]);
    //             }
    //         })

    //         const res = await axios.post(`/user/update?q=${userId}`, formData) 

    //         console.log(res.data);

           

    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    useEffect(() => {
        if(type === 'new') {
            console.log('tạo mới');
            return;
        }
        if (type === "info") {
            fetchProduct();
            fetchStock();
            return
        }
    }, [])

    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(file);
            }
            // setChange(true);
        };
    }, [file]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
        // setChange(true);
    }

    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     if (!change) return;
    //     fetchUpdate();
    //     setIsUpdate(true);
    //     setChange(false);
    // }
    
    return (
        <div className="pro-item-page">
            <Sidebar/>
            <div className="pro-item-container">
                <Navbar/>

                <h1 className="pro-item-title">Thông tin sản phẩm</h1>
                <div className="pro-item-main">
                    <div className="item-left">
                        <div className="shadow item-left-top">
                                <h2>Product Image</h2>

                                <div className="product-img">
                                    <img src={file ? URL.createObjectURL(file) : product.path || '/noImg.jpg'} 
                                        alt="no-img" className="new-img"/>
                                </div>
                                
                            
                                <label htmlFor="file" className="item-btn-img cursor">New Photo</label>
                                <input type="file" id="file" style={{display: "none"}}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                        </div>
                    </div>

                    <div className="item-right ">
                        <div className="right-top shadow">
                            <h2>General Information</h2>

                            <form className="product-form">
                                <div className="form-group">
                                    <div className="form-item">
                                        <label htmlFor="name">Product Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Tên sản phẩm"
                                            value={product.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="code">Product code</label>
                                        <input
                                            type="text"
                                            id="code"
                                            name="code"
                                            placeholder="Mã sản phẩm"
                                            value={product.barcode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Loại + Thương hiệu */}

                                
                                
                                <div className="form-group">
                                    <div className="form-item">
                                        <label htmlFor="price">Sell Price</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            step={1000}
                                            value={Number(product.price)}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="importPrice">Cost Price</label>
                                        <input
                                            type="number"
                                            id="importPrice"
                                            name="importPrice"
                                            step={1000}
                                            value={stockProduct.cost}       
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="form-item">
                                        <label htmlFor="cate">Category</label>
                                        <select id="cate" name="cate" onChange={handleChange}>
                                            <option value={product.cateName}>{product.cateName}</option>
                                        </select>
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="brand" onChange={handleChange}>Brand</label>
                                        <select id="brand" name="brand">
                                            <option value={product.brandName}>{product.brandName}</option>
                                            
                                        </select>
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="unit">Unit</label>
                                        <select id="unit" name="unit" onChange={handleChange}>
                                            <option value={product.unit}>{product.unit}</option>
                                           
                                        </select>
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="variant">Variant</label>
                                        <select id="variant" name="variant" onChange={handleChange}>
                                            <option value={product.variant}>{product.variant}</option>
                                        </select>
                                    </div>

                                </div>

                                
                                <div className="form-group">
                                    <div className="form-item">
                                        <label htmlFor="expiryDate">Expiry Date</label>
                                        <input
                                            type="date"
                                            id="expiryDate"
                                            name="expiryDate"
                                            value={product.expiry_date}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-item cursor">
                                        <button className="item-btn">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                            {type === 'info' && (
                                <div className="right-bottom shadow">
                                    <h2>Manage Stock</h2>
                                
                                    <form className="product-form">

                                        <div className="form-group">
                                            <div className="form-item">
                                                <label htmlFor="quantity">Quantity</label>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    name="quantity"
                                                    value={stockProduct.quantity}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-item">
                                                <label htmlFor="stock">Stock</label>
                                                <input
                                                    type="number"
                                                    id="stock"
                                                    name="stock"
                                                    value={stockProduct.stock}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        
                                        <div className="form-group">
                                            <div className="form-item">
                                                <label htmlFor="status">Status</label>
                                                <select id="status" name="status" onChange={handleChange}>
                                                    <option value={1}>In stock</option>
                                                    <option value={0}>Out of stock</option>
                                                </select>
                                            </div>


                                            <div className="form-item">
                                                <button className="item-btn">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem