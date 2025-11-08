import {Divider, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";

interface ItemsReceivedModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function ItemsLogModal({ open, handleClose }: ItemsReceivedModalProps) {
    const itemsLog = useStatisticsStore().itemLog.slice(-200);

    return (
        <Modal keepMounted open={open} onClose={handleClose}>
            <Box className="items_received_modal">

                {/* Title Box */}
                <Box className="items_received_modal_title_box">
                    <Typography component="h2" className="items_received_modal_title">
                        Items Received
                    </Typography>
                </Box>

                {/* Divider */}
                <Divider className="items_received_modal_divider" />

                {/* Items List */}
                <Box className="items_received_modal_box">
                    {itemsLog.map((item, index) => (
                        <Typography
                            key={item.id || index}
                            component="p"
                            className="items_received_modal_item"
                        >
                            {item.name} received at kill count {item.rollCount}.
                        </Typography>
                    ))}
                </Box>

            </Box>
        </Modal>
    );
}