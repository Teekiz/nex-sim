import {Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";

interface ItemsReceivedModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function ItemsReceivedModal({ open, handleClose }: ItemsReceivedModalProps) {
    const itemsLog = useStatisticsStore().itemLog.slice(-200);

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box>
                {itemsLog.map((item, index) => (
                    <Typography key={item.id || index}>
                        {item.name} received at kill count {item.rollCount}.
                    </Typography>
                ))}
            </Box>
        </Modal>
    );
}