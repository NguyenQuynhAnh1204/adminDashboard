import axios from "../API/api";
import React, { useEffect, useState } from "react"


const ImportForm = () => {

    const [importForm, setImportForm] = useState({
        supplier: "",
        phone: "",
        cost_price: "",
        quantity: "",
        date: "",
    })

    const fetImport = async () => {
        try {
            const res = await axios.get("/importProduct")

            console.log(res.body);
            // setImportForm({

            // })
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // fetImport();
    }, [])

    const handleChange = (e) => {
        setImportForm({
            ...importForm,
            [e.target.name]: e.target.value
        })
    }

    const handelUpdate = () => {
        console.log('Cập nhật')
    }
    return (
       
        <div className="right-bottom shadow">
            <h2>Import Order</h2>

            <form className="product-form">

                <div className="form-group">
                    <div className="form-item">
                            <label htmlFor="supplier">Supplier</label>
                            <select name="supplier" id="supplier" onChange={handleChange}>
                                <option value="">Ab</option>
                                <option value="">AC</option>
                                <option value="">Ẫ</option>
                            </select>
                        </div>

                        <div className="form-item">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                         <div className="form-item">
                            <label htmlFor="cost">Cost Price</label>
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="form-group">
                         <div className="form-item">
                            <label htmlFor="date">Import Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-item">
                            <button className="item-btn" onClick={handelUpdate}>Import</button>
                        </div> 
                    </div>
                </form>
                          
        </div>
    )
}

export default ImportForm