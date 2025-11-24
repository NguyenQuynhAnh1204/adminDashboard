import ListPage from "../../Components/List";
import axios from "../../API/api";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const userColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'userName', headerName: 'User name', width: 200,
        renderCell: (params) => {
            return (
                <div className="cell-table-img">
                    <img className="cell-img" src={params.row.avatar} alt="avatar"/>
                    {params.row.name}
                </div>
            )
        }
    },
    { field: 'phone', headerName: 'Phone number', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'hireDate', headerName: 'Hire date', width: 160},
    { field: 'status', headerName: 'Status', width: 150,
        renderCell: (params) => {
            return (
                <span className={`${params.row.isActive === 1 ? 'active' : 'passive'} cell-status`}>
                    {params.row.isActive === 1 ? 'Active' : 'Passive'}
                </span>
            )
        }
    }
]



const UserList = () => {
    const actionColumns = [
        {
        field: 'actions',
        headerName: 'Hành động',
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
        <div className='cell-table-action'>
            <button className='view-btn' onClick={() => handleEdit(params.row)}>View</button>
            <button className='delete-btn' onClick={() => handleDelete(params.row)}>Delete</button>
        </div>
        ),
    }
    ]

    const nav = useNavigate();
    const [users, setUsers] = useState();

    const fetchData = async () => {
        const res = await axios.get('/user');
        setUsers(res.data.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleEdit = (row) => {
        nav(`${row.id}`)
    }

    const handleDelete = (row) => {
        console.log('Delete user', row.id)
    }

    return (
        <div>
            <ListPage title={"List Users"} columns={userColumns.concat(actionColumns)} rows={users}/>
        </div>
    )
}


export default UserList