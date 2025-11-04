import './App.css'
import InputBox from "./components/Controls/InputBox.tsx";
import ItemGridUI from "./components/Display/ItemGridUI.tsx";
import ItemStats from "./components/Display/Stats.tsx";

function App() {
  return (
      <>
          <InputBox />
          <ItemGridUI/>
          <ItemStats/>
      </>
  );
}

export default App
