import { useContext, useCallback } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { SalesContext } from "../../context";
import { BarChart, PieChart } from "./components";

export const Categories = ({ totalSales }: { totalSales: number }) => {
  const sales = useContext(SalesContext);

  let dataCategories: number[] = [];
  let dataCategoriesPercentage: number[] = [];

  const totalCategories = useCallback(
    (value: string) => {
      const products = sales.map((sale) => sale.products);
      const categoies = products.map((product) =>
        product.filter((p) => p.category === value)
      );

      const result = Object.values(
        categoies.map((category) =>
          category.reduce((acc, p) => acc + p.price * p.quantity, 0)
        )
      );

      const total = result.reduce((acc, p) => acc + p, 0);

      return total;
    },
    [sales]
  );

  const findCategories = () => {
    const findElement = Object.values(
      sales
        .map((sale) => sale.products.map((product) => product.category))
        .flat()
        .filter((category, index, self) => self.indexOf(category) === index)
    );

    return findElement;
  };

  findCategories().map((category) =>
    dataCategories.push(totalCategories(category))
  );

  findCategories().map((category) =>
    dataCategoriesPercentage.push(
      formatPercentage(totalCategories(category), totalSales, 0)
    )
  );

  return (
    <>
      <styled.MuiTypography variant="h6" gutterBottom>
        Ventas por Categorias
      </styled.MuiTypography>
      <styled.MuiBox>
        <BarChart
          dataNum={dataCategories}
          labels={findCategories()}
          title="Total ventas por categorias"
          labelDataSet="Ventas por categorias"
        />

        <PieChart
          dataNum={dataCategoriesPercentage}
          labels={findCategories()}
          labelDataSet={"Porcentaje de ventas categorias"}
          title={"Porcentaje de ventas categorias"}
        />
      </styled.MuiBox>
    </>
  );
};
