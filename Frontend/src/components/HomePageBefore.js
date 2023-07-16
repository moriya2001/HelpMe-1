import React from "react";
import {useNavigate} from "react-router-dom"
import "./HomePageBefore.css"

const HomePageBefore = () => {
    const navigate = useNavigate()
    const login = () => {
        navigate("/login")

    }
    return (
        <div className="homePage1">
            <button className="btn btn-primary"
                    onClick={login}>כניסה
            </button>
        </div>
    )
}
export default HomePageBefore
