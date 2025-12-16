import PersonIcon from '@mui/icons-material/Person';
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { userService } from '../../service/user.service';

import Profile from '../../components/Profile';
import Revenue from '../../components/SingleRevenue';
import Schedule from '../../components/ScheduleWork';

const Single = () => {

    const {userId} = useParams();

    const [form, setForm] = useState({
            name: "",
            phone: "",
            email: "",
            birthday: "",
            address: "",
            avatar: "",
            role: "",
    });


    const fetchData = async () => {
            try {
                const userDta = await userService.getById(userId);
                setForm(userDta);
            }
            catch (e) {
                console.log(e);
            }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const [btnSelect, setBtnSelect] = useState('Revenue');

    const handleSelect = (select) => {
        setBtnSelect(select);
    }

    const renderContent = () => {
        switch (btnSelect) {
            case 'Profile':
                return <Profile form={form} setForm={setForm}/>;
               

            case 'Revenue':
                return <Revenue/>

            case 'Schedule':
                return <Schedule/>

            default:
                return <Revenue/>
        }
    };

    
    
    return (
        <div className="single-page">
            <Sidebar/>
            <div className="single-container">
                <Navbar/>
                <div className="single-side">
                    <div className="single-avt">
                            <img src={form.avatar || '/noImg.jpg'} 
                                alt="no-img" className="new-img"
                            />
                            <div className='single-avt-text'>
                                <p>{form.name}</p>
                                <div>
                                    <PersonIcon/>
                                    <span>{form.role === 'staff' && "Cashier"}</span>
                                </div>
                            </div>
                    </div>
                </div>

                <div className='single-filter'>
                    <div className={`${btnSelect === 'Profile' && 'btn-active'} btn-filter`} onClick={() => handleSelect("Profile")}>
                        Profile
                    </div>

                    <div className={`${btnSelect === 'Revenue' && 'btn-active'} btn-filter`} onClick={() => handleSelect("Revenue")}>
                        Revenue
                    </div>
                    <div className={`${btnSelect === 'Schedule' && 'btn-active'} btn-filter`} onClick={() => handleSelect("Schedule")}>
                        Schedule
                    </div>
                </div>


                <div className='single-content'>
                    {renderContent()}
                </div>
                
                {/* <Profile/> */}

                {/* <div className="single-filter">
                    <button className={`${btnSelect === 'transaction' && 'btn-active'}`} onClick={() => handleSelect('transaction')}>Transaction</button>
                    <button className={`${btnSelect === 'schedule' && 'btn-active'}`} onClick={() => handleSelect('schedule')}>Schedule</button>
                </div> */}


                {/* <div className="single-bottom shadow">
                    {btnSelect === 'transaction' && (
                        <>
                            <h1 className="single-title">Last Transaction</h1>
                            <TableList titleCell={tableTitle} rows={[]}/>
                        </>
                    )}
                    {btnSelect === 'schedule' && <Schedule/>}
                </div> */}
            </div>

           
        </div>
    )
}

export default Single