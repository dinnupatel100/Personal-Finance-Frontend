import { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Card, CardBody, CardHeader, Heading} from '@chakra-ui/react';
import { useCategoryAmount } from '../../hooks/useCategoryAmount';
import { Empty } from 'antd';
import BudgetBarChart from './BudgetBarChart';

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
    <>
    { !chartData.length ? <div className='justify-center mt-32'><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div> :
    <div className='flex mb-12' >
      <div className='ml-20 mr-10 mt-10 p-0 w-7/12'>
        <BudgetBarChart/>
      </div>
      <div className='mt-10 flex ml-0 mr-10 w-5/12 h-96'>
      <Card bgColor='cornsilk' width="100%" height="72">
          <CardHeader>
            <Heading size='md' textAlign='center'>Category-wise</Heading>
          </CardHeader>
          <CardBody>
            <div id='chartdiv' className='h-48'></div>
          </CardBody>
      </Card>
      </div>
    </div>
    }
    </>

  );
};

export default CategoryPieChart;
