import { useCallback, FC } from "react";

import { formatPercentage } from "../../utils";
import { BarChart, PieChart } from "./components";
import * as styled from "./styled";
import { IDashbord, Data } from "../../interface";

export const Payment: FC<IDashbord> = ({ totalSales, data }) => {
  let dataPayments: number[] = [];
  let dataPaymentsPercentage: number[] = [];

  const totalPayments = useCallback((value: string, data: Data[]) => {
    const payments = data.map((sale) => sale.payments);
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
  }, []);

  const findPayments = (values: Data[]) => {
    const findElement = Object.values(
      values
        .map((value) => value.payments.map(({ type }) => type))
        .flat()
        .filter((type, index, self) => self.indexOf(type) === index)
    );

    return findElement;
  };

  findPayments(data).map((payment) =>
    dataPayments.push(totalPayments(payment, data))
  );

  findPayments(data).map((payment) =>
    dataPaymentsPercentage.push(
      formatPercentage(totalPayments(payment, data), totalSales, 0)
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
          labels={findPayments(data)}
          title="Total ventas por metodo de pago"
          labelDataSet="Ventas por metodo de pago"
        />

        <PieChart
          dataNum={dataPaymentsPercentage}
          labels={findPayments(data)}
          labelDataSet={"Porcentaje de ventas por  metodo de pago"}
          title={"Porcentaje de ventas por  metodo de pago"}
        />
      </styled.MuiBox>
    </>
  );
};
