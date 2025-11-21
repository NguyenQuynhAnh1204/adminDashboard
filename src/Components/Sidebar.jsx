import DashboardIcon from '@mui/icons-material/Dashboard';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PollIcon from '@mui/icons-material/Poll';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import useCustomTheme from '../CustomHook/useCustomTheme';


const Sidebar = () => {

   
    const {mode, setMode} = useCustomTheme();

    return (

        <div className="sidebar">
            <div className="sidebar-top">
                <span className="sidebar-logo">Admin</span>
            </div>
            <hr/>
            <div className="sidebar-center">
                <ul>
                    <p className="sidebar-title">Main</p>
                    <NavLink to={'/admin/dashboard'}>
                        <li>
                            <DashboardIcon className='icon'/>
                            <span>Dashboard</span>
                        </li>
                    </NavLink>

                    <p className="sidebar-title">List</p>
                    <NavLink to={'/admin/users'}>
                        <li>
                            <PermIdentityIcon className='icon'/>
                            <span>Users</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/admin/products'}>
                        <li>
                            <StoreIcon className='icon'/>
                            <span>Products</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/admin/orders'}>
                        <li>
                            <CreditCardIcon className='icon'/>
                            <span>Orders</span>
                        </li>
                    </NavLink>

                    <p className="sidebar-title">Useful</p>
                    <NavLink to={'/admin/stats'}>
                        <li>
                            <PollIcon className='icon'/>
                            <span>Stats</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/admin/notifications'}>
                        <li>
                            <NotificationsNoneIcon className='icon'/>
                            <span>Notifications</span>
                        </li>
                    </NavLink>

                    <p className="sidebar-title">Service</p>
                    <NavLink to={'/admin/system'}>
                        <li>
                            <SettingsSystemDaydreamIcon className='icon'/>
                            <span>System Health</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/admin/logs'}>
                        <li>
                            <PsychologyIcon className='icon'/>
                            <span>Logs</span>
                        </li>
                    </NavLink>
                    <NavLink to={'/admin/settings'}>
                        <li>
                            <SettingsApplicationsIcon className='icon'/>
                            <span>Settings</span>
                        </li>
                    </NavLink>

                    <p className="sidebar-title">User</p>
                    <NavLink to={'/admin/profile'}>
                        <li>
                            <AccountCircleIcon className='icon'/>
                            <span>Profile</span>
                        </li>
                    </NavLink>
                    <li>
                        <LogoutIcon className='icon'/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

            <div className="sidebar-bottom">
                <div className="color-option cursor" onClick={() => setMode('light')}></div>
                <div className="color-option cursor" onClick={() => setMode('dark')}></div>
            </div>
        </div>
    )
}

export default Sidebar