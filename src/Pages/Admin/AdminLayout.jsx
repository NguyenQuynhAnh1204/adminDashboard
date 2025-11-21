import { Outlet } from "react-router-dom"
import useCustomTheme from "../../CustomHook/useCustomTheme";

const AdminLayout = () => {
    const {mode} = useCustomTheme();
    return (

        <div className={`${mode === 'dark' ? 'app-dark' : ''} app`}>
            <Outlet/>
        </div>

    )
}

export default AdminLayout