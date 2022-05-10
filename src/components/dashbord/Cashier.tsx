import { useContext, useCallback } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { SalesContext } from "../../context";
import { BarChart, PieChart } from "./components";

export const Cashier = ({ totalSales }: { totalSales: number }) => {
  const sales = useContext(SalesContext);

  let dataCashier: number[] = [];
  let dataCashierPercentage: number[] = [];

  const totalwaiters = useCallback(
    (value: string) => {
      const Cashiers = sales
        .filter((sale) => sale.cashier === value)
        .reduce((acc, c) => acc + c.total, 0);

      return Cashiers;
    },
    [sales]
  );

  const findCashiers = () => {
    const findElement = Object.values(
      sales
        .map((sale) => sale.cashier)
        .filter((cashier, index, self) => self.indexOf(cashier) === index)
    );

    return findElement;
  };

  findCashiers().map((waiter) => dataCashier.push(totalwaiters(waiter)));

  findCashiers().map((waiter) =>
    dataCashierPercentage.push(
      formatPercentage(totalwaiters(waiter), totalSales, 0)
    )
  );

  return (
    <>
      <styled.MuiTypography variant="h6" isGreen>
        Ventas por Cajero
      </styled.MuiTypography>
      <styled.MuiBox>
        {" "}
        <BarChart
          dataNum={dataCashier}
          labels={findCashiers()}
          title="Total ventas por Cajero"
          labelDataSet="Ventas por Cajero"
          isGreen
        />
        <PieChart
          dataNum={dataCashierPercentage}
          labels={findCashiers()}
          labelDataSet={"Porcentaje de ventas Cajero"}
          title={"Porcentaje de ventas Cajero"}
          isGreen
        />
      </styled.MuiBox>
    </>
  );
};
