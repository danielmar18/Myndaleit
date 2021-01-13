//Sækja gögn frá React og Material UI
import React, { Component } from 'react';
import { Pagination } from '@material-ui/lab';

//Sækja eigin gögn
import { getImages, getImagesByPage } from './services/imageServices';
import InputForm from './components/inputComponent/inputComponent';
import Images from './components/imagesComponent/imagesComponent';
import logo from './assets/logo.png';
import './App.css';


class App extends Component {

  //Constructa klasan og bý til state með default stillingu á gögnum
  constructor() {
    super();
    this.state = {
      images: [],
      searchTerm: '',
      page: 1
    }
  }

  //Fall sem er skotið inn í InputForm componentinn til að fá gildi leitarorðsins tilbaka
  //Uppfærir state-ið með leitarorðinu og sækir gögnin í API-inn í gegnum getImg-fallið
  inputCallback = (inputCallbackData) => {
    this.setState({searchTerm: inputCallbackData});
    this.getImg(inputCallbackData);
  }

  //Sækir fyrstu síðu af myndum eftir leitarorðinu í API-inn í gegnum service fall
  getImg = async (searchTerm) => {
    let imageData = await getImages(searchTerm);
    this.setState({
      images: imageData
    });
  }

  //Þetta fall hefði getað verið 2 föll en er of stutt til að réttlæta það fyrir mér
  //Höndlar breytinguna á síðuskiptum, tekur við númeri síðu og breytir því í viðeigandi startpunkt.
  //Sendir leitarorð og startpunkt á service-fall sem sækir viðeigandi síðu í API-inn
  handleChange = async (event, value) => {
    console.log(value);
    const pageNr = (value-1)*10+1;
    let imageData = await getImagesByPage(this.state.searchTerm, pageNr);
    this.setState({
      images: imageData
    });
  }

  render () {
    return (
      <div>
        <div>
          <img src={logo} alt="Logo" className="image" onClick={() => {
            //Þetta gerir notanda kleyft að smella á "home" takkann og tæma síðuna. Endurstillir state-ið að mestu leyti
            // this.getImg('');
            this.setState({
              images: [],
              searchTerm: ''
            });
          }}/>
        </div>
        <div className="form">
          <InputForm parentCallback={this.inputCallback} />
        </div>
        <div>
          <Images imagesData={this.state.images} />
        </div>
        <div >
          { 
          //Þessi kóðablokk sett til að tryggja að síðuskipting komi ekki fyrr en gögn eru komin á síðuna
          this.state.searchTerm && (<Pagination count={10} className="pagination" siblingCount={0} onChange={this.handleChange}/>)
          }
        </div>
      </div>
    )
  }
}

export default App;
