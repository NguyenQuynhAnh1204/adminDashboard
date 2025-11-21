import { useState } from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {

    const [data, setData] = useState({});

    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        

        const formData = new FormData(e.target);

        const dataE = Object.fromEntries(formData.entries());

        if (dataE?.userName === 'admin') {
            nav('/admin/dashboard', {replace: true});
            return;
        }
        if (dataE?.userName === "cashier") {
            nav("/pos/home", {replace: true})
            return;
        }
    }

    return (
        <div className="home">
            <div className="home-container shadow">
                <div className="home-box">
                    <h1 className="title">Welcom Back!</h1>

                    <p className="text">Bạn là người quản lý hay là nhân viên thu ngân?</p>
                    <p className="text">Hãy đăng nhập vào hệ thống ngay nhé!</p>

                    <form onSubmit={handleSubmit}>
                        
                        <div className="input-box">
                            <input type="text" placeholder="admin / cashier" name="userName"/>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="password" name="password"/>
                        </div>

                        <button className="btn-login cursor" type="submit">Đăng nhập</button>
                    </form>
                    <p className="text">Forget password? <span>Click hear</span></p>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage