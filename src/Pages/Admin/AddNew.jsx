import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from "react"; 

const AddNew = () => {

    const [file, setFile] = useState("");


    useEffect(() => {
        return () => {
            if (file) {
            URL.revokeObjectURL(file);
            }
        };
    }, [file]);

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
                                <input type="text" placeholder="Nguyen Van A"/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Email:</label>
                                <input type="text" placeholder="a@gmail.com"/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Phone:</label>
                                <input type="text" placeholder="+84 (0) 349457001"/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Password:</label>
                                <input type="password"/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="">Address:</label>
                                <input type="text" placeholder="Ha Noi"/>
                            </div>

                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddNew