import React,{Component} from "react"
import PlaylistCounter from "./PlaylistCounter";
import HoursCounter from "./HoursCounter";
import Filter from "./Filter";
import Playlist from "./Playlist";

let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

};

class PlaylistOverview extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user,
            playlists:this.props.playlist,
            filterString: ""
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.playlist !== prevProps.playlist){
            this.setState({playlists:this.props.playlist})
        }

    }


    render(){
        let playlistToRender = this.state.user && this.state.playlists ? this.state.playlists.filter(playlist=>{
            let matchesPlaylist = playlist.name.toLowerCase().includes(this.state.filterString.toLocaleLowerCase())
            let matchesSong =playlist.songs.find(song =>song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
            return matchesPlaylist || matchesSong
        }) : [];
        return(
            <div>
                <h1 style={{...defaultStyle, "font-size": "54px"}}> {this.state.user.name}' playlist</h1>


                <PlaylistCounter playlists={playlistToRender}/>

                <HoursCounter playlists={playlistToRender}/>

                <Filter onTextChange={text => this.setState({filterString: text})}/>
                {playlistToRender.map(playlist =>{
                    return <Playlist playlist={playlist}/>
                })}

            </div>
        )
    }

}

export default PlaylistOverview