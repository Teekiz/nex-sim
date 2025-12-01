import {Tooltip} from "@mui/material";

interface ItemImageProps {
    name: string;
    imageUrl: string;
    isGreyedOut?: boolean;
}

export default function ItemImage({ name, imageUrl, isGreyedOut = false }: ItemImageProps) {
    return (
        <Tooltip title={name} arrow={true}>
            <img
                src={imageUrl}
                alt={`${name} image`}
                style={{
                    display: "block",
                    filter: isGreyedOut ? "opacity(90%) contrast(75%)" : undefined,
                }}
            />
        </Tooltip>
    );
}