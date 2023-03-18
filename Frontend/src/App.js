import logo from './logo.svg';
import './App.css';
import Register from './components/2-register';
import Homepage from './components/home';
import BasicExample from './components/Navbar';
import ChooseSecioty from './components/choose';
import LoginPage from './components/1-login';
import {Route,Routes} from "react-router-dom"
import OrderDetails2 from './components/3-DetailsVolunteering';
import GridComplexExample from './components/4-addVolunteer';
import SearchVolunteering from './components/6-searchVolunteer';

function App() {
  return (
    <div>
         <BasicExample />
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="register" element={<Register />}/>
        <Route path='/search' element={<SearchVolunteering/>}/>
      </Routes>
    

    </div>
  );
}

export default App;

