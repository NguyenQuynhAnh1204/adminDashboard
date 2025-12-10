import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState, useMemo, use } from 'react';
import { formatVND } from '../helper/formatMoney';


const ProductRetail = React.memo(({data, deleteItem, handleDecrease, handleIncrease}) => {
    
    const handleAdd = () => {
        handleIncrease(data.id)
    }
    
    const handleMinus = () => {
        handleDecrease(data.id)
    }
    
    return (
         <div className='product-item'>
                <img src={data.path || '/noImg.jpg'} alt="" className='product-img'/>
                <div className='item-left'>
                    <p className='item-name'>{data.name}</p>
                        
                    <p className='item-detail'>{data.variant} <span>Giá: {formatVND(Number(data.price))}</span></p>
                </div>

                <div className='item-center'>
                    <button className='item-btn cursor' onClick={handleMinus} disabled={data.quantity <= 1}>
                        <RemoveIcon/>
                    </button>
                    <span>{data.quantity}</span>
                    <button className='item-btn cursor' onClick={handleAdd}>
                        <AddIcon/>
                    </button>
                </div>

                <p className='item-right'>{formatVND(Number(data.price) * data.quantity)}</p>
                <CloseIcon className='item-close cursor' onClick={() => deleteItem(data.id)}/>
            </div>

    )
})


export default ProductRetail

