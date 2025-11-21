import ListPage from "../../Components/List";
import axios from "../../API/api";
import { useEffect, useState } from "react";


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
    { field: 'unit', headerName: 'Unit', width: 100 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'variant', headerName: 'Variant', width: 150 },
    { field: 'expiry_date', headerName: 'Expiry date', width: 150},
    { field: 'status', headerName: 'Status', width: 120,
        renderCell: (params) => {
            return (
                <span className={`${params.row.status === 1 ? 'active' : 'passive'} cell-status`}>
                    {params.row.status === 1 ? 'Active' : 'Passive'}
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
            <button className='delete-btn' onClick={() => handleDelete(params.row)}>Delete</button>
        </div>
        ),
    }
    ]

    const [products, setProducts] = useState([]);
    
    const fetchData = async () => {
        const res = await axios.get('/product');
        setProducts(res.data.products);
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    const handleView = (row) => {
        
    }

    const handleDelete = (row) => {
        
    }
    
    return (
        <div>
            <ListPage title={"List Products"} columns={productColumns.concat(actionColumns)} rows={products}/>
        </div>
    )
}


export default ProductList