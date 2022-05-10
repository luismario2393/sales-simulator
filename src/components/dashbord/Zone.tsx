import { FC, useCallback } from "react";

import { formatPercentage } from "../../utils";
import { BarChart, PieChart } from "./components";
import * as styled from "./styled";
import { IDashbord, Data } from "../../interface";

export const Zone: FC<IDashbord> = ({ totalSales, data }) => {
  let dataZone: number[] = [];
  let dataZonePercentage: number[] = [];

  const totalZone = useCallback((value: string, data: Data[]) => {
    const zone = data
      .filter((sale) => sale.zone === value)
      .reduce((acc, z) => acc + z.total, 0);

    return zone;
  }, []);

  const findZone = (values: Data[]) => {
    const findElement = Object.values(
      values
        .map((sale) => sale.zone)
        .filter((zone, index, self) => self.indexOf(zone) === index)
    );

    return findElement;
  };

  findZone(data).map((zone) => dataZone.push(totalZone(zone, data)));

  findZone(data).map((zone) =>
    dataZonePercentage.push(
      formatPercentage(totalZone(zone, data), totalSales, 0)
    )
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
          labels={findZone(data)}
          title="Total ventas por productos"
          labelDataSet="Ventas por productos"
          isGreen
        />
        <PieChart
          dataNum={dataZonePercentage}
          labels={findZone(data)}
          labelDataSet={"Porcentaje de ventas productos"}
          title={"Porcentaje de ventas productos"}
          isGreen
        />
      </styled.MuiBox>
    </>
  );
};
