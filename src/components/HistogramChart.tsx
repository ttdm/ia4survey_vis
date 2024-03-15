import React, { useEffect, useRef, useState } from 'react';
import data from './histogram_data.json';

interface HistogramChartProps {
    histogramSize: number;
    onBarSelect: (selectedBar: number[]) => void;
}

const HistogramChart: React.FC<HistogramChartProps> = ({ histogramSize, onBarSelect }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedBar, setSelectedBar] = useState<number>(-1);
    const [locked, setLock] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Read relevant data based on histogramSize
        const relevantData = data[histogramSize - 1];

        // Set up variables for drawing
        var maxy = relevantData.reduce((cmax, [, y]) => Math.max(cmax, y), 0);
        const histoWidth = 22. / histogramSize;
        const barWidth = histoWidth * 50; // Adjust as needed
        const maxBarHeight = 700; // Adjust as needed

        // write the legend
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'right'
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${data[0][0][1]} réponses`, 0, canvas.height - 730);
        // draw the scale
        const possibleScaleJumps: number[] = [1000., 2000., 5000., 10000., 20000., 1000000]
        var jumpId = 0;
        while (possibleScaleJumps[jumpId + 1] * 4 < maxy) jumpId++;
        for (var i = 1; i < 5; i++) {
            const yval = i * possibleScaleJumps[jumpId];
            const ycanva = yval / maxy * maxBarHeight
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - ycanva);
            ctx.lineTo(canvas.width, canvas.height - ycanva);
            ctx.strokeStyle = '#ee4b2b'; // Adjust the color as needed
            ctx.stroke();
            ctx.fillStyle = '#ee4b2b';
            ctx.fillText(`${yval}`, 20, canvas.height - ycanva - 10);
        }

        // Calculate x-coordinate and draw bars
        relevantData.forEach(([x, y]: number[], id: number) => {
            const barHeight = (y / maxy) * maxBarHeight; // Adjust for proportional height
            const xPos = id * barWidth; // 

            // Draw rectangle
            ctx.fillStyle = 'grey'; // Adjust color as needed
            if (id === selectedBar) ctx.fillStyle = 'orange';
            if (id === selectedBar && locked) ctx.fillStyle = '#ee4b2b';
            ctx.fillRect(xPos + 100, canvas.height - barHeight, barWidth - 1, barHeight);
        });
    }, [histogramSize, locked, selectedBar]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (locked) return; // move priority is below click and lock

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - 100;
        if (mouseX < 0) {
            setSelectedBar(-1);
            onBarSelect(data[0][0]);
            return;
        }

        // Determine which bar is under the mouse
        const barIndex = Math.floor(mouseX / (22.0 / histogramSize * 50));
        setSelectedBar(barIndex);

        // Send information about the selected bar to the parent component
        onBarSelect(data[histogramSize - 1][barIndex]);
    };

    const handleMouseLeave = () => {
        if (locked) return; // move priority is below click and lock
        setSelectedBar(-1);
        onBarSelect(data[0][0]);
    };


    const handleBarClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - 100;

        if (mouseX < 0) return;

        // Determine which bar is clicked
        const clickedBar = Math.floor(mouseX / (22.0 / histogramSize * 50));


        // there is 1 boolean states plus 1 int state checked for equality
        // so 4 possible combinations : 
        if (!locked) { // if we are not locked, on click we always lock a new bar
            setLock(true);
            setSelectedBar(clickedBar);
            onBarSelect(data[histogramSize - 1][clickedBar]);
        } else {
            // if we are locked, if the clicked bar is the locked bar, we unlock
            if (clickedBar === selectedBar) setLock(false);
            else { // else we locked the new bar. 
                setSelectedBar(clickedBar);
                onBarSelect(data[histogramSize - 1][clickedBar]);
            }
        }
    };

    return <canvas ref={canvasRef}
        width={1200}
        height={750}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleBarClick}></canvas>;
};

export default HistogramChart;