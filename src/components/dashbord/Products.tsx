import { useCallback, FC } from "react";

import { formatPercentage } from "../../utils";
import * as styled from "./styled";
import { BarChart, PieChart } from "./components";
import { IDashbord, Data } from "../../interface";

export const Products: FC<IDashbord> = ({ totalSales, data }) => {
  let dataProducts: number[] = [];
  let dataProductsPercentage: number[] = [];

  const totalProducts = useCallback((value: string, data: Data[]) => {
    const products = data.map((sale) => sale.products);
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
  }, []);

  const findProducts = (values: Data[]) => {
    const findElement = Object.values(
      values
        .map((value) => value.products.map((product) => product.name))
        .flat()
        .filter((name, index, self) => self.indexOf(name) === index)
    );

    return findElement;
  };

  findProducts(data).map((product) =>
    dataProducts.push(totalProducts(product, data))
  );

  findProducts(data).map((product) =>
    dataProductsPercentage.push(
      formatPercentage(totalProducts(product, data), totalSales, 0)
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
          labels={findProducts(data)}
          title="Total ventas por productos"
          labelDataSet="Ventas por productos"
          isGreen
        />

        <PieChart
          dataNum={dataProductsPercentage}
          labels={findProducts(data)}
          labelDataSet={"Porcentaje de ventas productos"}
          title={"Porcentaje de ventas productos"}
          isGreen
        />
      </styled.MuiBox>
    </>
  );
};
