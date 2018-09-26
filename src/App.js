import React, { Component } from 'react';

import './App.css';
let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

}

let fakeServerData = {
    user: {
        name: "Koli",
        playlists: [{name:"Superplaylist",songs:[{name:"yeah song",duration:433323},{name:"cool song",duration:43345},{name:"zubi song",duration:543345}]},
            {name:"Coolplylist",songs:[{name:"yeah song",duration:433323},{name:"cool song",duration:43345},{name:"zubi song",duration:543345}]},
            {name:"Duperplaylist",songs:[{name:"yeah song",duration:433323},{name:"cool song",duration:43345},{name:"zubi song",duration:543345}]},
            {name:"MegaPlaylist",songs:[{name:"yeah song",duration:433323},{name:"cool song",duration:43345},{name:"zubi song",duration:543345}]}]
    }
}


class Filter extends Component{
    render(){
        return(
            <div style={defaultStyle}>
                <img/>
                <input type="text"/>
                Filter

            </div>
        )
    }
}

class PlaylistCounter extends Component{
    render(){
        return(
            <div style={{...defaultStyle,width:"40%",display: "inline-block" }}>
                <h2 style={defaultStyle}>{this.props.playlists && this.props.playlists.length} playlists</h2>
            </div>
        )
    }
}
class HoursCounter extends Component{
    render(){
        let allSongs = this.props.playlists.reduce((songs,eachPlaylist)=>{
            return songs.concat(eachPlaylist.songs)
        },[])
        let totalDuration =allSongs.reduce((sum,eachSong)=>{
            return sum + eachSong.duration
        },0)
        return(
            <div style={{...defaultStyle,width:"40%",display: "inline-block" }}>
                <h2 style={defaultStyle}>{Math.round(totalDuration/60)} hours</h2>
            </div>
        )
    }
}


class Playlist extends Component{


    render(){
        return(
            <div style={{...defaultStyle,display: "inline-block", width:"25%"}}>
                <img/>
                <h3>Playlist Name</h3>
                <ul>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ul>
            </div>

        )
    }
}
class App extends Component {
    constructor(props){
        super(props)
        this.state = {serverData: {}}
    }
    componentDidMount(){
        setTimeout(()=>{this.setState({serverData:fakeServerData})}
        ,3000)

    }
  render() {
    return (
      <div className="App" style={defaultColor}>
          {this.state.serverData.user && <h1 style={{...defaultStyle,"font-size":"54px"}}> {this.state.serverData.user.name}' playlist</h1>}
          {this.state.serverData.user &&
              <div>
          <PlaylistCounter playlists={ this.state.serverData.user.playlists}/>
          <HoursCounter  playlists={ this.state.serverData.user.playlists}/>
              </div>}
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
      </div>
    );
  }
}

export default App;
