
import Chart from "../../components/Chart"
import Feature from "../../components/Feature"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Widget from "../../components/Widget"
import TableList from "../../components/Table";
import { orderService } from "../../service/order.service"
import { useEffect, useState } from "react"

const columns = [
  { key: "orderCode", label: "Order Code" },
  { key: "userName", label:"Employee"},
  { key: "date", label: "Date" },
  { key: "totalAmount", label: "Amount", type: "money" },
  { key: "method", label: "Method" },
  { key: "status", label: "Status", type: "status" }
];

const Dashboard = () => {
    const [widget, setWidget] = useState({})

    const [orders, setOrders] = useState([]);

    const fetchDashboard = async () => {
        try {
            const dashboard = await orderService.getDashboard();
            const orderDta = await orderService.getOrders();
            setOrders(orderDta)
            setWidget(dashboard);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDashboard();
    }, [])

    return (
        <div className="dashboard">
            
            <Sidebar/>
            <div className="dashboard-container">
                <Navbar />
                <div className="dashboard-widgets">
                    
                    <Widget type="revenue" data={widget}/>
                    <Widget type="order" data={widget}/>
                    <Widget type="paidOrders" data={widget}/>
                </div>

                <div className="dashboard-chart">
                    <Feature/>
                    <Chart title={'Last 6 Month (Revenue)'} aspect={2}/>
                </div>

                <div className="dashboard-list-container shadow">
                    <div className="list-title">Latest Transactions</div>
                    <TableList columns={columns} rows={orders}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard