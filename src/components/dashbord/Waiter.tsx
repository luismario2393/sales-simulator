import { useContext, useCallback } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { SalesContext } from "../../context";
import { BarChart, PieChart } from "./components";

export const Waiter = ({ totalSales }: { totalSales: number }) => {
  const sales = useContext(SalesContext);

  let dataWaiters: number[] = [];
  let dataWaitersPercentage: number[] = [];

  const totalwaiters = useCallback(
    (value: string) => {
      const waiters = sales
        .filter((sale) => sale.waiter === value)
        .reduce((acc, w) => acc + w.total, 0);

      return waiters;
    },
    [sales]
  );

  const findWaiters = () => {
    const findElement = Object.values(
      sales
        .map((sale) => sale.waiter)
        .filter((waiter, index, self) => self.indexOf(waiter) === index)
    );

    return findElement;
  };

  findWaiters().map((waiter) => dataWaiters.push(totalwaiters(waiter)));

  findWaiters().map((waiter) =>
    dataWaitersPercentage.push(
      formatPercentage(totalwaiters(waiter), totalSales, 0)
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
          labels={findWaiters()}
          title="Total ventas por meseros"
          labelDataSet="Ventas por meseros"
        />
        <PieChart
          dataNum={dataWaitersPercentage}
          labels={findWaiters()}
          labelDataSet={"Porcentaje de ventas meseros"}
          title={"Porcentaje de ventas meseros"}
        />
      </styled.MuiBox>
    </>
  );
};
