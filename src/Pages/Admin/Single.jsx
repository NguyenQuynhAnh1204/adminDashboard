import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import Chart from "../../Components/Chart"
import TableList from "../../Components/Table"


const Single = () => {
    return (
        <div className="single-page">
            <Sidebar/>
            <div className="single-container">
                <Navbar/>
                
                <div className="single-top">

                    <div className="single-left shadow">
                        <div className="edit-btn cursor">edit</div>
                        <h1 className="single-title">Information</h1>

                        <div className="single-item">
                            <img src="/avatar.jpg" alt="avatar" className="single-img"/>

                            <div className="single-detail">
                                <h1 className="item-title">Nguyễn Anh</h1>

                                <div className="item-detail">
                                    <span className="item-key">Email:</span>
                                    <span className="item-value">nguyenanh@gmail.com</span>
                                </div>
                                <div className="item-detail">
                                    <span className="item-key">Phone:</span>
                                    <span className="item-value">0349457001</span>
                                </div>
                                <div className="item-detail">
                                    <span className="item-key">Address:</span>
                                    <span className="item-value">Thiên Lộc - Hà Nội</span>
                                </div>
                                <div className="item-detail">
                                    <span className="item-key">Country:</span>
                                    <span className="item-value">Việt Nam</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="single-right">
                        <Chart aspect={3/1} title={'User Spending'}/>
                    </div>
                </div>

                <div className="single-bottom shadow">
                    <h1 className="single-title">Last Transaction</h1>
                    <TableList/>
                </div>
            </div>
        </div>
    )
}

export default Single