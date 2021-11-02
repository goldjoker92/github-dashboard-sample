import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
  gridItem: {
    cursor: "pointer",
  },
  card: {
    padding: 10,
  },
}));

const Repos = ({ repos, setSelectedRepo }) => {
  const classes = useStyles();
  function onClickRepo(repo) {
    return () => {
      setSelectedRepo(repo);
    };
  }

  return (
    <Grid container className={classes.grid} spacing={2}>
      {repos.map((repo) => (
        <Grid
          item
          xs={3}
          className={classes.gridItem}
          onClick={onClickRepo(repo)}
          key={repo.id}
        >
          <Card className={classes.card}>
            <Typography style={{ color: "#000" }}>{repo.name}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Repos;
