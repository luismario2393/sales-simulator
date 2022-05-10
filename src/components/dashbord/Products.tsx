import { useContext, useCallback } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { SalesContext } from "../../context";
import { BarChart, PieChart } from "./components";

export const Products = ({ totalSales }: { totalSales: number }) => {
  const sales = useContext(SalesContext);

  let dataProducts: number[] = [];
  let dataProductsPercentage: number[] = [];

  const totalProducts = useCallback(
    (value: string) => {
      const products = sales.map((sale) => sale.products);
      const productsName = products.map((product) =>
        product.filter((p) => p.name === value)
      );

      const result = Object.values(
        productsName.map((product) =>
          product.reduce((acc, p) => acc + p.price * p.quantity, 0)
        )
      );

      const total = result.reduce((acc, p) => acc + p, 0);

      return total;
    },
    [sales]
  );

  const findProducts = () => {
    const findElement = Object.values(
      sales
        .map((sale) => sale.products.map((product) => product.name))
        .flat()
        .filter((name, index, self) => self.indexOf(name) === index)
    );

    return findElement;
  };

  findProducts().map((product) => dataProducts.push(totalProducts(product)));

  findProducts().map((product) =>
    dataProductsPercentage.push(
      formatPercentage(totalProducts(product), totalSales, 0)
    )
  );

  return (
    <>
      <styled.MuiTypography variant="h6" isGreen>
        Ventas por Productos
      </styled.MuiTypography>
      <styled.MuiBox>
        <BarChart
          dataNum={dataProducts}
          labels={findProducts()}
          title="Total ventas por productos"
          labelDataSet="Ventas por productos"
          isGreen
        />

        <PieChart
          dataNum={dataProductsPercentage}
          labels={findProducts()}
          labelDataSet={"Porcentaje de ventas productos"}
          title={"Porcentaje de ventas productos"}
          isGreen
        />
      </styled.MuiBox>
    </>
  );
};
