import { useEffect, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PrintIcon from '@mui/icons-material/Print';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Receipt from "../../components/Receipt";

const OrderReview = () => {
    
    const nav = useNavigate()

    return (
        <div className="pos-print">
            <div className="print-navigate">
                <Tooltip title="Back" arrow placement="left" onClick={() => nav(-1)}>
                    <ArrowBackIosIcon className="nav-icon cursor"/>
                </Tooltip>
                <h1 className="title">In tạm tính</h1>
                <Tooltip title="Next" arrow placement="right"
                    onClick={() => {
                        sessionStorage.removeItem("order");
                        nav("/pos/home")
                    }}
                >
                    <ArrowForwardIosIcon className="nav-icon cursor"/>
                </Tooltip>
            </div>
            <Receipt type_receipt={"review"}/>

            <Tooltip title="Print" arrow placement="right" >
                <PrintIcon className="print-btn cursor"/>
            </Tooltip>
        </div>
    )
}


export default OrderReview