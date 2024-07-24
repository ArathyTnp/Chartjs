import React from 'react';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

function Card() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className=" min-w-[150px] max-w-[300px]">
        {/* <DoughnutChart /><BarChart/> */}
        <LineChart/>
      </div>
      <div className=" min-w-[150px] max-w-[300px]">
        {/* <DoughnutChart /><BarChart/> <LineChart/> */}
        <DoughnutChart />
      </div>
      <div className=" min-w-[150px] max-w-[300px]">
        {/* <DoughnutChart /><BarChart/> <LineChart/> */}
        <BarChart/>
      </div>
      <div className=" min-w-[150px] max-w-[300px]">
        {/* <DoughnutChart /><BarChart/> <LineChart/> */}
        <DoughnutChart />
      </div>
    </div>
  );
}

export default Card;
