import { FC } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

interface Props {
  handleDrawerOpen: () => void;
}

export const Navbar: FC<Props> = ({ handleDrawerOpen }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <Typography variant="h5" sx={{ color: "white" }}>
            Ventas trimestrales
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
