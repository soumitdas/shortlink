import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const DoughnutChart = ({ data, options = {} }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data.data,
            backgroundColor: [
              "#01579B",
              "#0277BD",
              "#0288D1",
              "#039BE5",
              "#03A9F4",
              "#29B6F6",
              "#4FC3F7",
              "#81D4FA",
              "#B3E5FC",
              "#E1F5FE",
            ],
            // backgroundColor: [
            //   "#EDE7F6",
            //   "#D1C4E9",
            //   "#B39DDB",
            //   "#9575CD",
            //   "#7E57C2",
            //   "#673AB7",
            //   "#5E35B1",
            //   "#512DA8",
            //   "#4527A0",
            //   "#311B92",
            // ],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: data.labels,
      },
      options: { responsive: true },
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

  return <canvas ref={chartRef}></canvas>;
};

export default DoughnutChart;
