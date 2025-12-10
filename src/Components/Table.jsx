import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TableList = ({titleCell, rows}) => {
    return (
            <TableContainer component={Paper} className='table'>
            <Table aria-label="simple table" 
                sx={{ minWidth: 650}} 
            >                           
                <TableHead>
                    <TableRow>
                        {
                            titleCell?.map((title, i) => (
                                <TableCell className='table-cell' key={i}>{title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
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