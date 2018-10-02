import {Component} from "react";
import React from "react";


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
            <div className="search-bar" style={defaultStyle}>

                <input  placeholder="Filter" onKeyUp={this.handelchange} type="text"/>


            </div>
        )
    }
}

export default Filter