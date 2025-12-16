import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatVND } from '../helper/formatMoney';

const renderCell = (row, col) => {
  const value = row[col.key];

  switch (col.type) {
    case "img":
        return (
            <div className="cell-wrapper">
                <img src={value?.image} alt=""/>
                {value?.name}
            </div>
        )
    case "status":
        return (
            <span className={`cell-status ${value}`}>
                {value}
            </span>
        )
    case "money":
        return formatVND(Number(value));
    default:
       return value ?? "---";
  }
};


const TableList = ({columns = [], rows = []}) => {
    return (
            <TableContainer component={Paper} className='table'>
            <Table aria-label="simple table" 
                sx={{ minWidth: 650}} 
            >                           
                <TableHead>
                    <TableRow>
                       {columns.map(col => (
                        <TableCell key={col.key} className="table-cell">
                            {col.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                        {columns.map(col => (
                            <TableCell key={col.key} className="table-cell">
                            {renderCell(row, col)}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
    )
}

export default TableList