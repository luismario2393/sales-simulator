import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

import * as styles from "./styled";

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
}

export const Sidebar: FC<Props> = ({ open, handleDrawerClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h5">Panel de ventas</Typography>
        </Box>

        <styles.ListContainer>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/dashbord">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Estadisticas"} />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/sales">
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={"Ventas"} />
            </ListItem>
          </Link>

          <Divider />
        </styles.ListContainer>
      </Box>
    </Drawer>
  );
};
