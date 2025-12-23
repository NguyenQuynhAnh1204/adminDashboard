import ListPage from "../../components/List";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../service/product.service";
import ImportModal from "./ImportModal";
import { toast } from "react-toastify";
import { importService } from "../../service/import.service";

/* ===== OPTION GIÁ ===== */
const PRICE_OPTIONS = [
    { label: "Tất cả giá", value: "ALL" },
    { label: "Dưới 50.000đ", value: "UNDER_50" },
    { label: "50.000đ - 100.000đ", value: "50_100" },
    { label: "100.000đ - 200.000đ", value: "100_200" },
    { label: "Trên 200.000đ", value: "OVER_200" }
];

/* ===== CỘT BẢNG ===== */
const productColumns = [
    { field: "id", headerName: "ID", width: 80 },
    {
        field: "name",
        headerName: "Product name",
        width: 250,
        renderCell: (params) => (
            <div className="cell-table-img">
                <img className="cell-img" src={params.row.path} alt="avatar" />
                {params.row.name}
            </div>
        )
    },
    { field: "price", headerName: "Price", width: 150 },
    { field: "variant", headerName: "Variant", width: 150 },
    { field: "expiry_date", headerName: "Expiry date", width: 150 },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (params) => (
            <span className={`${params.row.status === 1 ? "active" : "pending"} cell-status`}>
                {params.row.status === 1 ? "Active" : "Out of stock"}
            </span>
        )
    }
];

const ProductList = () => {
    const nav = useNavigate();

    const [products, setProducts] = useState([]);
    const [openImport, setOpenImport] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    /* ===== FILTER STATE ===== */
    const [searchText, setSearchText] = useState("");
    const [priceFilter, setPriceFilter] = useState("ALL");

    /* ===== FETCH DATA ===== */
    const fetchData = async () => {
        const productList = await productService.getAll();
        setProducts(productList);
    };

    useEffect(() => {
        fetchData();
    }, []);

    /* ===== ACTION ===== */
    const handleView = (row) => {
        if (!row.id) return;
        nav(`${row.id}`);
    };

    const handleImport = (product) => {
        setSelectedProduct(product);
        setOpenImport(true);
    };

    const handleCloseImport = () => {
        setOpenImport(false);
        setSelectedProduct(null);
    };

    const handleImportSubmit = useCallback(async (data) => {
        try {
            await importService.postImport(data);
            toast.success("Nhập kho thành công");
            handleCloseImport();
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || "Nhập kho thất bại");
        }
    }, []);

    /* ===== CỘT ACTION ===== */
    const actionColumns = [
        {
            field: "actions",
            headerName: "Hành động",
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div className="cell-table-action">
                    <button className="view-btn" onClick={() => handleView(params.row)}>
                        View
                    </button>
                    <button className="delete-btn" onClick={() => handleImport(params.row)}>
                        Import
                    </button>
                </div>
            )
        }
    ];

    /* ===== FILTER LOGIC ===== */
    const filteredProducts = products.filter((product) => {
        const keyword = searchText.toLowerCase();
        const price = Number(product.price);

        const matchSearch =
            product.name?.toLowerCase().includes(keyword);

        let matchPrice = true;

        switch (priceFilter) {
            case "UNDER_50":
                matchPrice = price < 50000;
                break;
            case "50_100":
                matchPrice = price >= 50000 && price <= 100000;
                break;
            case "100_200":
                matchPrice = price >= 100000 && price <= 200000;
                break;
            case "OVER_200":
                matchPrice = price > 200000;
                break;
            default:
                matchPrice = true;
        }

        return matchSearch && matchPrice;
    });

    return (
        <>
            <ListPage
                title="List Products"
                columns={productColumns.concat(actionColumns)}
                rows={filteredProducts}
                searchText={searchText}
                setSearchText={setSearchText}
                filter={priceFilter}
                setFilter={setPriceFilter}
                options={PRICE_OPTIONS}
            />

            {selectedProduct && (
                <ImportModal
                    open={openImport}
                    onClose={handleCloseImport}
                    product={selectedProduct}
                    onSubmit={handleImportSubmit}
                />
            )}
        </>
    );
};

export default ProductList;
