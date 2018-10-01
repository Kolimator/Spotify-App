import React,{Component} from "react"

let defaultColor = {color:"white"}
let defaultStyle={
    color: defaultColor,

};

class Playlist extends Component{


    render(){
        return(
            <div style={{...defaultStyle,display: "inline-block", width:"25%"}}>
                <img src={this.props.playlist.imageUrl} style={{width: "160px"}}/>
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

export default Playlist