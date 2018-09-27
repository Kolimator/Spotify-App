import React, { Component } from 'react';
import './App.css';
import queryString from "query-string"

let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

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
                <img src={this.props.playlist.image} style={{width: "160px"}}/>
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
        let parsed = queryString.parse(window.location.search);

        let accessToken = parsed.access_token;


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
        }).then(response => response.json()
        ).then(data => this.setState({
            playlists:data.items.map(
                item =>({
                    name:item.name,
                    image:item.images[0].url,
                    songs:[]
                })
            )
        }))




    }

  render() {
        let playlistToRender = this.state.user && this.state.playlists ? this.state.playlists.filter(playlist=>{
            return playlist.name.toLowerCase().includes(this.state.filterString.toLocaleLowerCase())
        }) : [];
    return (
      <div className="App" style={defaultColor}>
          {this.state.user ?
              <div>
                  <h1 style={{...defaultStyle, "font-size": "54px"}}> {this.state.user.name}' playlist</h1>


                  <PlaylistCounter playlists={playlistToRender}/>

                  <HoursCounter playlists={playlistToRender}/>

                  <Filter onTextChange={text => this.setState({filterString: text})}/>
                  {playlistToRender.map(playlist =>{
                      return <Playlist playlist={playlist}/>
                  })}

              </div> : <button onClick={()=>{window.location="http://localhost:8888/login"}} style={{...defaultStyle,"padding":"20px" , "font-size":"54px", "position":"fixed", "top":"20%",}}>Login into spotify</button>
          }
      </div>
    );
  }
}

export default App;
