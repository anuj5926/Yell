import History from "./component/History";
import Home from "./component/Home";
import Number from "./component/Number";

function App() {
  return (
    <>
      <Home />
      <div className="midPart">
        <Number />
        <History />
      </div>
    </>
  );
}

export default App;
