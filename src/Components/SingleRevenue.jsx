import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import TableList from "./Table"
import { orderService } from "../service/order.service";
import { formatVND } from "../helper/formatMoney";
import { countOrder } from "../helper/countOrder";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';


const columns = [
  { key: "orderCode", label: "Order Code" },
  { key: "date", label: "Date" },
  { key: "totalAmount", label: "Amount", type: "money" },
  { key: "method", label: "Method" },
  { key: "status", label: "Status", type: "status" }
];



const Revenue = () => {
    const {userId} = useParams();

    const [order, setOrder] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [growth, setGrowth] = useState(0);


    const fetchData = async () => {
        try {
            const orderDta = await orderService.getOrderEM(userId);
            const reveDta = await orderService.getRevenue(userId);
            const growthDta = await orderService.getGrowthByEm(userId);
            setOrder(orderDta);
            setRevenue(reveDta);
            setGrowth(growthDta);
        }   
        catch (e) {
            throw e;
        }    
    }


    useEffect(() => {
        fetchData();
    }, [])

    

    return (
        <div className="revenue-container">
            
            <div className="revenue">
                <div className="revenue-box shadow">
                    <p className="title">Doanh thu</p>
                    <p className="text">{formatVND(Number(revenue))}</p>
                </div>
                <div className="revenue-box shadow">
                    <p className="title">Tổng đơn</p>
                    <p className="text">{order.length}</p>
                </div>
                <div className="revenue-box shadow">
                    <p className="title">Đơn huỷ</p>
                    <p className="text negative">{
                        countOrder(order, "cancelled")    
                    }</p>
                </div>
                <div className="revenue-box shadow">
                    <p className="title">Growth</p>
                    <p className={`text ${growth < 0 && 'negative'}`}>
                        <span>
                            {growth > 0 ? (<KeyboardDoubleArrowUpIcon/>) : (<KeyboardDoubleArrowDownIcon/>)}
                        </span>
                        {Math.abs(growth)} % 
                    </p>
                </div>
            </div>
            
            <div className="transaction shadow">

                {
                    order?.length > 0 ? (
                        <TableList
                             columns={columns}
                             rows={order}
                        />
                    ) : (
                        <p className="mess">Chưa có đơn hàng nào !!!</p>
                    )
                }


            </div>

        </div>
    )
}


export default Revenue