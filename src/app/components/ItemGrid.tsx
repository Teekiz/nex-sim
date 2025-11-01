import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type {ItemRow} from "../../lib/types/itemRow.tsx";

export default function ItemGrid({items, timesRolled}: {items: ItemRow[], timesRolled: number}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Total Rolled
                        </TableCell>
                        <TableCell align="right">{timesRolled}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}