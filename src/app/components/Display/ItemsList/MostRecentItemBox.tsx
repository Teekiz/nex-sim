import {useStatisticsStore} from "../../../../stores/statisticsStore.ts";
import {animated, useSpring} from "@react-spring/web";
import Box from "@mui/material/Box";
import ItemImage from "../Shared/ItemImage.tsx";
import {getImageUrl} from "../../../../lib/util/util.ts";
import {Divider} from "@mui/material";

interface ModalOpenProps {
    handleOpen: () => void;
}

export default function MostRecentItemBox({ handleOpen }: ModalOpenProps) {

    const [springProps, set] = useSpring(() => ({ transform: 'scale(1)' }));
    const itemLog = useStatisticsStore((state) => state.itemLog);
    const latestItem = itemLog.at(itemLog.length - 1);

    return (
        <animated.div
            style={springProps}
            onMouseEnter={() => set.start({transform: 'scale(1.05)'})}
            onMouseLeave={() => set.start({transform: 'scale(1)'})}
            onClick={handleOpen}
        >
            <Box sx={({width: "98%", maxWidth: "inherit"})} className={"collection_log_box"}>
                <Box sx={{height: "32px"}} className={"collection_log_inner_box"}>
                    <Box margin={"4px"}>
                    {latestItem !== undefined ? (
                        <ItemImage name={latestItem.name} imageUrl={getImageUrl(latestItem.id)} isGreyedOut={false} />
                    ) : ("")}
                    </Box>
                </Box>

                <Divider className={"collection_log_divider"}/>

                <Box className={"collection_log_inner_box"}>
                    <p>Received at: <span className={"text_white"}>{latestItem !== undefined ? latestItem.rollCount + " kill count" : ""}</span></p>
                </Box>
            </Box>
        </animated.div>
    );
}