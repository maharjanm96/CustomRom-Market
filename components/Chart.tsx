"use client";

import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Rom {
  name: string;
  sold: number;
}

interface LineChartProps {
  roms: Rom[];
}

const LineChart: React.FC<LineChartProps> = ({ roms }) => {
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;

    if (!ctx) return;

    // Destroy any existing chart instance before creating a new one
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Create the line chart
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: roms.map((rom) => rom.name),
        datasets: [
          {
            label: "Sold",
            data: roms.map((rom) => rom.sold),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.3, // More pronounced curves
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Sold",
            },
            grid: {
              color: "rgba(75, 192, 192, 0.2)", // Light grid lines
            },
          },
          x: {
            title: {
              display: true,
              text: "ROM Names",
            },
          },
        },
        elements: {
          line: {
            tension: 0.4, // Increase to make the line "bouncier"
          },
        },
      },
    });

    // Cleanup function to destroy chart on unmount or when data changes
    return () => {
      chart.destroy();
    };
  }, [roms]);

  return <canvas id="myChart" width={400} height={200} />;
};

export default LineChart;

