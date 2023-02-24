import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import { JoinInner } from "@mui/icons-material"
import {BaseMappingData} from "../../interface";


interface IMappingTableColumns {
    title: string
}

interface IMappingTable {
    data: BaseMappingData[]
    setMapping: (data: BaseMappingData) => void
}

const mappingTableColumns: Array<IMappingTableColumns> = [
    {title: "ID"},
    {title: "Name"},
]
const MappingDialogTable = (props: IMappingTable) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {mappingTableColumns.map((column, index) => (
                            <TableCell key={index}>{column.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, index: number) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <IconButton onClick={() => props.setMapping(row)}>
                                    <JoinInner />
                                </IconButton>
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MappingDialogTable