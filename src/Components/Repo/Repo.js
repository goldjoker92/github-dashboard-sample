import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid,Card, Typography, Link } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Badge from '@material-ui/core/Badge';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
  button: {},
  revenir:{
      margin: 10
  },
  gridItemRows:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
  },
  gridItem:{
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center'
  },
  card: {
    padding: 10,
  },
}));

const Repo = ({ unselectRepo, selectedRepo }) => {
  const classes = useStyles();
  const date = moment(selectedRepo.created_at);

  return (
    <Box>
      <Button
      size={'small'}
        className={classes.revenir}
        onClick={unselectRepo}
        variant="contained"
      >
        Revenir
      </Button>
      <Card className={classes.card}>
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography style={{ color: "#000000" }}>
            {selectedRepo.name}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
            <CalendarTodayIcon style={{marginRight: 5}} size="small"/> 
          <Typography style={{ color: "#000000" }}>
          {date.format("DD/mm/yyyy")}
          </Typography>
        </Grid>

        <Grid item xs={6} className={classes.gridItemRows}>
        <Typography style={{ marginBottom:10,color: "#000000" }}>
            Languages
        </Typography>
        <Chip label={selectedRepo.language} />
        </Grid>
        <Grid item xs={6} className={classes.gridItemRows}>
        <Typography style={{ marginBottom:10,color: "#000000" }}>
            Stars
        </Typography>
        <Badge invisible={false} badgeContent={selectedRepo.stargazers_count||0}>
        <StarBorderIcon/>
        </Badge>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
        <Typography style={{ color: "#000000" }}>
          {selectedRepo.description}
        </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
            <Link target={"_blank"} href={selectedRepo.html_url}>
        <Typography style={{ color: "#000000" }}>
          View on github
        </Typography>
            </Link>
        </Grid>
      </Grid>
      </Card>
    </Box>
  );
};

export default Repo;
