import { useContext, useCallback } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { SalesContext } from "../../context";
import { BarChart, PieChart } from "./components";

export const Payment = ({ totalSales }: { totalSales: number }) => {
  const sales = useContext(SalesContext);

  let dataPayments: number[] = [];
  let dataPaymentsPercentage: number[] = [];

  const totalPayments = useCallback(
    (value: string) => {
      const payments = sales.map((sale) => sale.payments);
      const paymentsName = payments.map((payment) =>
        payment.filter((p) => p.type === value)
      );

      const result = Object.values(
        paymentsName.map((payment) =>
          payment.reduce((acc, p) => acc + p.amount, 0)
        )
      );

      const total = result.reduce((acc, p) => acc + p, 0);

      return total;
    },
    [sales]
  );

  const findPayments = () => {
    const findElement = Object.values(
      sales
        .map((sale) => sale.payments.map(({ type }) => type))
        .flat()
        .filter((type, index, self) => self.indexOf(type) === index)
    );

    return findElement;
  };

  findPayments().map((payment) => dataPayments.push(totalPayments(payment)));

  findPayments().map((payment) =>
    dataPaymentsPercentage.push(
      formatPercentage(totalPayments(payment), totalSales, 0)
    )
  );

  return (
    <>
      <styled.MuiTypography variant="h6">
        Ventas por Metodo de pago
      </styled.MuiTypography>
      <styled.MuiBox>
        <BarChart
          dataNum={dataPayments}
          labels={findPayments()}
          title="Total ventas por metodo de pago"
          labelDataSet="Ventas por metodo de pago"
        />

        <PieChart
          dataNum={dataPaymentsPercentage}
          labels={findPayments()}
          labelDataSet={"Porcentaje de ventas por  metodo de pago"}
          title={"Porcentaje de ventas por  metodo de pago"}
        />
      </styled.MuiBox>
    </>
  );
};
