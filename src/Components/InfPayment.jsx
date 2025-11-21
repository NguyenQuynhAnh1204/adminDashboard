import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatVND } from '../Helper/formatMoney';
import React, { useEffect, useState } from 'react';

const InfPayment = React.memo(({money, method, setMethod, total}) => {

  
    
    return (
        <div className="inf-payment">
            <div className="inf-top">
                <p>Khách thanh toán</p>

               
                    <div className="pay-method">
                        <DeleteOutlineOutlinedIcon className='trash-icon cursor'
                        onClick={() => setMethod('')}/>
                        <span>{method}</span>

                        <span className='money'>{formatVND(+money)}</span>
                    </div>
                
            </div>

            <div className="inf-bottom">
                <p className='inf-text'>Tổng: <span>{formatVND(total)}</span></p>
                <p className='inf-text'>Còn phải thu: <span>{formatVND(total-money > 0 ? total-money : 0)}</span> </p>
                <p className='inf-text'>Trả lại khách: <span>{formatVND(money-total > 0 ? money-total : 0)}</span> </p>
            </div>
        </div>
    )
})


export default InfPayment