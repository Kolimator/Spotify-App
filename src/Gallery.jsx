import React,{Component} from "react"
import "./App.css"


class Gallery extends Component{
    playAudio(previewUrl){
        let audio = new Audio(previewUrl)
        if(!this.state.playing){ audio.play()
        this.setState({playing:true,
        playingUrl:previewUrl,
        audio})}
        else {
            if(this.state.playingUrl === previewUrl){
                this.state.audio.pause()
                this.setState({playing:false})
            }
            else{
                this.state.audio.pause();
            audio.play()
            this.setState({playing:true,
            playingUrl:previewUrl,audio})}
        }

    }
    constructor(props){
        super(props)
        this.state ={
            playingUrl:"",
            audio:null,
            playing:false
        }
    }
render(){

    console.log(this.props.tracks)
    const tracks = this.props.tracks
    let GalleryElem= tracks.map((track,index)=>{
        const trackImg = track.album.images[0].url
        return(
            <div key={index} className="track" onClick={()=> this.playAudio(track.preview_url)}>
                 <img src={trackImg} className="track-img" alt="track"/>
                <div className="track-play">
                    <div className="track-play-inner">
                        {this.state.playingUrl === track.preview_url
                        ? <span>| |</span> : <span> &#9654; </span>
                        }
                    </div>
                </div>
                 <p className="track-name">{track.name}</p>
             </div>
         )
     })
    return(
        <div>
        <div className="Gallery">Galeria</div>
            <div className="Gallery-img">{GalleryElem}</div>
        </div>

    )
}
}

export default Gallery

