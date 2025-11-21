import { useNavigate } from "react-router-dom"
import DataTable from "./DataTable"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const ListPage = ({title, columns, rows}) => {

    const nav = useNavigate();
    return (
        <div className="list-page">
            <Sidebar/>

            <div className="list-container">
                <Navbar/>
                <div className="list-top">
                    <h1 className="list-title">{title}</h1>
                    <button onClick={() => nav('new')}>Add new</button>
                </div>
                <DataTable columns={columns} rows={rows}/>
            </div>
        </div>
    )
}

export default ListPage