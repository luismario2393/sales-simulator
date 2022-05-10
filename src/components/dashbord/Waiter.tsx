import { useCallback, FC } from "react";

import { formatPercentage } from "../../utils";
import { BarChart, PieChart } from "./components";
import * as styled from "./styled";
import { IDashbord, Data } from "../../interface";

export const Waiter: FC<IDashbord> = ({ totalSales, data }) => {
  let dataWaiters: number[] = [];
  let dataWaitersPercentage: number[] = [];

  const totalwaiters = useCallback((value: string, data: Data[]) => {
    const waiters = data
      .filter((sale) => sale.waiter === value)
      .reduce((acc, w) => acc + w.total, 0);

    return waiters;
  }, []);

  const findWaiters = (values: Data[]) => {
    const findElement = Object.values(
      values
        .map((sale) => sale.waiter)
        .filter((waiter, index, self) => self.indexOf(waiter) === index)
    );

    return findElement;
  };

  findWaiters(data).map((waiter) =>
    dataWaiters.push(totalwaiters(waiter, data))
  );

  findWaiters(data).map((waiter) =>
    dataWaitersPercentage.push(
      formatPercentage(totalwaiters(waiter, data), totalSales, 0)
    )
  );

  return (
    <>
      <styled.MuiTypography variant="h6">
        Ventas por Meseros
      </styled.MuiTypography>
      <styled.MuiBox>
        {" "}
        <BarChart
          dataNum={dataWaiters}
          labels={findWaiters(data)}
          title="Total ventas por meseros"
          labelDataSet="Ventas por meseros"
        />
        <PieChart
          dataNum={dataWaitersPercentage}
          labels={findWaiters(data)}
          labelDataSet={"Porcentaje de ventas meseros"}
          title={"Porcentaje de ventas meseros"}
        />
      </styled.MuiBox>
    </>
  );
};
