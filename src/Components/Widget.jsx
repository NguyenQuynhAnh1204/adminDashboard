import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const Widget = ({type}) => {
    let data;

    let amount = 100;
    let diff = 20;

    switch (type) {
        case "user":
            data = {
                title: "User",
                isMoney: false,
                link: "See all users",
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

    return (
        <div className="widget shadow">
            <div className="widget-left">
                <span className="widget-title">{data.title}</span>
                <span className="widget-counter">{data.isMoney && "$"} {amount}</span>
                <span className="widget-link cursor">{data.link}</span>
            </div>

            <div className="widget-right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon/>
                    {diff} %
                </div>

                {data.icon}
            </div>
        </div>
    )
}

export default Widget