import {Input, InputLabel, Slider} from "@mui/material";
import Box from "@mui/material/Box";

interface ContributionInputProps {
    contribution: number[];
    setContribution: (value: number[]) => void;
}

export default function ContributionInput({contribution, setContribution}: ContributionInputProps) {

    const updateContributionArray = (value: number | number[]) => {
        if (!Array.isArray(value)) return

        const [min, max] = value;
        const trueMin = Math.min(min, max);
        const trueMax = Math.max(min, max);

        setContribution([trueMin, trueMax]);
    };

    const updateContributionNumber = (value: number, index: number) => {
        if (index >= 2) return;

        if (index === 0) {
            updateContributionArray([value, contribution[1]]);
        } else {
            updateContributionArray([contribution[0], value]);
        }
    }

    return (
        <Box sx={{ width: 425, backgroundColor: "transparent", border: "1px solid white", borderRadius: "4px", padding: "20px", marginTop: "10px", }}>
            <InputLabel sx={{float: "none", textAlign: "center"}}>Contribution (%)</InputLabel>
            <div style={{float: "left"}}>
                <InputLabel>Min</InputLabel>
                <Input
                    value={contribution[0]}
                    size="small"
                    onChange={(event) => updateContributionNumber(Number(event.target.value), 0)}
                    inputProps={{
                        min: 0,
                        max: 100,
                        step: 0.1,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </div>

            <div style={{float: "right"}}>
                <InputLabel>Max</InputLabel>
                <Input
                    value={contribution[1]}
                    size="small"
                    onChange={(event) => updateContributionNumber(Number(event.target.value), 1)}
                    inputProps={{
                        min: 0,
                        max: 100,
                        step: 0.1,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </div>
            <Slider
                max={100}
                min={0}
                value={contribution}
                step={0.1}
                onChange={(_event, value) => updateContributionArray(value)}
                disableSwap={true}
                marks={[
                    { value: 0, label: "0%" },
                    { value: 10, label: "" },
                    { value: 20, label: "20%" },
                    { value: 30, label: "" },
                    { value: 40, label: "40%" },
                    { value: 50, label: "" },
                    { value: 60, label: "60%" },
                    { value: 70, label: "" },
                    { value: 80, label: "80%" },
                    { value: 90, label: "" },
                    { value: 100, label: "100%" },
                ]}
            />
        </Box>
    );
}