import React, { useState, useEffect } from "react";
import Repos from "../Repos/Repos";
import Repo from "../Repo/Repo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form:{
    display: 'flex',
  },
  search:{
    margin: 10,
  },
  card:{
    margin: 20,
  },
  avatar: {
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [error, setError] = useState(null);

  console.log(name,avatar,repos)

  const setData = ({ login, avatar_url, repos }) => {
    setName(login);
    setAvatar(avatar_url);
    setRepos(repos)
  };


  // prends en charge quand on appuie sur le boutton
  async function handleSubmit(e) {
    e.preventDefault();
    if(searchInput.trim()){
      try {
        const userRes = await fetch(`https://api.github.com/users/${searchInput.trim()}`);
        const userData = await userRes.json();
        const reposRes = await fetch(
          `https://api.github.com/users/${searchInput.trim()}/repos`
        );
        const reposData = await reposRes.json();
  
        if (userData.message) {
          setError(userData.message);
        } else {
          
          setData({...userData, repos: reposData});
        }
      } catch (error) {
        setData({login:"", avatar_url:"", repos:[]});
        setSelectedRepo(null);
        console.log(error);
      }
    }else {
      setData({login:"", avatar_url:"", repos:[]});
      setSelectedRepo(null);
    }
  }

  function onUnselectRepo() {
    setSelectedRepo(null);
  }

  function handleSearchChange(event) {
    setSearchInput(event.target.value);
  }

  return (
    <Box className={classes.root}>
      <div className="search">
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="standard-required"
            label="Username"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <Button className={classes.search} onClick={handleSubmit} variant="contained">
            Search
          </Button>
        </form>
      </div>
      {name&&<Card className={classes.card}>
        <CardHeader title={name} avatar={<Avatar src={avatar} className={classes.avatar} />}>

        </CardHeader>
        <CardContent>
        {selectedRepo ? (
                    <Repo selectedRepo={selectedRepo} unselectRepo={onUnselectRepo}/>
                  ) : (
                    <Repos setSelectedRepo={setSelectedRepo} repos={repos} />
                  )}
        </CardContent>
      </Card>}
    </Box>
  );
}
