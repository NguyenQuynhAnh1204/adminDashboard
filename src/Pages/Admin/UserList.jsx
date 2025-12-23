import ListPage from "../../components/List";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/Modal";
import { userService } from "../../service/user.service";

/* ===== OPTION LỌC TUỔI ===== */
const AGE_OPTIONS = [
    { label: "Tất cả độ tuổi", value: "ALL" },
    { label: "Dưới 18", value: "UNDER_18" },
    { label: "18 - 25", value: "18_25" },
    { label: "26 - 35", value: "26_35" },
    { label: "Trên 35", value: "OVER_35" }
];

/* ===== CỘT TABLE ===== */
const userColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
        field: "userName",
        headerName: "User name",
        width: 200,
        renderCell: (params) => (
            <div className="cell-table-img">
                <img className="cell-img" src={params.row.avatar} alt="avatar" />
                {params.row.name}
            </div>
        )
    },
    { field: "phone", headerName: "Phone number", width: 150 },
    {
        field: "age",
        headerName: "Age",
        width: 100,
        renderCell: (params) => {
            const birthday = params.row.birthday;
            if (!birthday) return "";
            const today = new Date();
            return today.getFullYear() - new Date(birthday).getFullYear();
        }
    },
    { field: "address", headerName: "Address", width: 150 },
    {
        field: "hireDate",
        headerName: "Hire date",
        width: 160,
        renderCell: (params) => {
            const date = new Date(params.value);
            return date.toLocaleDateString();
        }
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => (
            <span
                className={`${params.row.isActive === 1 ? "active" : "passive"} cell-status`}
            >
                {params.row.isActive === 1 ? "Active" : "Passive"}
            </span>
        )
    }
];

const UserList = () => {
    const nav = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [ageFilter, setAgeFilter] = useState("ALL");

    const [deleteId, setDeleteId] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [isModal, setIsModal] = useState(false);

    /* ===== FETCH DATA ===== */
    const fetchData = async () => {
        const userList = await userService.getUsers();
        setUsers(userList);
    };

    useEffect(() => {
        fetchData();
    }, []);

    /* ===== DELETE ===== */
    const fetchDelete = async (userId) => {
        try {
            await userService.deleteUser(userId);
            fetchData();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (isDelete && deleteId) {
            fetchDelete(deleteId);
            setIsModal(false);
            setIsDelete(false);
        }
    }, [isDelete, deleteId]);

    const handleEdit = (row) => {
        nav(`${row.id}`);
    };

    const handleDelete = (row) => {
        setDeleteId(row.id);
        setIsModal(true);
    };

    /* ===== ACTION COLUMN ===== */
    const actionColumns = [
        {
            field: "actions",
            headerName: "Hành động",
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div className="cell-table-action">
                    <button className="view-btn" onClick={() => handleEdit(params.row)}>
                        View
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(params.row)}>
                        Delete
                    </button>
                </div>
            )
        }
    ];

    /* ===== FILTER LOGIC (SEARCH + AGE) ===== */
    const filteredUsers = users.filter((user) => {
        const keyword = searchText.toLowerCase();

        const matchSearch =
            user.name?.toLowerCase().includes(keyword) ||
            user.userName?.toLowerCase().includes(keyword);

        let age = 0;
        if (user.birthday) {
            age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
        }

        let matchAge = true;
        switch (ageFilter) {
            case "UNDER_18":
                matchAge = age < 18;
                break;
            case "18_25":
                matchAge = age >= 18 && age <= 25;
                break;
            case "26_35":
                matchAge = age >= 26 && age <= 35;
                break;
            case "OVER_35":
                matchAge = age > 35;
                break;
            default:
                matchAge = true;
        }

        return matchSearch && matchAge;
    });

    return (
        <>
            <ListPage
                title="List Users"
                columns={userColumns.concat(actionColumns)}
                rows={filteredUsers}
                searchText={searchText}
                setSearchText={setSearchText}
                filter={ageFilter}
                setFilter={setAgeFilter}
                options={AGE_OPTIONS}
            />

            {isModal && (
                <MyModal
                    open={isModal}
                    onClose={() => setIsModal(false)}
                    message="Bạn chắc chắn muốn xoá?"
                    type="warning"
                    onConfirm={() => setIsDelete(true)}
                />
            )}
        </>
    );
};

export default UserList;
