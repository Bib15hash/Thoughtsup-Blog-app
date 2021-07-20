import React,{useState,useContext} from "react";
import { LoginContext } from "./Contexts/LoginContext";
import {Redirect, useHistory} from 'react-router-dom';
import {TextField,makeStyles,Button,AppBar,Toolbar,IconButton,Typography,Input} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { GoogleLogout} from "react-google-login";
import axios from 'axios';
import Nav from './Nav'
import NavLogout from "./NavLogout";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles({

    title: {
        flexGrow: 1
    },

    form: {
        marginLeft: "5rem"
    },
    
    textField: {
        width: "80%"
    },

    button: {
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
        marginBottom: '3rem'
    },

});

const Compose = (props) => {
    
    const key = process.env.REACT_APP_API_KEY

    const {setLoggedIn,currentUser} = useContext(LoginContext);

    const history = useHistory();
    
    const classes = useStyles();  

    const [blog, setBlog] = useState({
        title: "",
        content: "",
        user: "",
        image: ""
    });

    // const [image,setImage] = useState(null)

    blog.user = currentUser.name;

    const handleChange = (e) => {
        const {name,value} = e.target;
        setBlog((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleImage = (e) => {
        const {name} = e.target
        const file = e.target.files[0];
        // setImage(file)
        console.log(file)
        setBlog((prevValue) => {
            return {
                ...prevValue,
                [name]: file
            }
        })
    }
    
    const handleSubmit = () => {


        const formData = new FormData();
        formData.append('title',blog.title);
        formData.append('content',blog.content);
        formData.append('user',blog.user);
        formData.append('image',blog.image);

        axios.post('http://localhost:8000/post', formData)
        .then((res) => {
            console.log("Post created successfully", res);
            alert('Post created successfully')
            history.push('/')

        }) 
        .catch((err) => {
            console.log('message',err)
        })

    };

    const handleSuccessLogout = (res) => {
        setLoggedIn(false);
        alert('Logged out successfully.')
    }

    const handleFailureLogout = (res) => alert('Logout failed');

    console.log(blog)

    return (
        <div>

        { props.auth ? 
            <div>
                {/* <NavLogout /> */}
                <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Typography className={classes.title}  Typography variant="h6">
                    Thoughts up!
                </Typography>

                <Button color="inherit" >New Post<CreateIcon/></Button>

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
            
            <div className={classes.form}>

            
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <h2>Title</h2>
            
                <TextField onChange={handleChange} value={blog.title} name="title" className={classes.textField} placeholder="Enter your title" id="outlined-basic" variant="outlined" />
            
                <h2>Description</h2>
            
                <TextField onChange={handleChange} value={blog.content} name="content" className={classes.textField} placeholder="Enter your description" id="outlined-basic" variant="outlined" multiline rows={20}/>
            
                
                <h2>Add a cover photo</h2>
                
                
                <input onChange={handleImage} name="image" type="file" />

                
                {/* <Button type="submit" className={classes.button} variant="contained" color="primary" size="small">Upload</Button> */}
            
            
            <Button type="submit" className={classes.button} variant="contained" color="primary" size="small">Create Post</Button>

            </form>
            
            </div>
            
            </div>
            
            : 
            
            <Redirect to="/" />    
        }
        
    </div>
    )
};

export default Compose;