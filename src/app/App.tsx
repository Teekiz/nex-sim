import '../css/App.css'
import '../css/Fonts.css'
import './components/Display/CollectionLog/CollectionLog.css'
import './components/Display/ItemsList/ItemLog.css'
import InputBox from "./components/controls/InputBox.tsx";
import DisplayContainer from "./components/Display/DisplayContainer.tsx";
import TitleBox from "./components/Display/Title/TitleBox.tsx";
import {Container, createTheme, ThemeProvider} from "@mui/material";

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
            fontSize: 16
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
            }
        },
    });

  return (
      <ThemeProvider theme={theme}>
          <Container maxWidth={"lg"}>
              <TitleBox></TitleBox>
              <InputBox />
              <DisplayContainer />
          </Container>
      </ThemeProvider>
  );
}

export default App
