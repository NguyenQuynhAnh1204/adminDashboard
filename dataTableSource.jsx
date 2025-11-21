export const userColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'User', width: 150,
        renderCell: (params) => {
            return (
                <div className="cell-table-img">
                    <img className="cell-img" src={params.row.img} alt="avatar"/>
                    {params.row.userName}
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'status', headerName: 'Status', width: 150,
        renderCell: (params) => {
            return (
                <span className={`${params.row.status} cell-status`}>
                    {params.row.status}
                </span>
            )
        }
    }
]

export const userRows = [
    {
        id: 1,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "active",
        email: 'anh@gmail.com anh@gmail.com anh@gmail.com anh@gmail.com anh@gmail.com anh@gmail.com',
        age: 35
    },
    {
        id: 2,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "passive",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 3,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "active",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 4,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "pending",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 5,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "active",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 6,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "pending",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 7,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "pending",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 8,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "pending",
        email: 'anh@gmail.com',
        age: 35
    },
    {
        id: 9,
        userName: 'Anh',
        img: './avatar.jpg',
        status: "pending",
        email: 'anh@gmail.com',
        age: 35
    },



]