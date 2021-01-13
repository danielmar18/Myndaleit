//Sækja g0ön frá React
import React, { Component } from 'react';

//Sækja eigin gögn
import './styles.css'


//Tekur við leitarorði frá notanda og "skilar" því til aðalsíðunnar
class InputForm extends Component {

    //Constructa klasan, bý til state með default stillingu á gögnum og bind-a handlerana
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Fall sem sendir leitarorðið aftur á "foreldrið" eða aðalsíðuna þegar leitarorð er staðfest
    sendData = () => {
        this.props.parentCallback(this.state.value);
    }

    //Fall sem höndlar staðfestingu á leitarorði
    handleSubmit(event){
        this.sendData();
        event.preventDefault();
    }

    //Fall sem höndlar breytinguna í leitarboxinu
    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Sláðu inn leitarorð:
                    <input type="text" onChange={this.handleChange} className="form-control" />
                </label>
                <input type="submit" value="Leita" className="submitButton"/>
            </form>
        );
    }
}

export default InputForm;

