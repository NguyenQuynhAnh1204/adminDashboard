import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddIcon from '@mui/icons-material/Add';
import LongMenu from '../../components/HeightMenu';
import PosOrder from './PosOrder';
import { useEffect, useState } from 'react';


const PosHome = () => {

    const [type, setType] = useState("");

    const [option, setOption] = useState("");

    useEffect(() => {
        console.log("", option);
    }, [option])
    
    const handleSelect = (opt) => {
        setOption(opt);
    }

    return (
        <div className='pos-home'>
            <div className="home-header">
                <p className='head-title'>Đơn bán hàng </p>
                <div className='head-set'>
                    <AttachMoneyOutlinedIcon className='money-icon'/>
                    <span>Chế độ bán lẻ</span>
                </div>

                <div className="head-list">
                    <LongMenu height={30} options={['Bản sao', 'Đơn hàng']} onFunction handleSelect={handleSelect}/>
                </div>

                
                {/* <AddIcon className='head-btn cursor'/> */}
            </div>
            
            <PosOrder/>


            
        </div>
    )
}

export default PosHome