
import Chart from "../../Components/Chart"
import Feature from "../../Components/Feature"
import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import Widget from "../../Components/Widget"
import TableList from "../../Components/Table"


const Dashboard = () => {
    return (
        <div className="dashboard">
            
            <Sidebar/>
            <div className="dashboard-container">
                <Navbar />
                <div className="dashboard-widgets">
                    <Widget type="user"/>
                    <Widget type="order"/>
                    <Widget type="earning"/>
                    <Widget type="balance"/>
                </div>

                <div className="dashboard-chart">
                    <Feature/>
                    <Chart title={'Last 6 Month (Revenue)'} aspect={2}/>
                </div>

                <div className="dashboard-list-container shadow">
                    <div className="list-title">Latest Transactions</div>
                    <TableList/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard