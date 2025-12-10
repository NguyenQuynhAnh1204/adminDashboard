
import {formatted} from "../helper/formatDate"
import { formatVND } from "../helper/formatMoney"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Receipt = (props) => {
    
    const nav = useNavigate()

    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [products, setProducts] = useState();
        
    
    useEffect( ()=> {
        const storeOrder = sessionStorage.getItem("order");
        if (!storeOrder || JSON.parse(storeOrder).length === 0) {
            nav("/pos/home", { replace: true });
            return;
        }
        setProducts(JSON.parse(storeOrder))
        setTotal(JSON.parse(storeOrder).reduce((sum, p) => sum+p.quantity*p.price, 0))
        console.log("moiunt")
    }, [])


    return (
        <div>
            <div className="receipt-container">
               <div className="receipt-top">
                    <p className="line">
                        <span className="label">Ngày bán:</span>
                        <span>{formatted}</span>
                    </p>

                    <h2 className="receipt-title">Hoá đơn bán hàng</h2>

                    <p className="line">
                        <span className="label">Cửa hàng:</span>
                        <span>Tạp hoá ABC</span>
                    </p>

                    <p className="line">
                        <span className="label">Địa chỉ:</span>
                        <span>Đại Kim - Hoàng Mai</span>
                    </p>

                    <p className="line">
                        <span className="label">Nhân viên:</span>
                        <span>Nhân viên</span>
                    </p>
                </div>


                <div className="receipt-content">

                    <div className="content-title content-grid">
                        <p>Đơn giá</p>
                        <p>SL</p>
                        <p>Thành tiền</p>
                    </div>

                    {
                        products?.map(p => (
                            <div className="content-item content-grid" key={p.id}>
                                <div className="">
                                    <p>{p.name}</p>
                                    <p>{formatVND(Number(p.price))}</p>
                                </div>

                                <p>{p.quantity}</p>

                                <p>{formatVND(Number(p.price * p.quantity))}</p>
                            </div>
                        ))
                    }

                </div>


                <div className="receipt-bot">
                    <p className="receipt-txt">Tổng tiền: <span>{formatVND(Number(total))}</span></p>
                    <p className="receipt-txt">Chiết khấu: <span>{discount}</span></p>
                    <p className="receipt-txt">{props.type_receipt != 'review'? "Tổng tiền thanh toán:" : "Tổng cộng:"} <span>{formatVND(Number(total-discount))}</span></p>
                </div>
                
                {
                    props.type_receipt == "payment" && (
                        <div className="receipt-bot">
                            <p className="receipt-txt">Tiền khách trả: <span>{formatVND(Number(total))}</span></p>
                            <p className="receipt-txt">Trả lại khách: <span>{discount}</span></p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default Receipt