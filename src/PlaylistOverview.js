import React,{Component} from "react"
import PlaylistCounter from "./PlaylistCounter";
import HoursCounter from "./HoursCounter";
import Filter from "./Filter";
import Playlist from "./Playlist";
import queryString from "query-string";

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
            filterString: "",
            accessToken:this.props.token
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.token !== prevProps.token){
             return this.setState({accessToken:this.props.token})
        }

    }
    componentDidMount(){
        let parsed = queryString.parse(window.location.search);

        let accessToken = parsed.access_token;
        if(!accessToken) return;

        fetch(	"https://api.spotify.com/v1/me/playlists",{
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response => response.json())
            .then(playlistData => {
                let playlists = playlistData.items;
                console.log(playlists);
                let trackDataPromises = playlists.map(playlist =>{
                    let responsePromise = fetch(playlist.tracks.href,{headers: {
                            'Authorization': 'Bearer ' + accessToken}


                    });
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





    render(){
        let displaySetting;
        if(this.props.show){
            displaySetting={display:"block"}
        }else{
            displaySetting={display:"none"}
        }

        let playlistToRender = this.state.user && this.state.playlists ? this.state.playlists.filter(playlist=>{
            let matchesPlaylist = playlist.name.toLowerCase().includes(this.state.filterString.toLocaleLowerCase())
            let matchesSong =playlist.songs.find(song =>song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
            return matchesPlaylist || matchesSong
        }) : [];
        return(
            <div style={displaySetting}>
                <h1 style={{...defaultStyle, "font-size": "54px"}}> Yours  playlist</h1>


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