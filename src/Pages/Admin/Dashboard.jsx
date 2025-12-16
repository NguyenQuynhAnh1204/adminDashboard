
import Chart from "../../components/Chart"
import Feature from "../../components/Feature"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Widget from "../../components/Widget"
import TableList from "../../components/Table";


const Dashboard = () => {
    return (
        <div className="dashboard">
            
            <Sidebar/>
            <div className="dashboard-container">
                <Navbar />
                <div className="dashboard-widgets">
                    <Widget type="revenue"/>
                    <Widget type="order"/>
                    <Widget type="canceled"/>
                </div>

                <div className="dashboard-chart">
                    <Feature/>
                    <Chart title={'Last 6 Month (Revenue)'} aspect={2}/>
                </div>

                <div className="dashboard-list-container shadow">
                    <div className="list-title">Latest Transactions</div>
                    {/* <TableList titleCell={tableTitle} rows={rows}/> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard