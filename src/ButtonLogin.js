import {Component} from "react"
import React from "react";


let defaultColor = {color:"white"};
let defaultStyle={
    color: defaultColor,

}


class ButtonLogin extends Component {
    render(){
        return <button onClick={() => {
            window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://spotify-backend-superapp.herokuapp.com/login"
        }
        }
                      style={{...defaultStyle,"padding":"20px" , "font-size":"54px", "position":"fixed", "top":"20%",}}>Login into spotify</button>
    }
}

export default ButtonLogin