import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios"
import { formatVND } from '../helper/formatMoney';

const Widget = ({type, data}) => {

    const nav = useNavigate();

    let widgetDta;
    switch (type) {
        case "order":
            widgetDta = {
                title: "Order",
                isMoney: false,
                link: "View all orders",
                total: data?.[type]?.total,
                growth: data?.[type]?.growth,
                icon: <ShoppingCartOutlinedIcon className='widget-icon'
                style={{
                    color: "goldenrod",
                    backgroundColor: "#f5e2bdff"
                }}
                />
            }
            break;
        case "revenue":
            widgetDta = {
                title: "Revenue",
                isMoney: true,
                total: data?.[type]?.total,
                growth: data?.[type]?.growth,
                icon: <MonetizationOnOutlinedIcon className='widget-icon'
                style={{
                    color: "green",
                    backgroundColor: "#dbfbbeff"
                }}
                />
            }
            break;
        case "paidOrders":
            widgetDta = {
                title: "Paid Order",
                isMoney: false,
                total: data?.[type]?.total,
                growth: data?.[type]?.growth,
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

    const handleLink = () => {
        nav(`/admin/${type}s`)
    }

    return (
        <div className="widget shadow">
            <div className="widget-left">
                <span className="widget-title">{widgetDta.title}</span>
                <span className="widget-counter">{widgetDta.isMoney ? formatVND(Number(widgetDta.total)) : Number(widgetDta.total)}</span>
                <span className="widget-link cursor" onClick={handleLink}>{widgetDta.link || ""}</span>
            </div>

            <div className="widget-right">
                {
                    widgetDta.growth >= 0 ? (
                        <div className="percentage positive">
                            <KeyboardArrowUpIcon/>
                             {widgetDta.growth}%
                        </div>
                    ) : (
                        <div className="percentage negative">
                            <KeyboardArrowDownIcon/>
                            {widgetDta.growth}%
                        </div>
                    )
                }

                {widgetDta.icon}
            </div>
        </div>
    )
}

export default Widget