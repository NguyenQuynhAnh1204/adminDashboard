import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import { orderService } from '../service/order.service';
import { formatVND } from '../helper/formatMoney';
const Feature = () => {

    const [target, setTarget] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [growthDay, setGrowthDay] = useState(0)
    const [growthMonth, setGrowthMonth] = useState(0)

    const fetchData = async () => {
        try {
            const data = await orderService.getRevenueDay();
            setRevenue(data.revenue);
            setTarget(data.avg * 2)
            setGrowthDay(data.growthDay)
            setGrowthMonth(data.growthMonth)
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className="feature shadow">
            <div className="feature-top">
                <h1 className="feature-title">Total Revenue </h1>
            </div>

            <div className="feature-bottom">
                <div className="feature-chart">
                    <CircularProgressbar value={revenue/target*100} 
                        text={`${Number(((revenue / target) * 100).toFixed(1))}%`} 
                        strokeWidth={6}
                    />
                </div>

                <p className="feature-chart_title">Total sales made today</p>
                <p className="feature-chart_amount">{formatVND(Number(revenue))}</p>
                {/* <p className="feature-chart_desc">
                    sale sale sale sale sale sale sale sale sale sale sale sale sale sale sale
                </p> */}

                <div className="feature-summary">
                    <div className="item">
                        <div className="item-title">Target</div>
                        <div className="item-result negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="result-amount">
                                {`${Number((100 - (revenue / target) * 100).toFixed(1))}%`}
                            </div>
                        </div>
                            
                    </div>

                    <div className="item">
                        <div className="item-title">Last Day</div>
                        <div className={`item-result positive ${growthDay > 0 ? "positive" : "negative"}`}>
                            {
                                growthDay > 0 ? (
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                ) : (
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                )
                            }
                            <div className="result-amount">{`${growthDay}%`}</div>
                        </div>
                            
                    </div>

                    <div className="item">
                        <div className="item-title">Last Month</div>
                        <div className={`item-result positive ${growthMonth > 0 ? "positive" : "negative"}`}>
                            {
                                growthMonth > 0 ? (
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                ) : (
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                )
                            }
                            <div className="result-amount">{`${growthMonth}%`}</div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature