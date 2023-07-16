import './App.css';
import Register from './components/2-register';
import UserHomepage from './components/7-UserHome';
import BasicExample from './components/Navbar';
// import ChooseSecioty from './components/choose';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/1-login';
import {Route, Routes} from "react-router-dom"
//fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css';

import OrderDetails2 from './components/3-DetailsVolunteering';
import GridComplexExample from './components/4-addVolunteering';
import SearchVolunteering from './components/6-searchVolunteer';
import AddVolunteering from './components/4-addVolunteering';
import VolunteeringTable from './components/9-volunteeringTable';
import HomeDirector from './components/8-homeDirector';
import User from './components/10-users';
import HomePageBefore from './components/HomePageBefore';
import Definitions from './components/Definitions';
import UpdateProfil from './components/UpdateProfile';
import MyVolunteerings from './components/11-myVolunteerings';
import DefinitionsDirector from './components/DefinitionDirector';
import Volunteers from './components/Volunteers';
import {Row} from "react-bootstrap";

function App() {
    return (
        <div className="App min-vh-100">
            <Row>
                <BasicExample/>
            </Row>
            <Row>
                <Routes>
                    <Route path="/" exact element={<HomePageBefore/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/updateProfile" element={<UpdateProfil/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="/homeUser" element={<UserHomepage/>}/>
                    <Route path="homeDirector" element={<HomeDirector/>}/>
                    <Route path='/search' element={<SearchVolunteering/>}/>
                    <Route path='/Definitions' element={<Definitions/>}/>
                    <Route path='/DefinitionsDirector' element={<DefinitionsDirector/>}/>

                    <Route path='addVolunteering' element={<AddVolunteering/>}/>
                    <Route path='volunteeringTable' element={<VolunteeringTable/>}/>
                    <Route path='myVolunteerings' element={<MyVolunteerings/>}/>
                    <Route path='volunteers' element={<Volunteers/>}/>

                    <Route path='users' element={<User/>}/>
                </Routes>

                {/* <AddVolunteering /> */}
            </Row>
        </div>
    );
}

export default App;

