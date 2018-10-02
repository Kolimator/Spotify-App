import React,{Component} from "react"
import "./App.css"
import {FormGroup,FormControl,InputGroup,Glyphicon} from "react-bootstrap"
import Profile from "./Profile"
import Gallery from "./Gallery"
import queryString from "query-string";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faArrowCircleRight,faArrowCircleDown,faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)

class ArtistSearch extends Component {

    handleChange = (event)=>{
        this.setState({artistSearch:event.target.value})

    }
    handleClick = ()=>{

        let parsed = queryString.parse(window.location.search);

        let accessToken = parsed.access_token;
        if(!accessToken) return;

        const BASE_URL = "https://api.spotify.com/v1/search?";
        let FETCH_URL = `${BASE_URL}q=${this.state.artistSearch}&type=artist&limit=1`;
        console.log(FETCH_URL)
        const ALBUM_URL = "https://api.spotify.com/v1/artists/"
        let myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'

        };

        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];

                this.setState({ artist });

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=PL&`
                fetch(FETCH_URL,myOptions)
                    .then(response=>response.json())
                    .then(json=>{ const tracks = json.tracks
                        console.log(tracks)
                        this.setState({tracks})

                    })
            });



    }

    handleKeyPress=(event)=>{

        if(event.key === "Enter"){
            this.handleClick()
        }
    }
    constructor(props){
        super(props)
        this.state = {artistSearch:"",
            artist: null,
            tracks:[]

        }
    }
    render(){
        let displaySetting;
        if(this.props.show){
            displaySetting={display:"block"}
        }else{
            displaySetting={display:"none"}
        }
        return(
            <div className="ShowArtist" style={displaySetting}>
                <div className="search-bar">
                    <input type="text" placeholder="search an artist..." onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <FontAwesomeIcon icon="search" onClick={this.handleClick} />
                </div>
                {this.state.artist !== null ? <div><Profile artist={this.state.artist} />
                        <Gallery tracks={this.state.tracks}/>
                    </div>
                    : <h2>Please type your favourite artist</h2>
                }

            </div>
        )
    }
}


export default ArtistSearch