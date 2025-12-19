import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import { orderService } from '../service/order.service';
import { formatVND } from '../helper/formatMoney';
const Feature = () => {

    const [feature, setFeature] = useState({})

    const fetchData = async () => {
        try {
            const data = await orderService.getFeature();
            setFeature(data);
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
                    <CircularProgressbar value={Math.min(feature.growthTarget, 100)} 
                        text={`${feature.growthTarget}%`} 
                        strokeWidth={6}
                    />
                </div>

                <p className="feature-chart_title">Total sales made today</p>
                <p className="feature-chart_amount">{formatVND(Number(feature.feature) | 0)}</p>
                {/* <p className="feature-chart_desc">
                    sale sale sale sale sale sale sale sale sale sale sale sale sale sale sale
                </p> */}

                <div className="feature-summary">
                    <div className="item">
                        <div className="item-title">Target</div>
                        <div className="item-result negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="result-amount">
                                {`${feature.growthTarget}%`}
                            </div>
                        </div>
                            
                    </div>

                    <div className="item">
                        <div className="item-title">Last Day</div>
                        <div className={`item-result positive ${feature.growthDay > 0 ? "positive" : "negative"}`}>
                            {
                                feature.growthDay > 0 ? (
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                ) : (
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                )
                            }
                            <div className="result-amount">{`${feature.growthDay}%`}</div>
                        </div>
                            
                    </div>

                    <div className="item">
                        <div className="item-title">Last Month</div>
                        <div className={`item-result positive ${feature.growthMonth > 0 ? "positive" : "negative"}`}>
                            {
                                feature.growthMonth > 0 ? (
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                ) : (
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                )
                            }
                            <div className="result-amount">{`${feature.growthMonth}%`}</div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature