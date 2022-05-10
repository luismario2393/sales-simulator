import { useState, useContext, useEffect, ChangeEvent } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { SalesContext } from "../../context";
import * as styles from "./styled";
import { Data } from "../../interface";
import { Modal } from "../modal";
import { changeFormat } from "../../utils";

interface Column {
  id: "id" | "zone" | "products" | "table" | "typePayments" | "total";
  label: string;
  minWidth?: number;
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 100,
    format: (value: string) => value.slice(0, 8),
  },
  { id: "zone", label: "Zona", minWidth: 100 },
  {
    id: "products",
    label: "Productos",
    minWidth: 100,
  },
  {
    id: "table",
    label: "Mesa",
    minWidth: 100,
  },
  {
    id: "typePayments",
    label: "Metodo de pago",
    minWidth: 100,
  },
  {
    id: "total",
    label: "Total",
    minWidth: 100,
    format: (value: number) => `$ ${changeFormat(value)}`,
  },
];

interface DataTransformed {
  id: string;
  zone: string;
  products: string;
  table: number;
  typePayments: string;
  total: number;
}

export const Sales = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataTransformed[]>([]);
  const [detailData, setDetailData] = useState<Data[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [transformedSales, setTransformedSales] = useState<DataTransformed[]>(
    []
  );

  const sales = useContext(SalesContext);

  useEffect(() => {
    const transformedSales = sales.map((sale) => {
      return {
        id: sale.id,
        zone: sale.zone,
        products: `${
          sale.products.length > 1
            ? `${sale.products[0].name} +${sale.products.length - 1} `
            : sale.products[0].name
        } `,
        table: sale.table,
        typePayments: sale.payments[0].type,
        total: sale.total,
      };
    });
    setTransformedSales(transformedSales);
  }, [sales]);

  useEffect(() => {
    if (search === "") {
      setData(transformedSales);
    } else if (search.length > 0) {
      const filteredSales = transformedSales.filter((sale) => {
        return (
          normalizeText(sale.id).includes(search) ||
          normalizeText(sale.zone).toLowerCase().includes(search) ||
          normalizeText(sale.typePayments).toLowerCase().includes(search)
        );
      });
      setData(filteredSales);
    }
  }, [search, transformedSales]);

  const DetailSale = (id: string) => {
    const detailSales = sales.filter((sale) => {
      return sale.id === id;
    });
    setDetailData(detailSales);
  };

  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}
      >
        <styles.SearchContainer>
          <SearchIcon />
          <styles.inputSearch
            type="text"
            placeholder="Buscar..."
            onChange={handleSearch}
          />
        </styles.SearchContainer>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpen(true);
                        DetailSale(row.id);
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Modal open={open} onClose={handleClose} detailData={detailData} />
      </Paper>
    </>
  );
};
