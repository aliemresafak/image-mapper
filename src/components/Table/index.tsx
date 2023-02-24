import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import {Area} from "../../interface";

interface IMappingTableColumns {
    title: string
}

interface IMappingTable {
    data: Area[]
    hoverId?: string
}

const mappingTableColumns: Array<IMappingTableColumns> = [
    {title: "ID"},
    {title: "Title"},
    {title: "X"},
    {title: "Y"},
]
const MappingTable = (props: IMappingTable) => {
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
                            sx={{'&:last-child td, &:last-child th': {border: 0}, '& td': {fontWeight: props.hoverId ? 'bold': 'inherit'}}}

                        >
                            <TableCell>
                                {row.id}
                            </TableCell>
                            <TableCell>
                                {row.name}
                            </TableCell>
                            {row?.coords && (
                                <>
                                    <TableCell>{row.coords.x}</TableCell>
                                    <TableCell>{row.coords.y}</TableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MappingTable