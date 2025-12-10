import { useNavigate } from "react-router-dom"
import Receipt from "../../components/Receipt"


const PosPayment = () => {

    const nav = useNavigate();


    const handleNew = () => {
        sessionStorage.removeItem("order")
        nav("/pos/home");
    }

    const handlePrint = () => {
        console.log("Đã in")
    }
    return (
        <div className="pos-pay">
            <h1 className="title">Hoá đơn thanh toán</h1>

            <Receipt type_receipt={"payment"}/>

            <div className="pos-pay-btn">
                <button onClick={handleNew}>Tạo mới</button>
                <button onClick={handlePrint}>In</button>
            </div>
        </div>
    )
}

export default PosPayment