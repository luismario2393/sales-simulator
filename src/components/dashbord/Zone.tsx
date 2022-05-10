import { useContext, useCallback } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { SalesContext } from "../../context";
import { BarChart, PieChart } from "./components";

export const Zone = ({ totalSales }: { totalSales: number }) => {
  const sales = useContext(SalesContext);

  let dataZone: number[] = [];
  let dataZonePercentage: number[] = [];

  const totalZone = useCallback(
    (value: string) => {
      const zone = sales
        .filter((sale) => sale.zone === value)
        .reduce((acc, z) => acc + z.total, 0);

      return zone;
    },
    [sales]
  );

  const findZone = () => {
    const findElement = Object.values(
      sales
        .map((sale) => sale.zone)
        .filter((zone, index, self) => self.indexOf(zone) === index)
    );

    return findElement;
  };

  findZone().map((zone) => dataZone.push(totalZone(zone)));

  findZone().map((zone) =>
    dataZonePercentage.push(formatPercentage(totalZone(zone), totalSales, 0))
  );

  return (
    <>
      <styled.MuiTypography variant="h6" isGreen>
        Ventas por Zona
      </styled.MuiTypography>
      <styled.MuiBox>
        {" "}
        <BarChart
          dataNum={dataZone}
          labels={findZone()}
          title="Total ventas por productos"
          labelDataSet="Ventas por productos"
          isGreen
        />
        <PieChart
          dataNum={dataZonePercentage}
          labels={findZone()}
          labelDataSet={"Porcentaje de ventas productos"}
          title={"Porcentaje de ventas productos"}
          isGreen
        />
      </styled.MuiBox>
    </>
  );
};
