import {Component} from "react";
import React from "react";

let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

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

export default HoursCounter