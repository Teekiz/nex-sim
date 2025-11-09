interface ItemImageProps {
    name: string;
    imageUrl: string;
    isGreyedOut?: boolean;
}

export default function ItemImage({ name, imageUrl, isGreyedOut = false }: ItemImageProps) {
    return (
        <img
            src={imageUrl}
            alt={`${name} image`}
            style={{
                display: "block",
                filter: isGreyedOut ? "opacity(90%) contrast(75%)" : undefined,
            }}
        />
    );
}