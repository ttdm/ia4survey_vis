import React, { useState } from "react";

interface LogarithmicSliderProps {
  onChange: (newValues: { position: number; value: number }) => void;
  defaultPosition?: number;
  defaultValue?: number;
  minpos?: number;
  maxpos?: number;
  minval?: number;
  maxval?: number;
  sliderWidth?: string;
}

export default function LogarithmicSlider({
  onChange,
  defaultPosition = 40,
  minpos = 0,
  maxpos = 100,
  minval = 0,
  maxval = 1000000,
  sliderWidth = "600px",
}: LogarithmicSliderProps) {
  const [position, setPosition] = useState(defaultPosition);

  const log = new LogRangeCompute({
    minpos,
    maxpos,
    minval,
    maxval,
  });

  const calculateNewValue = (position: number): number => {
    if (!position) position += 1;
    const value = log.value(position);
    if (value > 100) return Math.round(value / 10) * 10;
    return Math.round(value);
  };

  const handleMoveCursor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = Number(e.target.value);
    setPosition(newPosition);

    const newValues = {
      position: newPosition,
      value: calculateNewValue(newPosition),
    };
    onChange(newValues);
  };

  return (
    <input
      className="log-slider"
      type="range"
      min={minpos}
      max={maxpos}
      value={position}
      onChange={handleMoveCursor}
      style={{ width: `${sliderWidth}` }}
    />
  );
}

/**
 * Compute the log value of a position and the position from a logarithmic value
 * Used e.g. for the logarithmic slider
 */
class LogRangeCompute {
  private minpos: number;
  private maxpos: number;
  private minval: number;
  private maxval: number;
  private scale: number;

  constructor(props: {
    minpos: number;
    maxpos: number;
    minval: number;
    maxval: number;
  }) {
    this.minpos = props.minpos;
    this.maxpos = props.maxpos || 100;
    this.minval = Math.log(props.minval || 1); // log(0) is not defined
    this.maxval = Math.log(props.maxval || 1000000);
    this.scale = (this.maxval - this.minval) / (this.maxpos - this.minpos);
  }

  value(position: number): number {
    let formula = (position - this.minpos) * this.scale + this.minval;
    if (formula === 0) return 0; // otherwise, exp(0) = 1
    return Math.exp(formula);
  }

  position(value: number): number {
    if (value === 0) return 0;
    return this.minpos + (Math.log(value) - this.minval) / this.scale;
  }
}
