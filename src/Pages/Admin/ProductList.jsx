import ListPage from "../../components/List";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/Modal";
import { productService } from "../../service/product.service";

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
                    {params.row.status === 1 ? 'Active' : 'Stock'}
                </span>
            )
        }
    }
]



const ProductList = () => {

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

    // const [deleteId, setDeleteId] = useState(null);
    // const [isDelete, setIsDelete] = useState(false);
    // const [isModal, setIsModal] = useState(false);
    
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

    // const handleImport = (row) => {
    //     setDeleteId(row.id);
    //     setIsModal(true);
    // };
    
    return (
        <div>
            <ListPage title={"List Products"} columns={productColumns.concat(actionColumns)} rows={products}/>
        </div>
    )
}


export default ProductList