import './App.css'
import InputBox from "./components/Controls/InputBox.tsx";
import ItemGridUI from "./components/Display/ItemGridUI.tsx";
import ItemStats from "./components/Display/Stats.tsx";
import ItemsReceivedList from "./components/Display/ItemsReceivedList.tsx";

function App() {
  return (
      <>
          <InputBox />
          <ItemGridUI/>
          <ItemStats/>
          <ItemsReceivedList />
      </>
  );
}

export default App
