import { useState } from "react";
import "../App.css";
import LogarithmicSlider from "./LogarithmicSlider";
import chevLeft from "./chev_left.png";
import chevRight from "./chev_right.png";
import HistogramChart from './HistogramChart';
import SidePanel from "./SidePanel";

export default function HistogramApp() {
  const [histogramSize, setHistogramSize] = useState<number>(10);
  const [selectedBar, setSelectedBar] = useState<number[]>([11.00001, 169133, 6]);
  const handleSliderChange = (newValues: {
    position: number;
    value: number;
  }) => {
    // Update the histogram size in the state
    setHistogramSize(newValues.value);
    console.log(newValues);
  };
  const handleBarSelect = (barData: number[]) => {
    // Do something with the selected bar data, e.g., update state
    setSelectedBar(barData);
  };
  return (
    <div className="histoApp">
      <div className="d1">
        <img style={{ maxHeight: 80 }} src={chevLeft}></img>
        <span className="question">
          Question n°38 : Que faudrait-il faire pour rendre la fiscalité plus
          juste ?
        </span>
        <img style={{ maxHeight: 80 }} src={chevRight}></img>
      </div>
      <div className="d2">
        <HistogramChart histogramSize={histogramSize}
          onBarSelect={handleBarSelect}></HistogramChart>
      </div>
      <div className="d3">
        <h3>Précision de l'analyse</h3>
        <LogarithmicSlider
          onChange={handleSliderChange}
          minval={2}
          maxval={100}
          sliderWidth="700px"
        ></LogarithmicSlider>
        <div className="small-big-container">
          <div className="small">Rapide</div>
          <div className="big">Précise</div>
        </div>{" "}
      </div>
      <div className="d4">
        <SidePanel selectedBar={selectedBar}
          histogramSize={histogramSize}></SidePanel>
      </div>
    </div>
  );
}
