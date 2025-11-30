import Navbar from "../../Components/Navbar"
import Sidebar from "../../Components/Sidebar"
import Chart from "../../Components/Chart"
import TableList from "../../Components/Table"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../API/api";
import MyModal from "../../Components/Modal"
import Schedule from "../../Components/ScheduleWork"


const Single = () => {

    
    const {userId} = useParams();

    const [btnSelect, setBtnSelect] = useState('transaction');
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        birthday: "",
        address: "",
        avatar: "",
    });

    const [file, setFile] = useState("");
    const [change, setChange] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get(`/user/${userId}`);
            setForm({
                name: res.data.user.name,
                phone: res.data.user.phone,
                email: res.data.user.email,
                birthday: res.data.user.birthday && res.data.user.birthday.split("T")[0],
                address: res.data.user.address,
                avatar: res.data.user.avatar,
            });
            
        }
        catch (e) {
            console.log(e);
        }
    }


    const fetchUpdate = async () => {
        try {

            const formData = new FormData();

            if(file) {
                formData.append("avatar", file);
            }

            Object.keys(form).forEach(key => {
                if(key !== 'avatar') {
                    formData.append(key, form[key]);
                }
            })

            const res = await axios.post(`/user/update?q=${userId}`, formData) 

            console.log(res.data);

           

        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        return () => {
            if (file) {
            URL.revokeObjectURL(file);
            }
            setChange(true);
        };
    }, [file]);

    const handleSelect = (select) => {
        setBtnSelect(select);
       
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setChange(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!change) return;
        fetchUpdate();
        setIsUpdate(true);
        setChange(false);
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
                            <img src={file ? URL.createObjectURL(file) : form.avatar || '/noImg.jpg'} 
                                alt="no-img" className="new-img"/>
                        </div>
                        
                     
                        <label htmlFor="file" className="single-btn-img cursor">New Photo</label>
                        <input type="file" id="file" style={{display: "none"}}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        
                    </div>

                    <div className="single-right shadow">
                        <h1 className="single-title">Account Settings</h1>

                        <form action="" className="single-form">
                            <div className="form-input">
                                <label htmlFor="">User name:</label>
                                <input type="text" name="name"  value={form.name || ''} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Phone number</label>
                                <input type="text" name="phone" value={form.phone || ''} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Email:</label>
                                <input type="text" name="email" value={form.email || ''} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Birthday:</label>
                                <input type="date" name="birthday" value={form.birthday || ''} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Address:</label>
                                <input type="text" name="address" value={form.address || ''} onChange={handleChange}/>
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
                    {btnSelect === 'transaction' && (
                        <>
                            <h1 className="single-title">Last Transaction</h1>
                            <TableList/>
                        </>
                    )}
                    {btnSelect === 'schedule' && <Schedule/>}
                </div>
            </div>

            {
                isUpdate && (
                    <MyModal onClose={() => setIsUpdate(false)} message={"Cập nhật thành công!!!"} open={isUpdate} type={"success"}/>
                )
            }
        </div>
    )
}

export default Single