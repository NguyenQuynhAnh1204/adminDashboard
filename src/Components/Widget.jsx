import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios"
import { useEffect, useState } from 'react';
import { formatVND } from '../helper/formatMoney';

const Widget = ({type}) => {

    const nav = useNavigate();

    const [count, setCount] = useState(0);
    const [growth, setGrowth] = useState(0);

    let data;

    // diff (tăng trưởng) = (hiện tại - trước) / trước x 100 

    switch (type) {
        case "order":
            data = {
                title: "Order",
                isMoney: false,
                link: "View all orders",
                api: "/order/count",
                icon: <ShoppingCartOutlinedIcon className='widget-icon'
                style={{
                    color: "goldenrod",
                    backgroundColor: "#f5e2bdff"
                }}
                />
            }
            break;
        case "revenue":
            data = {
                title: "Revenue",
                isMoney: true,
                api: "/order/revenue",
                icon: <MonetizationOnOutlinedIcon className='widget-icon'
                style={{
                    color: "green",
                    backgroundColor: "#dbfbbeff"
                }}
                />
            }
            break;
        case "canceled":
            data = {
                title: "Canceled Order",
                isMoney: false,
                api: "/order/cancel",
                icon: <CancelPresentationIcon className='widget-icon'
                style={{
                    color: "purple",
                    backgroundColor: "#dfd0f5ff"
                }}
                />
            }
            break;
        default:
            break;
        
    }


    const fetchData = async () => {
        try {

            const res = await axios(`${data.api}`);
            setCount(res.data.count);
            setGrowth(res.data.growth | 0);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    const handleLink = () => {
        nav(`/admin/${type}s`)
    }

    return (
        <div className="widget shadow">
            <div className="widget-left">
                <span className="widget-title">{data.title}</span>
                <span className="widget-counter">{data.isMoney ? formatVND(Number(count)) : count}</span>
                <span className="widget-link cursor" onClick={handleLink}>{data.link}</span>
            </div>

            <div className="widget-right">
                {
                    growth > 0 ? (
                        <div className="percentage positive">
                            <KeyboardArrowUpIcon/>
                            {growth} %
                        </div>
                    ) : (
                        <div className="percentage negative">
                            <KeyboardArrowDownIcon/>
                            {Math.abs(growth)} %
                        </div>
                    )
                }

                {data.icon}
            </div>
        </div>
    )
}

export default Widget