import { useEffect } from "react";
import { useParams } from "react-router-dom"
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";

const UpdateProfile = () => {
    const {userId} = useParams();
    
    

    return (
        <div className="update_user-page">
            <Sidebar/>

            <div className="update-container">
                <Navbar/>

                <div className="">
                    <h1 className="title">Update Profile</h1>
                </div>
            </div>
        </div>
    )

}

export default UpdateProfile