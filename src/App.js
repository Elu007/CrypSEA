import './App.css'
import { Route, Routes } from "react-router-dom"
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import About from './components/About';
import Navbar from './components/Navbar';
import News from './components/News';
import Contact from './components/Contact';
import Product from './components/Product';
import CoinPage from './components/CoinPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='/home' exact element={<Home/>}/>
      <Route path="/coins/:id" exact element={<CoinPage/>} />
      <Route path='/blogs' exact element={<Blog/>}/>
      <Route path='/about' exact element={<About/>}/>
      <Route path='/news' exact element={<News/>}/>
      <Route path='/product' exact element={<Product/>}/>
      <Route path='/contact' exact element={<Contact/>}/>
     </Routes>
      <Footer/>
    </div>
  );
}

export default App;
