import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../API/api";
import MyModal from "../../Components/Modal"
import ImportForm from "../../Components/ImportProduct"





const ProductItem = ({type}) => {

    const {productId} = useParams();
    const [errors, setErrors] = useState({});

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
        stock: 0,
        status: ""
    });

    const [file, setFile] = useState("");
    const [change, setChange] = useState(false);
    const [isStock, setIsStock] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [modal, setModal] = useState(false);
    const [mess, setMess] = useState("");

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
                stock: res.data.stock.stock,
                status: res.data.stock.quantity > res.data.stock.stock ? 1 : 0
            })
        }   
        catch (e) {
            console.log(e)
        }
    }

    const fetchUpdateInf = async () => {
        try {

            const formData = new FormData();

            if(file) {
                formData.append("path", file);
            }

            Object.keys(product).forEach(key => {
                if(key !== 'path') {
                    formData.append(key, product[key]);
                }
            })
            if(type == "info") {
                const res = await axios.post(`/product/updateInf/${productId}`, formData) ;
                setIsUpdate(res.data.success);
            }
            else if(type == "new") {
                const res =  await axios.post("/product/add", formData);
                setIsUpdate(res.data.success);
            }
            setMess("Cập nhật thành công")
        }
        catch (e) {
            setIsUpdate(e.response.data.success);
            if (type === "new") {
                setMess("Sản phẩm đã tồn tại");
            } else if (type === 'info') {
                setMess("Cập nhật thất bại");
            }
        }
    }


    useEffect(() => {
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
            setChange(true);
        };
    }, [file]);

    const validateForm = () => {
        let newErrors = {};

        if(!product.name.trim()) {
            newErrors.name = "Tên không được để trống";
        }
        if(!product.barcode.trim()) {
            newErrors.barcode = "Mã sản phẩm không được để trống";
        }
        if(!product.cateName.trim()) {
            newErrors.cateName = "Danh mục trống";
        }
        if(!product.brandName.trim()) {
            newErrors.brandName = "Thương hiệu trống";
        }
        if(!product.unit.trim()) {
            newErrors.unit = "Đơn vị trống";
        }
        if(!product.variant.trim()) {
            newErrors.variant = "Biến thể trống";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChangeInf = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: ""
        })
        setChange(true);
    }

    const handleChangeStock = (e) => {
        setStockProduct({
            ...stockProduct,
            [e.target.name]: e.target.value
        })
        setIsStock(true);
    }

    const handleUpdateInf = async (e) => {
        e.preventDefault();
        if (!change) return;
        try {
            if (type === 'new') { 
                const isValid = validateForm();
                if (!isValid) {
                    return;
                } 
            }
            await fetchUpdateInf();                  
            setModal(true);             
            setChange(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };


    const handleUpdateStock = (e) => {
        e.preventDefault();
        if (!isStock) return;
        fetchUpdateStock();
        setIsUpdate(true);
        setIsStock(false);
    }
    
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
                                            onChange={handleChangeInf}
                                        />
                                        {errors.name && <p className="error-text">{errors.name}</p>}
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="barcode">Product code</label>
                                        <input
                                            type="text"
                                            id="barcode"
                                            name="barcode"
                                            placeholder="Mã sản phẩm"
                                            value={product.barcode}
                                            onChange={handleChangeInf}
                                            />
                                        {errors.barcode && <p className="error-text">{errors.barcode}</p>}
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
                                            value={Number(product.price) || ''}
                                            onChange={handleChangeInf}
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="importPrice">Cost Price</label>
                                        <input
                                            type="number"
                                            id="importPrice"
                                            name="importPrice"
                                            value={stockProduct.cost ?? 0}       
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="form-item">
                                        <label htmlFor="cateName">Category</label>
                                        <input type="text" name="cateName" id="cateName" 
                                            value={product.cateName ?? ""} 
                                            disabled={type !== "new"}
                                            onChange={handleChangeInf}
                                        />
                                        {errors.cateName && <p className="error-text">{errors.cateName}</p>}
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="brandName">Brand</label>
                                        <input type="text" name="brandName" id="brandName" 
                                            value={product.brandName ?? ""} 
                                            disabled={type !== "new"}
                                            onChange={handleChangeInf}
                                        />
                                        {errors.brandName && <p className="error-text">{errors.brandName}</p>}
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="unit">Unit</label>
                                        <input type="text" name="unit" id="unit" 
                                            value={product.unit} 
                                            disabled={type !== "new"}
                                            onChange={handleChangeInf}
                                        />
                                        {errors.unit && <p className="error-text">{errors.unit}</p>}
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="variant">Variant</label>
                                        <input type="text" name="variant" id="variant" 
                                            value={product.variant} 
                                            disabled={type !== "new"}
                                            onChange={handleChangeInf}
                                        />
                                        {errors.variant && <p className="error-text">{errors.variant}</p>}
                                    </div>
                                </div>

                                
                                <div className="form-group">
                                    <div className="form-item">
                                        <label htmlFor="expiry_date">Expiry Date</label>
                                        <input
                                            type="date"
                                            id="expiry_date"
                                            name="expiry_date"
                                            value={product.expiry_date ?? ""}
                                            onChange={handleChangeInf}
                                        />
                                    </div>

                                    <div className="form-item ">
                                        <button className="item-btn cursor" onClick={handleUpdateInf} disabled={!change}>Update</button>
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
                                                    disabled
                                                />
                                            </div>

                                            <div className="form-item">
                                                <label htmlFor="stock">Stock</label>
                                                <input
                                                    type="number"
                                                    id="stock"
                                                    name="stock"
                                                    value={stockProduct.stock}
                                                    onChange={handleChangeStock}
                                                />
                                            </div>
                                        </div>

                                        
                                        <div className="form-group">
                                            <div className="form-item">
                                                <label htmlFor="status">Status</label>
                                                <input type="text" 
                                                    value={stockProduct.quantity > stockProduct.stock ? "In Stock": "Out of stock"} 
                                                    disabled
                                                />
                                            </div>

                                            <div className="form-item">
                                                <button className="item-btn" onClick={handleUpdateStock} disabled={!isStock}>Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        
                    </div>
                </div>
            </div>

            {
                modal && (
                    <MyModal onClose={() => setModal(false)} open={modal}
                    message={mess}  type={isUpdate ? "success" : "error"}/>
                )
            }
        </div>
    )
}

export default ProductItem