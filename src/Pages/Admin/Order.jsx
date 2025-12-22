import { useEffect, useState, useCallback } from "react"
import CollapTable from "../../components/CollapTable"
import LongMenu from "../../components/HeightMenu"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { orderService } from "../../service/order.service"

const label = ["Ordercode", "Employee", "Date", "Method", "Amount", "Status"]
const labelChild = ["Id", "Product", "Quantity", "Price", "Total"]

const OrderList = () => {

    const [orders, setOrders] = useState([]);

    const [option, setOption] = useState("month");
    const [loading, setLoading] = useState(false);

    const fetchOrder = useCallback(async () => {
        setLoading(true);
        try {
            const orderDta = await orderService.getOrderWithDetail(option);
            setOrders(orderDta);
            console.log(orderDta);
        }
        finally {
            setLoading(false);
        }
    }, [option]) 

    useEffect(() => {
        const timer = setTimeout(fetchOrder, 300);
        return () => clearTimeout(timer);
    }, [fetchOrder]);
    
    const handleSelect = (opt) => {
        if (opt === 'Theo ngày') setOption('day');
        if (opt === 'Theo tháng') setOption('month');
        if (opt === 'Tất cả') setOption('all');
    };
    

    return (
        <div className="order-page">
            <Sidebar/>

            <div className="order-container">
                <Navbar/>

                <h1 className="order-title">Order List</h1>
                
                <div className="order-filter">
                    <LongMenu height={30} options={['Theo ngày', 'Theo tháng', 'Tất cả']} handleSelect={handleSelect}/>
                </div>
                <div className="order-table">
                    <CollapTable 
                        rows={orders} 
                        labels={label}
                        labelChild={labelChild}
                    />
                </div>
            </div>
        </div>
    )
}


export default OrderList