import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material"
import {BaseMappingData} from "../../interface";
import MappingDialogTable from "./MappingDialogTable";

interface IMappingDialog {
    visible: boolean
    title: string
    onClose: () => void
    data: BaseMappingData[]
    setMapping: (data: BaseMappingData) => void
}

const MappingDialog = (props: IMappingDialog) => {
    const {visible, title, onClose} = props
    const setMappingData = (data: BaseMappingData) => {
        props.setMapping(data)
        props.onClose()
    }
    return (
        <Dialog className="mapping-modal" open={visible} fullWidth={true} maxWidth="md">
            <DialogTitle className="mapping-modal__title">
                {title}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <MappingDialogTable data={props.data} setMapping={setMappingData}/>
            </DialogContent>
        </Dialog>
    )
}

export default MappingDialog