import axios from "../../API/api";
import MyCalendar from "../../Components/Calendar";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from "react"; 

const AddNew = () => {

    const [file, setFile] = useState("");



    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        birthday: "",
        address: ""
    });

    const fetchNewUser = async () => {
        try{
            const formData = new FormData();

            if (file) {
                formData.append("avatar", file);
            }

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            })

            
            const res = await axios.post("/user/add", formData);

            console.log(res.data);
        }
        catch(err) {    
            console.error(err);
        }
    }

    useEffect(() => {
        return () => {
            if (file) {
            URL.revokeObjectURL(file);
            }
        };
    }, [file]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNewUser();
        
    }

    return (
        <div className="new-page">
            <Sidebar/>
            <div className="new-container">
                <Navbar/>
                
                <div className="new-top shadow">
                    <h1 className="new-title">Add new user</h1>
                </div>

                <div className="new-bottom shadow">
                    <div className="new-left"> 
                        <img src={file ? URL.createObjectURL(file) : '/noImg.jpg'} 
                        alt="no-img" className="new-img"/>
                    </div>

                    <div className="new-right">
                        <form action="" className="new-form">

                            <div className="form-input">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="cursor"/>
                                </label>
                                <input type="file" id="file" style={{display: "none"}}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className="form-input">
                                <label htmlFor="">User name:</label>
                                <input type="text" name="name" placeholder="Nguyen Van A" value={form.name} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Email:</label>
                                <input type="text" name="email" placeholder="a@gmail.com" value={form.email} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Phone:</label>
                                <input type="text" placeholder="+84 (0) 349457001" name="phone" value={form.phone} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Address:</label>
                                <input type="text" placeholder="Ha Noi" name="address" value={form.address} onChange={handleChange}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Birthday:</label>
                                <input type="date" name="birthday" value={form.birthday} onChange={handleChange}/>
                            </div>
                           {/* <div className="form-input">
                                <label htmlFor="role">Chức vụ:</label>
                                <select
                                    name="role"
                                    value={form.role || 'staff'}
                                    onChange={handleChange} // hoặc onChange={e => setForm({...form, role: e.target.value})}
                                >
                                    <option value="staff" defaultValue>Thu ngân</option>
                                    <option value="manager">Quản lý</option>
                                </select>
                            </div> */}

                            <button onClick={handleSubmit}>Send</button>
                           
                        </form>
                    </div>
                </div>



                <div className="">
                    <MyCalendar/>       
                </div>
            </div>
        </div>
    )
}


export default AddNew