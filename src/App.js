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
            {name:"MegaPlaylist",songs:[{name:"all song",duration:433323},{name:"cool song",duration:43345},{name:"zubi song",duration:543345}]}]
    }
}


class Filter extends Component{
    handelchange =(event)=>{
        this.props.onTextChange(event.target.value)


    }
    render(){
        return(
            <div style={defaultStyle}>
                <img/>
                <input onKeyUp={this.handelchange} type="text"/>
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
                <h3>{this.props.playlist.name}</h3>
                <ul>
                    {this.props.playlist.songs.map(song=>{
                        return <li>{song.name}</li>
                    })}
                </ul>
            </div>

        )
    }
}
class App extends Component {
    constructor(props){
        super(props)
        this.state = {serverData: {},
        filterString:""}
    }
    componentDidMount(){
        setTimeout(()=>{this.setState({serverData:fakeServerData})}
        ,3000)
        setTimeout(()=>{this.setState({filterString:"cool"})},
            4000)

    }
  render() {
    return (
      <div className="App" style={defaultColor}>
          {this.state.serverData.user ?
              <div>
                  <h1 style={{...defaultStyle, "font-size": "54px"}}> {this.state.serverData.user.name}' playlist</h1>
                  <PlaylistCounter playlists={this.state.serverData.user.playlists}/>

                  <HoursCounter playlists={this.state.serverData.user.playlists}/>

                  <Filter onTextChange={text => this.setState({filterString: text})}/>
                  {this.state.serverData.user.playlists.filter(playlist=>{
                      return playlist.name.toLowerCase().includes(this.state.filterString.toLocaleLowerCase())
                      }

                  ).map(playlist => {
                      return <Playlist playlist={playlist}/>
                  })}
              </div> : <h2 style={defaultStyle}>Loading ...</h2>
          }
      </div>
    );
  }
}

export default App;
