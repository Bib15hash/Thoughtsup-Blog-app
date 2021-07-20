import React,{useState,useEffect,useContext} from 'react';
import {Redirect,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { LoginContext } from './Contexts/LoginContext';

const useStyles = makeStyles({
  
  root: {
    position: 'relative',
    top: '3rem',
    left: '2.75rem',
    margin: '2rem 2rem',
    width: 335
  },
  media: {
    height: 140,
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
},

span: {
  color: '#BEBEBE',
  paddingBottom: '2px',
  fontSize: '14px',
  position: 'relative',
  left: '4rem'
},

text: {
  marginTop: '6rem'
}
  
});

export default function MediaCard(props) {

  const {loggedIn,currentUser} = useContext(LoginContext)

  const [post,setPost] = useState({})
  const [blogPosts, setBlogPosts] = useState([]);

  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("")

  
  useEffect(() => {
    return axios.get('http://localhost:8000/post')
        .then((res) => {
          setBlogPosts(res.data)
        })
        .catch(err => console.log(err));
}, [blogPosts.length]);  

  const handleClick = (blog) => {
    axios.get(`http://localhost:8000/post/${blog._id}`)
    .then((res) => {
      setPost(res.data)
    
    })
    .catch(err => {
      console.log(err)
    });
    
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  console.log('post', post)

  return (  
    <div>

    {Object.keys(post).length === 0 && post.constructor === Object ? (
      <div>
      <TextField onChange={handleChange} className={classes.search} id="standard-basic" placeholder="Search for blogs" name="search" value={searchTerm}/>

      <SearchIcon className={classes.icon} />
                  <Grid container className={classes.grid}>
      {blogPosts.filter((blog) => {
                if (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
                    return blog;                       
            }).map((blog) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    
                  <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`http://localhost:8000/public/uploads/${blog.image}`}
          title={blog.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.title.length > 25 ? blog.title.substring(0,25) + '...' : blog.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {blog.content.length > 44 ? blog.content.substring(0,44)+ '...'  : blog.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => {
          if(!loggedIn) alert('Please login to view the complete post') 
          else {
            handleClick(blog)
          } 
        }} size="small" color="primary">
          View
        </Button>
        <Typography className={classes.span} variant="h5" color="textSecondary" component="h2">Uploaded by {blog.user}</Typography>
      </CardActions>
    </Card>
      </Grid>
                  )
            })}
  </Grid>
  <div className={classes.text}>
  </div>

      </div>
          ) :  <Redirect to={{pathname: `/post/${post._id}`}} />}
          </div> 
  );
}
