import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState, useMemo } from 'react';
import { formatVND } from '../Helper/formatMoney';


const ProductRetail = React.memo(({data, updateTotal, deleteItem}) => {

    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        setQuantity(prev => prev + 1);
        updateTotal(data.price);
    }
    
    const handleRemove = () => {
        setQuantity(prev => prev - 1);
        updateTotal(-data.price);
    }

    return (
         <div className='product-item'>
                <div className='item-left'>
                    <p className='item-name'>{data.slug}</p>
                        
                    <p className='item-detail'>{data.code} <span>Giá: {formatVND(data.price)}</span></p>
                </div>

                <div className='item-center'>
                    <button className='item-btn cursor' onClick={handleRemove} disabled={quantity <= 1}>
                        <RemoveIcon/>
                    </button>
                    <span>{quantity}</span>
                    <button className='item-btn cursor' onClick={handleAdd}>
                        <AddIcon/>
                    </button>
                </div>

                <p className='item-right'>{formatVND(data.price * quantity)}</p>
                <CloseIcon className='item-close cursor' onClick={() => deleteItem(data.id)}/>
            </div>

    )
})


export default ProductRetail

