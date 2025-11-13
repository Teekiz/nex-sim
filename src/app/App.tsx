import '../css/App.css'
import '../css/Fonts.css'
import './components/Display/CollectionLog/CollectionLog.css'
import './components/Display/ItemsList/ItemLog.css'
import InputBox from "./components/Controls/InputBox.tsx";
import DisplayContainer from "./components/Display/DisplayContainer.tsx";
import Box from "@mui/material/Box";
import TitleBox from "./components/Display/Title/TitleBox.tsx";

function App() {
  return (
      <Box>
          <TitleBox></TitleBox>
          <Box className="outer_app_container">
              <Box className="inner_app_box">
                  <InputBox />
                  <DisplayContainer />
                </Box>
          </Box>
      </Box>
  );
}

export default App
