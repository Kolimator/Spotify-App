import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom'
import './App.css';
import queryString from "query-string"
import {FormGroup,FormControl,InputGroup,Glyphicon} from "react-bootstrap"
import PlaylistOverview from "./PlaylistOverview"
import ArtistSearch from "./ArtistSearch"
import ButtonLogin from "./ButtonLogin"
import {CSSTransition} from "react-transition-group"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faArrowCircleRight,faArrowCircleDown,faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel,faArrowCircleRight,faArrowCircleDown,faSearch)


let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

}

class OverView extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);

        let accessToken = parsed.access_token;
        if (!accessToken) return;

        fetch("https://api.spotify.com/v1/me", {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => response.json()).then(userInformation =>  { let overinfo = userInformation

                 this.setState({overinfo:overinfo})}

            )
    }
    render(){
        console.log(this.state.overinfo)
        let overinfo = this.state.overinfo
        return(<div>
            {this.state.overinfo ? <div className="user-profile">
                <img className="user-img" src={overinfo.images[0].url}/>
                <div>Type of accout:{overinfo.product}</div>
                <div>Country: {overinfo.country}</div>
                <div>Number of followers:{overinfo.followers.total}</div>

            </div> :<div>Unload</div>}
        </div>)
    }
}





class App extends Component {
    togglePlaylist = ()=>{
        this.setState({showPlaylist:!this.state.showPlaylist})
        console.log(this.state.showPlaylist)
    }
    toggleArtist = ()=>{
        this.setState({showArtist:!this.state.showArtist})
        console.log(this.state.showArtist)
    }
    constructor(props){
        super(props)
        this.state = {serverData: {},
        filterString:"",
            showPlaylist : false,
            showArtist : false
        }
    }
    componentDidMount(){
        let parsed = queryString.parse(window.location.search);


        let accessToken = parsed.access_token;
        console.log(accessToken)
        console.log(accessToken +  "parsed tokken")

        if(!accessToken) return;




        fetch(	"https://api.spotify.com/v1/me",{
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => response.json()
        ).then(data => this.setState({user:
                {name:data.display_name}
        })
        );
    }

  render() {

    return (
      <div className="App" style={defaultColor}>
          {this.state.user ?

                  <div>
                      <h2> Witaj {this.state.user.name}</h2>
                      <OverView/>
                      <div className="PlaylistButton" onClick={this.togglePlaylist}  >{(this.state.showPlaylist) ? <FontAwesomeIcon style={{"float":"left"}} icon="arrow-circle-down" />:<FontAwesomeIcon style={{"float":"left"}} icon="arrow-circle-right" /> }Yours playlist</div>

                      <PlaylistOverview user={this.state.user} playlist={this.state.playlists} show={this.state.showPlaylist} />
                      <div className="ArtistButton" onClick={this.toggleArtist}>{(this.state.showArtist) ? <FontAwesomeIcon style={{"float":"left"}} icon="arrow-circle-down" />:<FontAwesomeIcon style={{"float":"left"}} icon="arrow-circle-right" /> } Find your favourite artist</div>

                      <ArtistSearch show={this.state.showArtist}/>



                  </div>


                   : <ButtonLogin/>
          }
      </div>
    );
  }
}

export default  App;
