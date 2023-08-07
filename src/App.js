import './App.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import smapleImage1 from './srcImage/sample1.jpg';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let [click, setClick] = useState(2);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main shoes={shoes} setShoes={setShoes} navigate={navigate} click={click} setClick={setClick}></Main>} />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/about' element={<About />}>
          <Route path='/about/location' element={<div>회사 위치 정보</div>} />
          <Route path='/about/member' element={<div>사원 정보</div>} />
        </Route>
        <Route path='*' element={<div>page not found</div>} /> 
      </Routes>
      {/* <Button onClick={()=>}>더 보기</Button> */}

    </div>
  );
}
function Main(props) {
  return (
    <>
      <div className='mainBackground' style={{ backgroundImage: 'url(' + smapleImage1 + ')' }}></div>
      <div className='container'>
        <div className='row'>
          {
            props.shoes.map((item, index) => {
              return (
                <>
                  <Card shoes={item} index={index} navigate={props.navigate}></Card>

                </>
              )
            })
          }
        </div>
      </div>
      <Button onClick={() =>
        axios.get(`https://codingapple1.github.io/shop/data${props.click}.json`).then((data) => {
          props.setShoes(props.shoes.concat(data.data));
          props.setClick(props.click++);
        })
          .catch(() => {
            console.log('실패함')
          })}>더 보기</Button>
    </>
  )
}

function Card(props) {
  let imgSrc = `https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg`
  return <>
    <div className='col-md-4' onClick={() => props.navigate('/detail')}>
      <img src={imgSrc} width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <span>{props.shoes.price}</span>
    </div>
  </ >
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
