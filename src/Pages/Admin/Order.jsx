import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"


const OrderList = () => {
    return (
        <div className="order-page">
            <Sidebar/>

            <div className="order-container">
                <Navbar/>

                <h1 className="order-title">Order List</h1>
                

                <div className="order-table">
                    
                </div>
            </div>
        </div>
    )
}


export default OrderList