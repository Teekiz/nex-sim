import '../css/Fonts.css'
import './components/Display/CollectionLog/CollectionLog.css'
import './components/Display/ItemsList/ItemLog.css'
import InputBox from "./components/controls/InputBox.tsx";
import DisplayContainer from "./components/Display/DisplayContainer.tsx";
import {alpha, Container, createTheme, ThemeProvider, Typography} from "@mui/material";

function App() {

    const theme = createTheme({
        palette: {
            text: {
                secondary: "#ffffff",
                primary: "#ffffff",
            }
        },
        typography: {
            fontFamily: 'RunescapePlain',
            fontSize: 16,
            fontWeightRegular: 400,

            body2: {
                fontFamily: 'RunescapeBold',
                fontSize: 16
            },
            h1: {
                fontFamily: 'RuneScapeBold',
                fontSize: 32,
                color: "#b4ae1c",
                textAlign: "center",
                margin: 0,
                padding: 0,
            },
            h3: {
                fontFamily: 'RuneScapeBold',
                fontSize: "16",
                display: "block"
            }
        },
        components: {
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent",
                        width: "100%",

                        "&:before": {
                            borderBottom: "1px solid white",
                        },

                        "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "1px solid white",
                        },

                        "&:after": {
                            borderBottom: "2px solid white",
                        },
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontFamily: 'RunescapeBold',
                        fontSize: 18,
                        color: "white",
                        "&.Mui-focused": {
                            color: "yellow",
                        }
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: 'RunescapeBold',
                        fontSize: 16,
                        border: "1px solid white",
                        width: "100%",
                        height: "100%",
                        color: "white",
                        minWidth: "165px",
                        minHeight: "50px"
                    }
                }
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        width: "100%",
                    }
                }
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: "#640393",
                    }
                }
            },
            MuiStack: {
                styleOverrides: {
                    root: {
                        marginLeft: 0,
                    }
                }
            },
            MuiFormControl: {
                styleOverrides: {
                    root:{
                        width: "100%",
                        margin: 0,
                    }
                }
            },
            MuiSlider: {
              styleOverrides: {
                  valueLabel: {
                      fontFamily: 'RunescapePlain',
                      fontSize: 16,
                      backgroundColor: alpha('#ae4cf5', 1).toString()
                  }
              }
            },
            MuiTooltip: {
                defaultProps: {
                    enterDelay: 400,
                    leaveDelay: 0,
                    enterNextDelay: 300,
                    enterTouchDelay: 400,
                    leaveTouchDelay: 0
                },
                styleOverrides: {
                    tooltip: {
                        fontSize: 16,
                        backgroundColor: alpha('#ae4cf5', 1).toString()
                    }
                }
            }
        },
    });

  return (
      <ThemeProvider theme={theme}>
          <Container maxWidth={"lg"}>
              <Typography variant={"h1"}>Nex Loot Simulator</Typography>
              <InputBox />
              <DisplayContainer />
          </Container>
      </ThemeProvider>
  );
}

export default App
