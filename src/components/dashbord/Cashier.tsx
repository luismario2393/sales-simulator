import { useCallback, FC } from "react";

import { formatPercentage } from "../../utils";
import { BarChart, PieChart } from "./components";
import * as styled from "./styled";
import { IDashbord, Data } from "../../interface";

export const Cashier: FC<IDashbord> = ({ totalSales, data }) => {
  let dataCashier: number[] = [];
  let dataCashierPercentage: number[] = [];

  const totalwaiters = useCallback((value: string, data: Data[]) => {
    const Cashiers = data
      .filter((sale) => sale.cashier === value)
      .reduce((acc, c) => acc + c.total, 0);

    return Cashiers;
  }, []);

  const findCashiers = (values: Data[]) => {
    const findElement = Object.values(
      values
        .map((value) => value.cashier)
        .filter((cashier, index, self) => self.indexOf(cashier) === index)
    );

    return findElement;
  };

  findCashiers(data).map((waiter) =>
    dataCashier.push(totalwaiters(waiter, data))
  );

  findCashiers(data).map((waiter) =>
    dataCashierPercentage.push(
      formatPercentage(totalwaiters(waiter, data), totalSales, 0)
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
          labels={findCashiers(data)}
          title="Total ventas por Cajero"
          labelDataSet="Ventas por Cajero"
          isGreen
        />
        <PieChart
          dataNum={dataCashierPercentage}
          labels={findCashiers(data)}
          labelDataSet={"Porcentaje de ventas Cajero"}
          title={"Porcentaje de ventas Cajero"}
          isGreen
        />
      </styled.MuiBox>
    </>
  );
};
