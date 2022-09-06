import React,{useState,useEffect} from 'react'
import Movie from "./components/Movie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';
const App = () => {
 const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=1b7c076a0e4849aeefd1f3c429c99a36";
 const [movies,setMovies] = useState([]);
 const [query,SetQuery]   = useState('');
 const API_Search = "https://api.themoviedb.org/3/search/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&query"
  
 useEffect(()=>{
     fetch(API_URL)
     .then((res)=>res.json())
     .then((data)=>{
        setMovies(data.results);
     })

 },[])

 const searchMovie = async(e)=>{
       e.preventDefault();
       try{
           const url = `https://api.themoviedb.org/3/search/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&query=${query}`;
           const res = await fetch(url);
           const data = await res.json();
           setMovies(data.results);
       }
       catch{
           return e;
       }
 }

 const changeHandler = (e)=>{
    SetQuery(e.target.value);
 }
  
  return (
     <div>
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/home">Netflix App</Navbar.Brand>
        <Navbar.Brand href="/home">Trending</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav 
            className="me-auto my-2 my-lg-3"
            style={{maxHeight:'100px'}}
            navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
   
     {
      movies.length > 0 ? (
      <div className="container">
         <div className="grid"> 
            {movies.map((movieReq)=><Movie key = {movieReq.id} {...movieReq} />)}
        </div>
        </div>):
        (
        <h2 className='text-black my-5 text-center'>Can't find movie in the Application</h2>) 
     }       
     </div>
  )
}

export default App