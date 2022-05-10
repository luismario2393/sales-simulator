import { FC } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Data } from "../../interface";
import { TimeDetails } from "./Timer";
import { changeFormat } from "../../utils";

export interface Props {
  open: boolean;
  onClose: () => void;
  detailData: Data[];
}

export const Modal: FC<Props> = ({ onClose, open, detailData }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>Detalle de la venta</DialogTitle>
      <DialogContent>
        {detailData.map(
          ({
            id,
            cashier,
            waiter,
            zone,
            table,
            diners,
            products,
            payments,
            total,
            date_closed,
            date_opened,
          }) => (
            <Box
              key={id}
              sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Typography variant="caption">
                <span style={{ fontWeight: "bold" }}>Id: </span> {id}
              </Typography>

              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography variant="caption">
                  <span style={{ fontWeight: "bold" }}>Cajero(a): </span>{" "}
                  {cashier}
                </Typography>
                <Typography variant="caption">
                  <span style={{ fontWeight: "bold" }}>Mesero(a): </span>{" "}
                  {waiter}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ display: "flex", gap: "4px" }}
              >
                <span style={{ fontWeight: "bold" }}>
                  Duracion de la venta:
                </span>{" "}
                <TimeDetails
                  dateOpened={date_opened}
                  dateClosed={date_closed}
                />
              </Typography>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography variant="caption">
                  <span style={{ fontWeight: "bold" }}>Zona: </span> {zone}
                </Typography>
                <Typography variant="caption">
                  <span style={{ fontWeight: "bold" }}>Mesa: </span> {table}
                </Typography>
                <Typography variant="caption">
                  <span style={{ fontWeight: "bold" }}>
                    Numero de clientes:{" "}
                  </span>{" "}
                  {diners}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Producto(s):
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "90px 90px 90px 90px",
                  gap: "8px",
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  Nombre
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  Cantidad
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  Precio
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  Subtotal
                </Typography>
              </Box>

              {products.map(({ name, price, quantity }, index) => {
                const subtotal = price * quantity;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "90px 90px 90px 90px",
                      gap: "8px",
                    }}
                  >
                    <Typography variant="caption">{name}</Typography>
                    <Typography variant="caption" sx={{ paddingLeft: "24px" }}>
                      {quantity}
                    </Typography>
                    <Typography variant="caption">
                      $ {changeFormat(price)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                      $ {changeFormat(subtotal)}
                    </Typography>
                  </Box>
                );
              })}
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Metodo(s) de pago:
              </Typography>
              {payments.map(({ amount, type }, index) => (
                <Box key={index}>
                  <Typography variant="caption">
                    <span style={{ fontWeight: "bold" }}>{type} : </span> ${" "}
                    {changeFormat(amount)}
                  </Typography>
                </Box>
              ))}
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Total de la venta: </span>{" "}
                $ {changeFormat(total)}
              </Typography>
            </Box>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
