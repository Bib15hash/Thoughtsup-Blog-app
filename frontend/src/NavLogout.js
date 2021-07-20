import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import {AppBar,IconButton,Typography,Button,Toolbar,makeStyles} from '@material-ui/core';
import {GoogleLogout} from 'react-google-login';
import {LoginContext} from './Contexts/LoginContext';

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    },

    fName: {
        position: 'relative',
        right: '0.5rem',
        fontSize: '16px',
        fontWeight: '600'
    },

    user: {
        fontSize: '17px',
        fontWeight: 'normal',
        position: 'relative',
        left: '-0.8em'
    }
})


const NavLogout = () => {

    const key = process.env.REACT_APP_API_KEY

    const {loggedIn,setLoggedIn,currentUser} = useContext(LoginContext)
    const history = useHistory();

    const classes = useStyles();

    const fname = currentUser.givenName

    const handleSuccessLogout = (res) => {
        setLoggedIn(false);
        alert('Logged out successfully.')
        history.push('/')
    }

    const handleFailureLogout = (res) => alert('Logout failed');

    const handleNewPost = () => {
        history.push('/compose')
    }

    console.log('type of fname', typeof fname)

    return (
        <div>
                {/* <NavLogout /> */}
                <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Typography className={classes.title}  Typography variant="h6">
                    Thoughts up!
                </Typography>
              
                <Typography className={classes.user} variant="h6">User:</Typography>
                <Typography className={classes.fName}>{fname}</Typography>

                <Button color="inherit" onClick={handleNewPost}>New Post<CreateIcon/></Button>

                <GoogleLogout 
                clientId={key}
                render={renderProps => (
                    <Button color="inherit" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Button>
                )}
                buttonText="Logout"
                onLogoutSuccess={handleSuccessLogout}
                onFailure={handleFailureLogout}
                />
                </Toolbar>
                </AppBar>
            </div>
    )
}

export default NavLogout;