import {Component} from "react"
import React from "react";


let defaultColor = {color:"white"};
let defaultStyle={
    color: defaultColor,

}


class ButtonLogin extends Component {
    render(){
        return<div style={defaultStyle}>
            <h1> Welcome on my Spotify api web app</h1>
            <div>This app will show your basic details, playlists and allows you to search artist and listen to his top 10 tracks</div>
            <div> To login use fake account email:wolk2018201810@gmail.com , password : random12345 or use your real account</div>

            <button style={{"font-size":"54px","margin-top":"20px"}} onClick={() => {
            window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://spotify-backend-superapp.herokuapp.com/login"}
        }
                      >Login into spotify</button>
        </div>
    }
}

export default ButtonLogin