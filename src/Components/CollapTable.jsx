import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { formatVND } from '../helper/formatMoney';


function Row(props) {
  const { row, labels } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align='left'>{row.orderCode}</TableCell>
        <TableCell align="left">{row.userName}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.method}</TableCell>
        <TableCell align="left">{formatVND(Number(row.totalAmount))}</TableCell>
        <TableCell align="left">
          <span className={`${row.status} cell-status`}>
            {row.status}
          </span>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {
                        labels?.map((label, i) => (
                            <TableCell align="center" key={i}>{label}</TableCell>
                        ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details?.map((dr, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row" align="center">
                        {dr.variantId}
                      </TableCell>
                      <TableCell align="center">
                        <img src={dr.path} alt="" style={{width: '40px', height: "40px", borderRadius: "99px", border: "1px solid #f5a3a3ff"}}/>
                      </TableCell>
                      <TableCell align="center">{dr.quantity}</TableCell>
                      <TableCell align="center">{formatVND(Number(dr.price))}</TableCell>
                      <TableCell align="center">
                        {formatVND(Number(dr.quantity * dr.price))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapTable = ({rows, labels, labelChild}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {
                labels?.map((label, index) => (
                    <TableCell key={index} align='left'>{label}</TableCell>
                ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <Row key={i} row={row} labels={labelChild} detailColumns={row.details}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapTable;