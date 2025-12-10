
import Chart from "../../components/Chart"
import Feature from "../../components/Feature"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Widget from "../../components/Widget"
import TableList from "../../components/Table";


const tableTitle = [
    "Tracking Id",
    "Product",
    "Quantity",
    "Total",
    "Method",
    "Status"
]
const rows = [
        {
            id: 1,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'cash',
            status: 'approved'
        },
        {
            id: 2,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'payment',
            status: 'pending'
        },
        {
            id: 3,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'cash',
            status: 'approved'
        },
        {
            id: 4,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'payment',
            status: 'approved'
        },
        {
            id: 5,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'payment',
            status: 'pending'
        },
        {
            id: 6,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'cash',
            status: 'approved'
        }
    ]
const Dashboard = () => {
    return (
        <div className="dashboard">
            
            <Sidebar/>
            <div className="dashboard-container">
                <Navbar />
                <div className="dashboard-widgets">
                    {/* <Widget type="user" /> */}
                    <Widget type="order"/>
                    <Widget type="product"/>
                    <Widget type="earning"/>
                    <Widget type="balance"/>
                </div>

                <div className="dashboard-chart">
                    <Feature/>
                    <Chart title={'Last 6 Month (Revenue)'} aspect={2}/>
                </div>

                <div className="dashboard-list-container shadow">
                    <div className="list-title">Latest Transactions</div>
                    <TableList titleCell={tableTitle} rows={rows}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard