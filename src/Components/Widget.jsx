import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useNavigate } from 'react-router-dom';
import axios from "../API/api"
import { useEffect, useState } from 'react';

const Widget = ({type}) => {

    const nav = useNavigate();

    const [count, setCount] = useState(0);

    let data;

    // diff (tăng trưởng) = (hiện tại - trước) / trước x 100 

    switch (type) {
        case "product":
            data = {
                title: "Product",
                isMoney: false,
                link: "See all products",
                diff: 0,
                icon: <PersonOutlineOutlinedIcon className='widget-icon'
                style={{
                    color: "crimson",
                    backgroundColor: "#f7c1c1ff"
                }}
                />
            }
            break;
        case "order":
            data = {
                title: "Order",
                isMoney: false,
                link: "View all orders",
                diff: 0,
                icon: <ShoppingCartOutlinedIcon className='widget-icon'
                style={{
                    color: "goldenrod",
                    backgroundColor: "#f5e2bdff"
                }}
                />
            }
            break;
        case "earning":
            data = {
                title: "Earning",
                isMoney: true,
                link: "View net earnings",
                diff: 0,
                icon: <MonetizationOnOutlinedIcon className='widget-icon'
                style={{
                    color: "green",
                    backgroundColor: "#dbfbbeff"
                }}
                />
            }
            break;
        case "balance":
            data = {
                title: "Balance",
                isMoney: true,
                link: "See details",
                icon: <AccountBalanceWalletOutlinedIcon className='widget-icon'
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

            const res = await axios(`/${type}/count`);
            setCount(res.data.count);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (type === 'product') {
            fetchData();
            return;
        }
    }, [])

    const handleLink = () => {
        nav(`/admin/${type}s`)
    }

    return (
        <div className="widget shadow">
            <div className="widget-left">
                <span className="widget-title">{data.title}</span>
                <span className="widget-counter">{data.isMoney && "$"} {count}</span>
                <span className="widget-link cursor" onClick={handleLink}>{data.link}</span>
            </div>

            <div className="widget-right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon/>
                    {data.diff} %
                </div>

                {data.icon}
            </div>
        </div>
    )
}

export default Widget