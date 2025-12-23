import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ListPage = ({
    title,
    columns,
    rows,
    searchText,
    setSearchText,
    filter,
    setFilter,
    options
}) => {
    const nav = useNavigate();

    return (
        <div className="list-page">
            <Sidebar />

            <div className="list-container">
                <Navbar />

                <div className="list-top">
                    <h1 className="list-title">{title}</h1>
                    <button onClick={() => nav("new")}>Add new</button>
                </div>

                {/* SEARCH + FILTER */}
                <div className="list-search">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="search-input"
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="price-select"
                    >
                        {options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <DataTable columns={columns} rows={rows} />
            </div>
        </div>
    );
};

export default ListPage;
