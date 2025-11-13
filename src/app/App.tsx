import '../css/App.css'
import '../css/Fonts.css'
import './components/Display/CollectionLog/CollectionLog.css'
import './components/Display/ItemsList/ItemLog.css'
import InputBox from "./components/Controls/InputBox.tsx";
import DisplayContainer from "./components/Display/DisplayContainer.tsx";
import Box from "@mui/material/Box";
import TitleBox from "./components/Display/Title/TitleBox.tsx";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {

    const theme = createTheme({
        palette: {
            text: {
                primary: "#ffffff",
                secondary: "#fff500"
            }
        },
        typography: {
            fontFamily: 'RunescapePlain',
            fontSize: 18
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "& fieldset": {
                            borderColor: "white",
                        },
                        "&:hover fieldset": {
                            borderColor: "lightgray",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white",
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: "white",
                    },
                },
            },
        },
    });

  return (
      <ThemeProvider theme={theme}>
          <Box>
              <TitleBox></TitleBox>
              <Box className="outer_app_container">
                  <Box className="inner_app_box">
                      <InputBox />
                      <DisplayContainer />
                    </Box>
              </Box>
          </Box>
      </ThemeProvider>
  );
}

export default App
