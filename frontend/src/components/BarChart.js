import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BarChart = ({ data, options = {} }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Clicks",
            backgroundColor: "#03A9F4",
            borderColor: "#01579B",
            barThickness: "flex",
            maxBarThickness: 100,
            data: data.data,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
              },
            },
          ],
        },
      },
      plugins: [
        {
          afterDraw: function (chart) {
            if (chart.data.datasets[0].data.every((item) => item === 0)) {
              let ctx = chart.chart.ctx;
              let width = chart.chart.width;
              let height = chart.chart.height;

              chart.clear();
              ctx.save();
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText("No data to display", width / 2, height / 2);
              ctx.restore();
            }
          },
        },
      ],
    });
    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;
