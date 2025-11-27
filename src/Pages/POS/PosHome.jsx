import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MoneyIcon from '@mui/icons-material/Money';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import VerticalAlignBottomOutlinedIcon from '@mui/icons-material/VerticalAlignBottomOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProductRetail from '../../Components/ProductRetail';
import Calculator from '../../Components/PosCalculator';
import InfPayment from '../../Components/InfPayment';
import { formatVND } from '../../Helper/formatMoney';
import axios from "../../API/api";
import LongMenu from '../../Components/HeightMenu';



const PosHome = () => {
    const refSearch = useRef(null);

    const [data, setData] = useState([]); // call api
    const [products, setProducts] = useState([]); // product selected

    const [count, setCount] = useState(100);
    const [money, setMoney] = useState('');
    
    const [method, setMethod] = useState('money');
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);


    const fetchData = async () => {
        try {
            const res = await axios.get(`/product?q=${search}`);
            setProducts(res.data.products);
        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchOrder = async () => {
        try {
            const res = await axios.post('/order', {
                order: {
                    
                    productItem: data,
                    total: total,
                    money: Number(money),
                    method: method,
                }
            })
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [search])

        
    useEffect(() => {
        function handleClick(e) {
            if (refSearch.current && !refSearch.current.contains(e.target)) {
                setIsSearch(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [])

    useEffect(() => {
        const sum = data.reduce((sum, x) => sum + Number(x.price) * x.quantity, 0);
        setTotal(Number(sum));
    }, [data])

    const handleSelect = (product) => {
        setData(prev => {
            if (prev.some(pro => pro.id === product.id)) return prev;
            return [...prev, {...product, quantity: 1}];
        })
        setIsSearch(false)
        setSearch('')
    }

    const handleRemoveItem = useCallback((proId) => {
        setData(prev => prev.filter(item => item.id !== proId));
    }, [])

    const handleIncrease = useCallback((proId) => {
        setData(prev =>
            prev.map(item =>
                item.id === proId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }, []);

    const handleDecrease = useCallback((proId) => {
        setData(prev =>
            prev.map(item =>
                item.id === proId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    }, []);

    const handleClear = () => {
        setData([]);
        setMoney('')
    }

    const handlePrint = () => {
        console.log("In tạm tính ")
    }

    const handleSave = () => {
        console.log('Lưu hoá đơn')
    }

    const handlePayment = () => {
        if (money.length <= 0) return;
        fetchOrder();
        setData([]);
        setMoney('')
    }
    
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

                <div className="head-list">
                    <LongMenu height={30} options={['Bản sao', 'Đã lưu']} />

                </div>

                
                <AddIcon className='head-btn cursor' onClick={() => setCount(prev => prev+1)}/>
            </div>
            
            <div className="home-container">

                <div className='home-left'>
                    <div className='left-top' ref={refSearch}>
                        <div className='home-search'>
                            <SearchIcon className='search-icon'/>
                            <input type="text" name="search" id="search" placeholder='Tìm kiếm sản phẩm' autoComplete="off"
                                onChange={(e) => setSearch(e.target.value)} 
                                onFocus={() => setIsSearch(true)}
                                value={search}
                            />
                        </div>

                        {
                            isSearch && (
                                <div className='product-search shadow'>
                                    {
                                        products?.map((item, index) => (
                                            <div className='pro-item cursor' key={index} onMouseDown={() => handleSelect(item)}>
                                                <img src={item.path} alt="" />
                                                <p>{item.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div className='product-retail'>
                        {
                            data?.map((item, index) => (
                                <ProductRetail key={index} data={item} 
                                    deleteItem={handleRemoveItem}
                                    handleDecrease={handleDecrease} handleIncrease={handleIncrease}
                                />
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
                        <button className='item-btn cursor' onClick={handleClear}>
                            <DeleteOutlineOutlinedIcon/>
                            <p>Huỷ</p>
                        </button>

                        <button className='item-btn cursor' onClick={handlePrint}>
                            <LocalPrintshopOutlinedIcon/>
                            <p>In tạm tính</p>
                        </button>

                        <button className='item-btn cursor' onClick={handleSave}>
                            <VerticalAlignBottomOutlinedIcon/>
                            <p>Lưu</p>
                        </button>

                        <button className='item-btn cursor' onClick={handlePayment}>
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