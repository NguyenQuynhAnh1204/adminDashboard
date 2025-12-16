import { useEffect, useState } from "react"
import CollapTable from "../../components/CollapTable"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { orderService } from "../../service/order.service"

const label = ["Ordercode", "Employee", "Date", "Method", "Amount", "Status"]
const labelChild = ["Id", "Product", "Quantity", "Price", "Total"]
const createOrder = (order, orderDetail) => {
    return {
        ...order,
        detail: orderDetail?.filter(d => d.orderId === order.orderId)
    }

}

const OrderList = () => {

    const [orders, setOrders] = useState([]);
    const [detail, setDetail] = useState()

    const [list, setList] = useState([]);

    const fetchOrder = async () => {
        try {
            const orderDta = await orderService.getAll();
            setOrders(orderDta);
            
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchOrderDetail = async () => {
        try {
            const detailDta = await orderService.getDetail();
            setDetail(detailDta);
        }
        catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchOrder();
        fetchOrderDetail();
    }, [])

    useEffect(() => {
        const listOrder = orders?.map(o => createOrder(o, detail))
        setList(listOrder);
    }, [orders, detail])

    return (
        <div className="order-page">
            <Sidebar/>

            <div className="order-container">
                <Navbar/>

                <h1 className="order-title">Order List</h1>
                

                <div className="order-table">
                    <CollapTable 
                        rows={list} 
                        labels={label}
                        labelChild={labelChild}
                    />
                </div>
            </div>
        </div>
    )
}


export default OrderList