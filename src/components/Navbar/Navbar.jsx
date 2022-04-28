import React from "react";
import {
  AppBar,
  Badge,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#fff',
    // transform: 'translateZ(0)'
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

const Navbar = () => {
  const username = "Mukesh";
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              JWT Authentication
            </Typography>
          </Grid>
          <Grid item sm={true}></Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              Welcome {username}!
            </Typography>
            </Grid>
            <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            </Grid>
            <Grid item>
            <Button color="inherit">Logout</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
