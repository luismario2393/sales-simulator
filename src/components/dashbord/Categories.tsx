import { useCallback, FC } from "react";

import { formatPercentage } from "../../utils";
import { BarChart, PieChart } from "./components";
import { Data, IDashbord } from "../../interface";
import * as styled from "./styled";

export const Categories: FC<IDashbord> = ({ totalSales, data }) => {
  let dataCategories: number[] = [];
  let dataCategoriesPercentage: number[] = [];

  const totalCategories = useCallback((value: string, data: Data[]) => {
    const products = data.map((sale) => sale.products);
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
  }, []);

  const findCategories = (values: Data[]) => {
    const findElement = Object.values(
      values
        .map((value) => value.products.map((product) => product.category))
        .flat()
        .filter((category, index, self) => self.indexOf(category) === index)
    );

    return findElement;
  };

  findCategories(data).map((category) =>
    dataCategories.push(totalCategories(category, data))
  );

  findCategories(data).map((category) =>
    dataCategoriesPercentage.push(
      formatPercentage(totalCategories(category, data), totalSales, 0)
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
          labels={findCategories(data)}
          title="Total ventas por categorias"
          labelDataSet="Ventas por categorias"
        />

        <PieChart
          dataNum={dataCategoriesPercentage}
          labels={findCategories(data)}
          labelDataSet={"Porcentaje de ventas categorias"}
          title={"Porcentaje de ventas categorias"}
        />
      </styled.MuiBox>
    </>
  );
};
