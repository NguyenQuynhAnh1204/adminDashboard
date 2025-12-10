import MoneyIcon from '@mui/icons-material/Money';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import VerticalAlignBottomOutlinedIcon from '@mui/icons-material/VerticalAlignBottomOutlined';
import ProductRetail from '../../components/ProductRetail';
import Calculator from '../../components/PosCalculator';
import InfPayment from '../../components/InfPayment';
import { formatVND } from '../../helper/formatMoney';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios";

const PosOrder = (props) => {

    const refSearch = useRef(null);
    const audio = useRef(new Audio("/success.wav"));


    const nav = useNavigate();

    const [data, setData] = useState([]); // call api
    const [products, setProducts] = useState([]); // product selected

    const [money, setMoney] = useState('');
    
    const [method, setMethod] = useState('cash');
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);


    const fetchData = async () => {
        try {
            const res = await axios.get(`/product?q=${search}`);
            setData(res.data.products);
        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchOrder = async (status) => {
        try {
            const res = await axios.post('/order', {
                order: {
                    
                    productItem: products,
                    total: total,
                    money: Number(money),
                    method: method,
                    status: status
                }
            })
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const storeOrder = sessionStorage.getItem("order");
        if (storeOrder) {
            setProducts(JSON.parse(storeOrder));
        }
    }, [])
    
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
        const sum = products.reduce((sum, x) => sum + Number(x.price) * x.quantity, 0);
        setTotal(Number(sum));
        sessionStorage.setItem("order", JSON.stringify(products));
    }, [products])

    const handleSelect = (product) => {
        setProducts(prev => {
            if (prev.some(pro => pro.id === product.id)) return prev;
            return [...prev, {...product, quantity: 1}];
        })
        setIsSearch(false)
        setSearch('')
    }

    const handleRemoveItem = useCallback((proId) => {
        setProducts(prev => prev.filter(item => item.id !== proId));
    }, [])

    const handleIncrease = useCallback((proId) => {
        setProducts(prev =>
            prev.map(item =>
                item.id === proId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }, []);

    const handleDecrease = useCallback((proId) => {
        setProducts(prev =>
            prev.map(item =>
                item.id === proId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    }, []);

    const handleClear = () => {
        setProducts([]);
        setMoney(0)
        sessionStorage.removeItem("order")
    }

    const handlePrint = () => {
        nav('/pos/print');
    }

    const handleSave = () => {
        fetchOrder("pending")
        setProducts([])
        setMoney("")
    }

    const handlePayment = () => {
        if (money.length <= 0) return;
        fetchOrder("paid")
            .then(() => {
                audio.current.currentTime = 0;
                audio.current.play().catch(err => console.log(err));
            })
            .catch(error => {
                console.error(error);
            });
        setProducts([]);
        setMoney("");
    }

    return (
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
                                        data?.map((item, index) => (
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
                            products?.map((item, index) => (
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
                        <button className={`method ${method === 'cash' && 'active'}`} onClick={(e) => setMethod(e.currentTarget.value)} value='cash'>
                            <MoneyIcon className='method-icon'/>
                            Tiền mặt
                        </button>
                        <button className={`method ${method === 'banking' && 'active'}`} onClick={(e) => setMethod(e.currentTarget.value)} value='banking'>
                            <MobileScreenShareIcon  className='method-icon'/>
                            Chuyển khoản
                        </button>
                    </div>


                    <div className='right-center'>
                        <Calculator setMoney={setMoney} money={money}/>
                        <InfPayment money={money} method={method} setMethod={setMethod} total={total} setMoney={setMoney}/>
                    </div>
                    
                    <div className="right-bottom">
                        <button className={`item-btn cursor ${products.length ===0 && 'btn-disable'}`} onClick={handleClear} disabled={products.length === 0}>
                            <DeleteOutlineOutlinedIcon/>
                            <p>Huỷ</p>
                        </button>

                        <button className={`item-btn cursor ${products.length ===0 && 'btn-disable'}`} onClick={handlePrint} disabled={products.length === 0}>
                            <LocalPrintshopOutlinedIcon/>
                            <p>In tạm tính</p>
                        </button>

                        <button  className={`item-btn cursor ${products.length ===0 && 'btn-disable'}`} onClick={handleSave} disabled={products.length === 0}>
                            <VerticalAlignBottomOutlinedIcon/>
                            <p>Lưu</p>
                        </button>

                        <button className={`item-btn cursor ${(products.length === 0 || money <= 0 ) && 'btn-disable'}`} onClick={handlePayment} disabled={products.length === 0 || money <= 0}>
                            <AttachMoneyOutlinedIcon/>
                            <p>Thanh toán</p>
                        </button>
                    </div>
                </div>
        
            </div>
    )
}


export default PosOrder;