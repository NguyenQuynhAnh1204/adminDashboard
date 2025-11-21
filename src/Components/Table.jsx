import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TableList = () => {

    const rows = [
        {
            id: 1,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'cash',
            status: 'approved'
        },
        {
            id: 2,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'payment',
            status: 'pending'
        },
        {
            id: 3,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'cash',
            status: 'approved'
        },
        {
            id: 4,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'payment',
            status: 'approved'
        },
        {
            id: 5,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'payment',
            status: 'pending'
        },
        {
            id: 6,
            product: 'Apple',
            img: "/apple-pro.png",
            customer: 'Anh',
            date: '1 month',
            amount: 12000,
            method: 'cash',
            status: 'approved'
        }
    ]



    return (
            <TableContainer component={Paper} className='table'>
            <Table aria-label="simple table" 
                sx={{ minWidth: 650}} 
                
            >                           
                {/* sx: là style cho table*/}
                <TableHead>
                    <TableRow>
                        {/*Nhãn cột tương ứng với các trường dữ liệu*/}
                        <TableCell className='table-cell'>Tracking Id</TableCell>           
                        <TableCell className='table-cell'>Product</TableCell>
                        <TableCell className='table-cell'>Quantity</TableCell>
                        <TableCell className='table-cell'>Total</TableCell>
                        <TableCell className='table-cell'>Method</TableCell>
                        <TableCell className='table-cell'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className='table-cell'>{row.id}</TableCell>
                            <TableCell className='table-cell'>
                                <div className="cell-wrapper">
                                    <img src={row.img} alt="" />
                                    {row.product}
                                </div>
                            </TableCell>
                            <TableCell className='table-cell'>{row.customer}</TableCell>
                            <TableCell className='table-cell'>{row.amount}</TableCell>
                            <TableCell className='table-cell'>{row.method}</TableCell>
                            <TableCell className='table-cell'>
                                <span className={`${row.status} cell-status`}>
                                    {row.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
    )
}

export default TableList