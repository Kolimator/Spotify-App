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
            <div style={defaultStyle}>
                <img/>
                <input onKeyUp={this.handelchange} type="text"/>
                Filter

            </div>
        )
    }
}

export default Filter