import {InputLabel, Slider, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {getUniqueChance} from "../../../lib/util/util.ts";
import {useState} from "react";

interface ContributionInputProps {
    contribution: number[];
    setContribution: (value: number[]) => void;
}

export default function ContributionInput({contribution, setContribution}: ContributionInputProps) {

    const [activeThumb, setActiveThumb] = useState<number>(0);

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

    const sliderLabel = (): string => {
        return contribution[activeThumb] + "% (1/" + getUniqueChance(contribution[activeThumb]) + ")";
    }

    return (
        <Box sx={{backgroundColor: "transparent", minWidth: "100%"}}>
            <InputLabel sx={{float: "none", textAlign: "center", fontSize: "14px"}}>Contribution (%)</InputLabel>
            <Box style={{display: "flex", justifyContent: "space-between"}} sx={{mt: "-12px"}}>
                <Tooltip title={"Minimum contribution value"}>
                    <TextField
                        value={contribution[0]}
                        label="Min"
                        size="small"
                        type={"text"}
                        inputMode={"decimal"}
                        variant={"filled"}
                        fullWidth={false}
                        onChange={(event) => updateContributionNumber(Number(event.target.value), 0)}
                        slotProps={{
                            input: {
                                inputProps: {
                                    min: 0,
                                    max: 100,
                                    step: 0.1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                },
                            },
                        }}
                        sx={{width: "25%"}}
                    />
                </Tooltip>

                <Tooltip title={"Maximum contribution value"}>
                    <TextField
                        value={contribution[1]}
                        label={"Max"}
                        size="small"
                        type={"text"}
                        inputMode={"decimal"}
                        variant={"filled"}
                        fullWidth={false}
                        onChange={(event) => updateContributionNumber(Number(event.target.value), 1)}
                        slotProps={{
                            input: {
                                inputProps: {
                                    min: 0,
                                    max: 100,
                                    step: 0.1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                },
                            },
                        }}
                        sx={{width: "25%"}}
                    />
                </Tooltip>
            </Box>
            <Slider
                max={100}
                min={0}
                value={contribution}
                step={0.1}
                onChange={(_event, value) => updateContributionArray(value)}
                disableSwap={true}
                valueLabelDisplay={'auto'}
                valueLabelFormat={sliderLabel}
                aria-label={"Contribution slider."}
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
                slotProps={{
                    thumb: {
                        onMouseEnter: (event) => {
                            const thumbIndex = Number(event.currentTarget.getAttribute("data-index"));
                            setActiveThumb(thumbIndex);
                        },
                        onMouseLeave: () => {setActiveThumb(0)}
                    }
                }}
            />
        </Box>
    );
}