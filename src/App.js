import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import queryString from "query-string"
import  Filter from "./Filter.js"
import PlaylistCounter from "./PlaylistCounter.js"
import HoursCounter from "./HoursCounter.js"
import Playlist from "./Playlist.js"
import PlaylistOverview from "./PlaylistOverview"
import ArtistSearch from "./ArtistSearch"

let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

}






class App extends Component {
    constructor(props){
        super(props)
        this.state = {serverData: {},
        filterString:""}
    }
    componentDidMount(){
        let parsed = queryString.parse(window.location.search);

        let accessToken = parsed.access_token;
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

        fetch(	"https://api.spotify.com/v1/me/playlists",{
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => response.json())
            .then(playlistData => {
                let playlists = playlistData.items
                let trackDataPromises = playlists.map(playlist =>{
                   let responsePromise = fetch(playlist.tracks.href,{headers: {
                        'Authorization': 'Bearer ' + accessToken}


                    })
                       let trackDataPromise = responsePromise.then(response =>response.json())
                       return trackDataPromise
                })
                let allTrackDatasPromises= Promise.all(trackDataPromises)
                   let playlistsPromise = allTrackDatasPromises.then(trackDatas =>{
                    trackDatas.forEach((trackData,i) =>{
                        playlists[i].trackDatas = trackData.items.map(item => item.track)
                            .map(trackData =>({
                                name:trackData.name,
                                duration:trackData.duration_ms /1000

                            }))
                    })
                    return playlists

                })
                return playlistsPromise
            })
            .then(playlists => this.setState({
                playlists : playlists.map(item =>{
                console.log(item.trackDatas)
                return {
                    name:item.name,
                    imageUrl: item.images[0].url,
                    songs: item.trackDatas.slice(0,3)

                }
            }


            )
        }))




    }

  render() {

    return (
      <div className="App" style={defaultColor}>
          {this.state.user ?
              <Router>
                  <div>
              <PlaylistOverview user={this.state.user} playlist={this.state.playlists}/>
              <ArtistSearch/>
                  </div>
              </Router>
                   : <button onClick={() => {
                  window.location = window.location.href.includes("localhost")
                      ? "http://localhost:8888/login"
                      : "https://spotify-backend-superapp.herokuapp.com/login"
              }
              }
                               style={{...defaultStyle,"padding":"20px" , "font-size":"54px", "position":"fixed", "top":"20%",}}>Login into spotify</button>
          }
      </div>
    );
  }
}

export default  App;
