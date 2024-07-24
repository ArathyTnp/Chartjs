import React from 'react';
import DoughnutChart from './DoughnutChart';

function Card(props) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex-1 min-w-[150px] max-w-[300px]">
        <DoughnutChart />
      </div>
      <div className="flex-1 min-w-[150px] max-w-[300px]">
        <DoughnutChart />
      </div>
      <div className="flex-1 min-w-[150px] max-w-[300px]">
        <DoughnutChart />
      </div>
      <div className="flex-1 min-w-[150px] max-w-[300px]">
        <DoughnutChart />
      </div>
    </div>
  );
}

export default Card;

