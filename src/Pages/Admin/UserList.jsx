import ListPage from "../../Components/List";
import axios from "../../API/api";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import MyModal from "../../Components/Modal"

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
    { field: 'age', headerName: 'Age', width: 100, 
        renderCell: (params) => {
            const today = new Date();

            const birthday = params.row.birthday;
            if (!birthday) return '';
            let age =  today.getFullYear() - new Date(birthday).getFullYear();
            return age;
        }
     },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'hireDate', headerName: 'Hire date', width: 160, 
        renderCell: (params) => {
            const date = new Date(params.value); 
            return date.toLocaleDateString();
        }
    },
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

    const [deleteId, setDeleteId] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const fetchData = async () => {
        const res = await axios.get('/user');
        setUsers(res.data.data);
    }

    const fetchDelete = async (userId) => {
        try {
            await axios.delete(`/user/delete/${userId}`);
        }
        catch (e) {
            console.log(e);
        }
        
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (isDelete && deleteId) {
            fetchDelete(deleteId)
            .then(() => {
                window.location.reload();
            });

            setIsModal(false);
            setIsDelete(false);
        }
    }, [isDelete, deleteId]);

    const handleEdit = (row) => {
        nav(`${row.id}`)
    }

    const handleDelete = (row) => {
        setDeleteId(row.id);
        setIsModal(true);
    };

    return (
        <div>
            <ListPage title={"List Users"} columns={userColumns.concat(actionColumns)} rows={users}/>
            {
                isModal && (
                    <MyModal onClose={() => setIsModal(false)} open={isModal}
                    message={"Bạn chắc chắn muốn xoá"}  type={"warning"} onConfirm={() => setIsDelete(true)}/>
                )
            }
        </div>
    )
}


export default UserList