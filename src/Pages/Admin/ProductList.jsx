import ListPage from "../../components/List";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../service/product.service";
import ImportModal from "./ImportModal";
import { toast } from "react-toastify";
import { importService } from "../../service/import.service";

const productColumns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Product name', width: 250,
        renderCell: (params) => {
            return (
                <div className="cell-table-img">
                    <img className="cell-img" src={params.row.path} alt="avatar"/>
                    {params.row.name}
                </div>
            )
        }
    },
    // { field: 'unit', headerName: 'Unit', width: 100 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'variant', headerName: 'Variant', width: 150 },
    { field: 'expiry_date', headerName: 'Expiry date', width: 150},
    { field: 'status', headerName: 'Status', width: 120,
        renderCell: (params) => {
            return (
                <span className={`${params.row.status === 1 ? 'active' : 'pending'} cell-status`}>
                    {params.row.status === 1 ? 'Active' : 'Out of stock'}
                </span>
            )
        }
    }
]



const ProductList = () => {
    const [openImport, setOpenImport] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const actionColumns = [
        {
        field: 'actions',
        headerName: 'Hành động',
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
        <div className='cell-table-action'>
            <button className='view-btn' onClick={() => handleView(params.row)}>View</button>
            <button className='delete-btn' onClick={() => handleImport(params.row)}>Import</button>
        </div>
        ),
    }
    ]


    const nav = useNavigate();
    const [products, setProducts] = useState([]);
    
    const fetchData = async () => {
        const productList = await productService.getAll();
        setProducts(productList);
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    const handleView = (row) => {
        if (!row.id) return;
        nav(`${row.id}`);
    }

    const handleImport = (product) => {
        setSelectedProduct(product);
        setOpenImport(true);
    }
    const handleCloseImport = () => {
        setOpenImport(false);
        setSelectedProduct(null);
    };


    const handleImportSubmit = useCallback(async (data) => {
        try {

            console.log(data)
            await importService.postImport(data);

            toast.success("Nhập kho thành công");
            handleCloseImport();   // 🔥 đóng modal chuẩn
            fetchData();

        } catch (err) {
            toast.error(err.response?.data?.message || "Nhập kho thất bại");
        }
    }, [selectedProduct]);


    
    return (
        <>
            <div>
                <ListPage title={"List Products"} columns={productColumns.concat(actionColumns)} rows={products}/>
            </div>

            {selectedProduct && (
                <ImportModal
                    open={openImport}
                    onClose={() => setOpenImport(false)}
                    product={selectedProduct}
                    onSubmit={handleImportSubmit}
                />
            )}

        </>
    )
}


export default ProductList