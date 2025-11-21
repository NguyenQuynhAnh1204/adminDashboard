import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Feature = () => {
    return (
        <div className="feature shadow">
            <div className="feature-top">
                <h1 className="feature-title">Total Revenue</h1>
                <MoreVertOutlinedIcon fontSize='small'/>
            </div>

            <div className="feature-bottom">
                <div className="feature-chart">
                    <CircularProgressbar value={70} text='70%' strokeWidth={5}/>
                </div>

                <p className="feature-chart_title">Total sales made today</p>
                <p className="feature-chart_amount">$400</p>
                <p className="feature-chart_desc">
                    sale sale sale sale sale sale sale sale sale sale sale sale sale sale sale
                </p>

                <div className="feature-summary">
                    <div className="item">
                        <div className="item-title">Target</div>
                        <div className="item-result negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="result-amount">$12.4k</div>
                        </div>
                            
                    </div>

                    <div className="item">
                        <div className="item-title">Last Week</div>
                        <div className="item-result positive">
                            <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                            <div className="result-amount">$12.4k</div>
                        </div>
                            
                    </div>

                    <div className="item">
                        <div className="item-title">Last Month</div>
                        <div className="item-result positive">
                            <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                            <div className="result-amount">$12.4k</div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature