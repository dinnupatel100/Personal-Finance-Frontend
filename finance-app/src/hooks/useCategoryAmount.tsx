import { useEffect, useState } from "react";
import { useGetAllCategory } from "./component";
import axios from "axios";
import { ITransaction } from "../types/type";
import { handleFilterChange } from "../helper/util";

interface IChartData {
  category: string;
  amount: number;
}

export const useCategoryAmount = (frequency:string) => {
  const { data: allcategory } = useGetAllCategory();
  const token = localStorage.getItem("token");
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    if (allcategory !== undefined) {
      const fetchData = async () => {
        const promises = allcategory.map(async (category) => {
          try {
            const {data} = await axios.get(
              process.env.REACT_APP_BASE_URL +
                "/api/getonetransaction?category=" +
                category.categoryname,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            // const filteredData = handleFilterChange(frequency, res.data);
            let amount = 0;
            const transactions = data || [] as (ITransaction[]);
            transactions.forEach((item: ITransaction) => {
              amount += item.amount;
            });
            return { category: category.categoryname, amount: amount };
          } catch {
            return null;
          }
        });

        const newData = await Promise.all(promises);
        const filteredData = newData.filter((item) => item !== null) as {
          category: string;
          amount: number;
        }[];
        setChartData(filteredData);
      };

      fetchData();
    }
  }, [allcategory,token]);

  return chartData;
};