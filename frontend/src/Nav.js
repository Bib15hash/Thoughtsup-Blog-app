
import React,{useState,useEffect,useContext} from "react";
import {LoginContext} from './Contexts/LoginContext';
import {makeStyles,AppBar, Toolbar,IconButton,Typography,Button,TextField, requirePropFactory} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import Blog from "./Blog";
import axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
import {refreshTokenSetup} from "./utils/refreshTokenSetup";
import Compose from './Compose';    
import Body from "./Body";
import { useHistory } from "react-router-dom";
import NavLogout from './NavLogout';

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    },
    search: {
        float: "right",
        marginRight: "10rem",
        position: "relative",
        top: "1.5rem"
    },
    icon: {
        float: 'right',
        position: 'relative',
        top: '2rem',
        left: '13.5rem',
        cursor: 'pointer'
    }
})

const Nav = () => {

    const key = process.env.REACT_APP_API_KEY

    const {loggedIn,setLoggedIn,setCurrentUser} = useContext(LoginContext);
    
    const classes = useStyles();
    // const [loggedIn, setLoggedIn] = useState(false);

    const [blogPosts, setBlogPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [clicked, setClicked] = useState(false);

    const history = useHistory();


    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        return axios.get('http://localhost:8000/post')
            .then(res => setBlogPosts(res.data))
            .catch(err => console.log(err));
    }, [blogPosts.length]);

    const handleSuccess = (res) => {
        setLoggedIn(true);
        setCurrentUser(res.profileObj)
        console.log('Logged in user',res.profileObj)
        refreshTokenSetup(res);
    }

    const handleFailure = (res) => console.log('Login Failed res:',res);

    const handleSuccessLogout = (res) => {
        setLoggedIn(false);
        alert('Logged out successfully.')
    }

    const handleFailureLogout = (res) => alert('Logout failed');

    const handleNewPost = () => {
        history.push('/compose')
    }


    console.log('process env',process.env)

    return (
        <div>
            {loggedIn === false ? <div><AppBar position="static">
            <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Typography className={classes.title}  Typography variant="h6">
                Thoughts up!
            </Typography>
            <GoogleLogin 
            clientId={key}
            render={renderProps => (
                <Button color="inherit" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</Button>
            )}
            buttonText="Login"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            />
            </Toolbar>
            </AppBar> 
            </div>: (
            <div>
                <NavLogout />
            </div>

            )}
                       

            <Blog />
                        

        </div>
    );
};

export default Nav;
