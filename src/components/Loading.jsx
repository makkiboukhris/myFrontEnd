import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const Loading = () => {
    const useStyles = makeStyles((theme) => ({
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        },
      }));
      const classes = useStyles();
  return (
    <div>
      <h1>
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      </h1>
    </div>
  );
};

export default Loading;
