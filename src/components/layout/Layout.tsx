import { FC, ReactNode, useState } from "react";
import { Box } from "@mui/material";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
