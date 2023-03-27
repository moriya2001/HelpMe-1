import logo from './logo.svg';
import './App.css';
import Register from './components/2-register';
import UserHomepage from './components/7-UserHome';
import BasicExample from './components/Navbar';
import ChooseSecioty from './components/choose';
import LoginPage from './components/1-login';
import { Route, Routes } from "react-router-dom"
import OrderDetails2 from './components/3-DetailsVolunteering';
import GridComplexExample from './components/4-addVolunteer';
import SearchVolunteering from './components/6-searchVolunteer';
import AddVolunteering from './components/4-addVolunteer';
import VolunteeringTable from './components/9-volunteeringTable';

function App() {
  return (
    <div>
      <BasicExample />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="homeUser" element={<UserHomepage />} />
        <Route path='/search' element={<SearchVolunteering />} />
        <Route path='addVolunteering' element={<AddVolunteering />} />
        <Route path='table' element={<VolunteeringTable />} />
      </Routes>

      {/* <AddVolunteering /> */}
    </div>
  );
}

export default App;

