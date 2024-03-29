import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, CardBody, CardHeader, Heading} from '@chakra-ui/react';
import { useCategoryAmount } from '../../hooks/useCategoryAmount';

const CategoryPieChart = ({ frequency }:{frequency:string}) => {
  const chartData = useCategoryAmount(frequency);

  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.data = chartData;
  
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "category";
  
    // Return a cleanup function to destroy the chart instance when component unmounts
    return () => {
      chart.dispose();
    };
  }, [chartData]);
  

  return (
    <div className='mt-20 flex ml-16 w-screen'>
    <Card bgColor='whitesmoke' width='40%'>
        <CardHeader>
          <Heading size='md' textAlign='center'>Category-wise</Heading>
        </CardHeader>
        <CardBody>
          <div id='chartdiv' className='h-48'></div>
        </CardBody>
    </Card>
    </div>
  );
};

export default CategoryPieChart;
