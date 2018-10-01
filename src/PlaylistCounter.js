import {Component} from "react";
import React from "react";

let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

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

export default PlaylistCounter