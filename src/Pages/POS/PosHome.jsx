import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MoneyIcon from '@mui/icons-material/Money';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import VerticalAlignBottomOutlinedIcon from '@mui/icons-material/VerticalAlignBottomOutlined';
import { useCallback, useEffect, useState } from 'react';
import ProductRetail from '../../Components/ProductRetail';
import Calculator from '../../Components/PosCalculator';
import InfPayment from '../../Components/InfPayment';
import { formatVND } from '../../Helper/formatMoney';


const productData = [
    {
        id: 1,
        slug: "sữa 100ml nahs quya tràn ngập nhân sữa cho tẻ háu an tuổi đang lớn",
        code: "VN11",
        price: 160000,
    },
    {
        id: 2,
        slug: "Bánh gạo",
        code: "BG12",
        price: 180000,
    },
    {
        id: 3,
        slug: "chin-su 100g",
        code: "CS12",
        price: 185000,
    },
]


const PosHome = () => {

    const [data, setData] = useState(productData);
    const [count, setCount] = useState(100);
    const [money, setMoney] = useState('');
    const [method, setMethod] = useState('money');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const sum = data.reduce((sum, x) => sum + x.price, 0);
        setTotal(sum)
    }, [data])

    const handleUpdateTotal = useCallback((delta) => {
        setTotal(prev => prev + delta);
    }, [])

    const handleRemoveItem = useCallback((proId) => {
        setData(prev => prev.filter(item => item.id !== proId));
    }, [])

    return (
        <div className='pos-home'>
            <div className="home-header">
                {
                    count > 0 ? <p className='head-title'>Đơn {count}</p> : <p className='head-title'>Đơn - - </p>
                }

                <span>(200 sp)</span>

                <div className='head-set'>
                    <AttachMoneyOutlinedIcon className='money-icon'/>
                    <span>Chế độ bán lẻ</span>
                </div>
                
                <AddIcon className='head-btn cursor' onClick={() => setCount(prev => prev+1)}/>
            </div>
            
            <div className="home-container">

                <div className='home-left'>
                    <div className='left-top'>
                        <div className='home-search'>
                            <SearchIcon className='search-icon'/>
                            <input type="text" name="search" id="search" placeholder='Tìm kiếm sản phẩm'/>
                        </div>
                    </div>

                    <div className='product-retail'>
                        {
                            data.map((item, index) => (
                                <ProductRetail key={index} data={item} updateTotal={handleUpdateTotal} deleteItem={handleRemoveItem} total={total}/>
                            ))
                        }   
                    </div>

                    
                    <p className='left-bottom'>Tổng tiền: <span>{formatVND(total)}</span></p>

                </div>
                <hr />
                
                <div className='home-right'>
                    
                    <div className="right-top">
                        <button className={`method ${method === 'money' && 'active'}`} onClick={(e) => setMethod(e.currentTarget.value)} value='money'>
                            <MoneyIcon className='method-icon'/>
                            Tiền mặt
                        </button>
                        <button className={`method ${method === 'transfer' && 'active'}`} onClick={(e) => setMethod(e.currentTarget.value)} value='transfer'>
                            <MobileScreenShareIcon  className='method-icon'/>
                            Chuyển khoản
                        </button>
                    </div>


                    <div className='right-center'>
                        <Calculator setMoney={setMoney} money={money}/>
                        <InfPayment money={money} method={method} setMethod={setMethod} total={total}/>
                    </div>
                    
                    <div className="right-bottom">
                        <button className='item-btn cursor'>
                            <DeleteOutlineOutlinedIcon/>
                            <p>Huỷ</p>
                        </button>

                        <button className='item-btn cursor'>
                            <LocalPrintshopOutlinedIcon/>
                            <p>In tạm tính</p>
                        </button>

                        <button className='item-btn cursor'>
                            <VerticalAlignBottomOutlinedIcon/>
                            <p>Lưu</p>
                        </button>

                        <button className='item-btn cursor'>
                            <AttachMoneyOutlinedIcon/>
                            <p>Thanh toán</p>
                        </button>
                    </div>
                </div>
        
            </div>




        </div>
    )
}

export default PosHome