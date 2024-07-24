import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [data, setData] = useState({
    datasets: [{
      data: [],
      backgroundColor: [
        "rgb(160, 222, 225)",
        "rgb(105, 131, 212)",
      ],
      cutout: '65%', // Inner radius
      radius: '100%' // Outer radius
    }],
    labels: [],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 9, 
          },
        },
      },
    },
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart) {
      const { ctx, data } = chart;
      const sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
      if (chart.getDatasetMeta(0).data.length > 0) {
        const { x, y } = chart.getDatasetMeta(0).data[0];
        ctx.save();
        ctx.font = "bolder 15px san-serif";
        ctx.fillStyle = '#5278A9';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Sum: ${sum}`, x, y);
        ctx.restore();
      }
    },
  };

  const doughnutLabelsLine = {
    id: 'doughnutLabelsLine',
    afterDraw(chart) {
      const { ctx, chartArea: { width, height } } = chart;
  
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition();
  
          // Draw line
          const halfwidth = width / 2;
          const halfheight = height / 2;
  
          const xLine = x >= halfwidth ? x + 15 : x - 15;
          const yLine = y >= halfheight ? y + 15 : y - 15;
          const extraLine = x >= halfwidth ? 15 : -15;
  
          // Line
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.strokeStyle = dataset.backgroundColor[index];
          ctx.stroke();
  
          // Display user ID
          ctx.fillStyle = '#000'; // Black color for ID
          ctx.font = '10px Arial bolder';
          ctx.textAlign = x >= halfwidth ? 'left' : 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(` ${chart.data.datasets[0].data[index]}`, xLine + extraLine, yLine);
        });
      });
    },
  };
  
  //api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data.slice(0, 2); // First 2 users

        const chartData = {
          datasets: [{
            data: users.map(user => user.id),
            backgroundColor: [
              "rgb(160, 222, 225)",
              "rgb(105, 131, 212)",
            ],
          }],
          labels: users.map(user => user.name),
        };

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-72 h-72 p-4 border bg-white">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Doughnut Chart</h3>
      <div className="w-full h-full flex items-center justify-center">
        <Doughnut
          data={data}
          options={options}
          plugins={[textCenter, doughnutLabelsLine]} 
        />
      </div>
    </div>
  );
}

export default DoughnutChart;
