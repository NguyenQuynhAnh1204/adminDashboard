import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
// import { userColumns, userRows } from '../../dataTableSource';




const paginationModel = { page: 0, pageSize: 100 };
// số lượng row xuất hiện trong một page




const DataTable = ({columns, rows}) => {

    return (
        <div className="data-table">
                <Paper sx={{ height: 600, width: '100%'}}> 
                    
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[100]}   // thể hiện muốn thể hiện bao nhiêu row 5 hoặc 10
                        checkboxSelection
                        disableRowSelectionOnClick
                        // huỷ click chọn dòng 
                        sx={{
                            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                                outline: 'none', // ❌ Xoá viền khi focus
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#5c5c5cff',
                            }
                        }}
                    />
                </Paper>
        </div>
    )
}

export default DataTable