import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import useCustomTheme from '../customHook/useCustomTheme';

const Navbar = () => {

    const {mode, setMode} = useCustomTheme();

    // console.log(mode);

    const handleTheme = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    }
    
    return (
        <div className="navbar">
            <div className="wrapper">
                {/* <div className="search">
                    <input type="text"  placeholder="Search..."/>
                    <SearchIcon/>
                </div> */}

                <div className="items">
                    <div className='item'>
                        <LanguageIcon className='icon'/>
                        English
                    </div>
                    <div className='item' onClick={handleTheme}>
                        {
                            mode === 'light' ? (
                                <LightModeOutlinedIcon/>
                            ) : (
                                <DarkModeOutlinedIcon className='icon'/>
                            )
                        }
                    </div>
                    <div className='item'>
                        <NotificationsOutlinedIcon className='icon'/>
                        <div className="counter">1</div>
                    </div>
                    {/* <div className='item'>
                        <ChatBubbleOutlineOutlinedIcon className='icon'/>
                        <div className="counter">1</div>
                    </div> */}
                    <div className='item'>
                        <FormatListBulletedOutlinedIcon className='icon'/>
                    </div>

                    <div className='item'>
                        <img src="/avatar.jpg" alt="avatar" className='avatar'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar