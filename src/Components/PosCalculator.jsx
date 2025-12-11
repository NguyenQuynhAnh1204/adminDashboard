import BackspaceIcon from '@mui/icons-material/Backspace';
import { formatVND } from '../helper/formatMoney';
import React, { useState } from 'react';


const calcBtn = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '000', 'Clear'] 

const Calculator = React.memo(({money, setMoney}) => {
    
    const handleClick = (e) => {
        const value = e.target.value;

        if (value === 'Clear') {
            setMoney('');
            return;
        }        
        setMoney(prev => prev + value);
    }

    

    return (
        <div className="calculator">
            <div className="calc-money">
                <p >{formatVND(Number(money))}</p>
                <BackspaceIcon className='dlt-btn cursor' onClick={() => setMoney(prev => prev.slice(0, -1))}/>
            </div>
        
            <div className='calc-table'>

                {
                    calcBtn.map((btn, index) => (
                        <button key={index} 
                        className='calc-btn'
                        onClick={(e) => handleClick(e)}
                        value={btn}
                        >{btn}</button>
                    ))
                }
                
            </div>    

        </div>
    )
})


export default Calculator