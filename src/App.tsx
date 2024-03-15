import "./App.css";
import HistogramApp from "./components/HistogramApp";

function App() {
  return (
    <div className="App">
      <div className="title">
        <div className="title-text">
          <strong>IA4SURVEY</strong> - analyse par IA des consultations
          citoyennes
        </div>
      </div>
      <HistogramApp></HistogramApp>
    </div>
  );
}

export default App;
