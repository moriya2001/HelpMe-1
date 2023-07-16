import React from "react";
import {useNavigate} from "react-router-dom";
import "./HomePageBefore.css";
import helpIMg from "../images/Help-Me.png";

const STYLE = {
    backgroundImage: `url(${helpIMg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
};
const HomePageBefore = () => {
    const navigate = useNavigate()
    const login = () => {
        navigate("/login")

    }
    return (
        <div className="homePage1" className={'min-vh-100'}
             style={STYLE}>
            <button className="btn btn-primary"
                    onClick={login}>כניסה
            </button>
        </div>
    )
}
export default HomePageBefore
