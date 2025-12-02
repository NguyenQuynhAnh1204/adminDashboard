import axios from "../../API/api";
import MyCalendar from "../../Components/Calendar";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from "react"; 
import MyModal from "../../Components/Modal"

const AddNew = () => {

    const [file, setFile] = useState("");
    const [isNew, setIsNew] = useState(false);
    const [errors, setErrors] = useState({});


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

    const validateForm = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Tên không được để trống";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Số điện thoại không được để trống";
        } else if (!/^(0|\+84)\d{9}$/.test(form.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ (phải đủ 10 số)";
        }

        if (!form.address.trim()) {
            newErrors.address = "Địa chỉ không được để trống";
        }

        if (!form.birthday) {
            newErrors.birthday = "Ngày sinh không được để trống";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true = hợp lệ
    };


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        fetchNewUser();
        setIsNew(true);
        
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
                                {errors.name && <p className="error-text">{errors.name}</p>}
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Email:</label>
                                <input type="text" name="email" placeholder="a@gmail.com" value={form.email} onChange={handleChange}/>
                                {errors.email && <p className="error-text">{errors.email}</p>}
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Phone:</label>
                                <input type="text" placeholder="+84 (0) 349457001" name="phone" value={form.phone} onChange={handleChange}/>
                                {errors.phone && <p className="error-text">{errors.phone}</p>}
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Address:</label>
                                <input type="text" placeholder="Ha Noi" name="address" value={form.address} onChange={handleChange}/>
                                {errors.address && <p className="error-text">{errors.address}</p>}
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Birthday:</label>
                                <input type="date" name="birthday" value={form.birthday} onChange={handleChange}/>
                                {errors.birthday && <p className="error-text">{errors.birthday}</p>}
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

            {
                isNew && (
                    <MyModal onClose={() => setIsNew(false)} message={"Tạo mới thành công!!!"} open={isNew} type={"success"}/>
                )
            }
        </div>
    )
}


export default AddNew