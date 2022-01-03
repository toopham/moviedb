/**
 * ************************************
 *
 * @module  Search
 * @author Tu Pham
 * @date 1-3-2022
 * @description Rating component to see movie rating
 *
 * ************************************
 */

import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Rating = (props) => {
  const rate = props.rate;

  const data = [
    { title: 'One', value: `${String(rate)}`, color: '#E38627' },
    { title: 'Three', value: `${String(100-rate)}`, color: '#ffffff' },
  ];

  data[0].value = rate;
  data[1].value= 100-rate;

  if(rate >= 70 ) data[0].color = '#7bcaab';
  if(rate <70 && rate > 50) data[0].color = '#fcbf49';

  return <div className="rating">
      Rating: {props.rate}%
      <PieChart
        data={data}
        lineWidth={55}
        startAngle={0}
        animate={true}
        radius={8}
        center={[20,20]}
        viewBoxSize={[50,50]}
        />
    </div>;
};

export default Rating;