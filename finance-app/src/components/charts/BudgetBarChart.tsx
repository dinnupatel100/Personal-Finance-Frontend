import { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { CategoryAxis, ValueAxis, ColumnSeries, Legend } from '@amcharts/amcharts4/charts';
import { CardHeader, CardBody, Card, Heading } from '@chakra-ui/react';
import { useCategoryAmount } from '../../hooks/useCategoryAmount';
import { useGetAllBudget } from '../../hooks/component';
import { chartObject } from '../../types/type';

const BudgetBarChart = () => {
  const chartData = useCategoryAmount('week');
  const budgetData = useGetAllBudget();
  const data: chartObject[] = [];
  if(budgetData.data)
    budgetData.data.forEach((budget)=> {
      chartData.forEach((chart)=> {
        if(budget.category === chart.category) {
          data.push({category: chart.category, totalBudget: budget.amount, totalSpend: chart.amount})
        }
      })
  })
  
  useEffect(() => {
    // Create chart instance
    const chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.data = data;

    // Create axes
    const categoryAxis = chart.xAxes.push(new CategoryAxis());
    categoryAxis.dataFields.category = "category";

    const valueAxis = chart.yAxes.push(new ValueAxis());
    valueAxis.title.text = "Amount";

    // Create series
    const series1 = chart.series.push(new ColumnSeries());
    series1.dataFields.valueY = "totalBudget";
    series1.dataFields.categoryX = "category";
    series1.name = "Total Budget";

    const series2 = chart.series.push(new ColumnSeries());
    series2.dataFields.valueY = "totalSpend";
    series2.dataFields.categoryX = "category";
    series2.name = "Total Spend";

    // Add tooltips
    series1.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series1.columns.template.tooltipY = 0;

    series2.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series2.columns.template.tooltipY = 0;

    // Add legend
    chart.legend = new Legend();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <Card bgColor='whitesmoke' width='100%' height="100%">
      <CardHeader>
        <Heading size='md' textAlign='center'>Budget-wise</Heading>
      </CardHeader>
      <CardBody>
        <div id="chartdiv2" className="mx-auto" style={{width:"100%", height:"300px", marginTop:"80px"}}></div>
      </CardBody>
    </Card>
  );
}

export default BudgetBarChart;

