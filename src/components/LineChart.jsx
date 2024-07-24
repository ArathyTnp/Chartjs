
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import financialData from './data';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart() {
  const financials = financialData.financialreport[0].financials;

  const labels = financials.map(entry => entry.date);
  const revenueData = financials.map(entry => entry.revenue);
  const expensesData = financials.map(entry => entry.expenses);
  const profitsData = financials.map(entry => entry.profits);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        borderColor: 'rgba(75, 192, 192, 1)',
        //backgroundColor: 'rgba(75, 192, 192, 0.2)',
       // fill: true,
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgba(255, 99, 132, 1)',
        //backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //fill: true,
      },
      {
        label: 'Profits',
        data: profitsData,
        borderColor: 'rgba(54, 162, 235, 1)',
        //backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          font: {
            size: 9, // Change font size for y axis
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 9, // Change font size for x axis
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: 'Financial Report for 2021',
      },
    },
  };
  

  return (
   
    <div className="w-72 h-80 p-4 border  ">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Line Graph</h3>
    <div className="w-full  h-60  flex items-center justify-center ">
   
    <Line options={options} data={data} />
    </div>
  </div>
  )
}

export default LineChart;