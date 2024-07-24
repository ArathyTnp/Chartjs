
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function BarChart() {
  const [chart, setChart] = useState([]);

  const baseUrl = "https://api.coinranking.com/v2/coins";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "coinrankingb541199fae9895747291ac25bb8011901a91216a48f57029";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(`${proxyUrl}${baseUrl}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`,
            'Access-Control-Allow-Origin': '*',
          },
        });

        console.log(response.data);
        const coins = response.data.data.coins.slice(0, 10); // Fetch only the first 10 coins
        setChart(coins);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stacked : true,
        ticks: {
          font: {
            size: 9, //change font size for y axix
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 9,//change font size for y axix
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
          },
        },
      },
    },
  };

  const data = {
    labels: chart.map(x => x.name) || [],
    datasets: [{
      label: `${chart.length || 0} coins available`,
      data: chart.map(x => x.price) || [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className="w-72 h-80 p p-4 border  ">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Bar Graph</h3>
    <div className="w-full h-60  flex items-center justify-center ">
    <Bar options={options} data={data} />
    </div>
  </div>
  );
}

export default BarChart;
