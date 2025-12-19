import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"
import TableList from "./Table"
import { formatVND } from "../helper/formatMoney";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import LongMenu from "./HeightMenu";
import { userService } from "../service/user.service";

const columns = [
  { key: "orderCode", label: "Order Code" },
  { key: "created_at", label: "Date" },
  { key: "amount", label: "Amount", type: "money" },
  { key: "method", label: "Method" },
  { key: "status", label: "Status", type: "status" }
];



const Revenue = () => {
    const { userId } = useParams();
    const [revenue, setRevenue] = useState({});
    const [orders, setOrders] = useState([]);

    const [option, setOption] = useState("month");
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const revenueData = await userService.getDashboard(Number(userId), option);
            const orderData = await userService.getOrders(Number(userId), option);
            setRevenue(revenueData);
            setOrders(orderData);
        } finally {
            setLoading(false);
        }
    }, [userId, option]);


    useEffect(() => {
        const timer = setTimeout(fetchData, 300);
        return () => clearTimeout(timer);
    }, [fetchData]);

    const handleSelect = (opt) => {
        if (opt === 'Theo ngày') setOption('day');
        if (opt === 'Theo tháng') setOption('month');
    };
    

    return (
        <div className="revenue-container">
            <div className="filter">
                <LongMenu height={30} options={['Theo ngày', 'Theo tháng']} handleSelect={handleSelect}/>
            </div>
            
            <div className="revenue">
                <div className="revenue-box shadow">
                    <p className="title">Doanh thu</p>
                    <p className="text">{formatVND(Number(revenue?.revenue?.total))}</p>
                </div>
                <div className="revenue-box shadow">
                    <p className="title">Tổng đơn</p>
                    <p className="text">{revenue?.orders?.total}</p>
                </div>
                <div className="revenue-box shadow">
                    <p className="title">Đơn huỷ</p>
                    <p className="text negative">{
                        revenue?.cancelOrder?.total  
                    }</p>
                </div>
                <div className="revenue-box shadow">
                    <p className="title">Growth</p>
                    <p className={`text ${revenue?.revenue?.growth <= 0 && 'negative'}`}>
                        <span>
                            {revenue?.revenue?.growth > 0 ? (<KeyboardDoubleArrowUpIcon/>) : (<KeyboardDoubleArrowDownIcon/>)}
                        </span>
                        {revenue?.revenue?.growth} % 
                    </p>
                </div>
            </div>
            
            <div className="transaction shadow">

                {
                    orders?.length > 0 ? (
                        <TableList
                             columns={columns}
                             rows={orders}
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