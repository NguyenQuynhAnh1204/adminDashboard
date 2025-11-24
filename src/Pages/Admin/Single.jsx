import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import Chart from "../../Components/Chart"
import TableList from "../../Components/Table"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../API/api";

const Single = () => {

    
    const {userId} = useParams();

    const [btnSelect, setBtnSelect] = useState('transaction');
    const [form, setForm] = useState({
        name: "",
        phone: "",
        age: "",
        address: "",
        avatar: "",
    });

    const fetchData = async () => {
        const res = await axios.get(`/user/${userId}`);
        setForm({
            name: res.data.user.name,
            phone: res.data.user.phone,
            age: res.data.user.age,
            address: res.data.user.address,
            avatar: res.data.user.avatar,
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSelect = (select) => {
        setBtnSelect(select);
       
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = () => {
        console.log('update');
    }
    return (
        <div className="single-page">
            <Sidebar/>
            <div className="single-container">
                <Navbar/>
                
               <div className="single-top">

                    <div className="single-left shadow">
                       <h1 className="single-title">Change Avatar</h1>
                        
                        <div className="single-avt">
                            <img src={form.avatar || '/noImg.jpg'} 
                                alt="no-img" className="new-img"/>
                        </div>
                        
                        <button className="single-btn-img cursor" onClick={() => {}}>
                            New Photo
                            <input type="file" id="file" style={{display: "none"}}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </button>
                        
                    </div>

                    <div className="single-right shadow">
                        <h1 className="single-title">Account Settings</h1>

                        <form action="" className="single-form">
                            <div className="form-input">
                                <label htmlFor="">User name:</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Phone number</label>
                                <input type="text" name="phone" value={form.phone} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Age:</label>
                                <input type="text" name="age" value={form.age} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Address:</label>
                                <input type="text" name="address" value={form.address} onChange={handleChange}/>
                            </div>

                            <div className="form-btn">
                                <button onClick={handleUpdate}>Update profile</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="single-filter">
                    <button className={`${btnSelect === 'transaction' && 'btn-active'}`} onClick={() => handleSelect('transaction')}>Transaction</button>
                    <button className={`${btnSelect === 'schedule' && 'btn-active'}`} onClick={() => handleSelect('schedule')}>Schedule</button>
                </div>

                <div className="single-bottom shadow">
                    <h1 className="single-title">Last Transaction</h1>
                    <TableList/>
                </div>
            </div>
        </div>
    )
}

export default Single