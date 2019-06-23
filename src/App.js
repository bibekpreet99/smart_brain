import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import "tachyons"
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from 'clarifai'


const app = new Clarifai.App({
  apiKey: 'd4ed804d96aa489fa7435e43fadf8938'
})

const particlesOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    events: {
        onhover: {
            enable: true,
            mode: "repulse"
        }
    }
}
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: "",
      imgUrl: ""
    }
  }

  onInputChange = (event)=>{
    this.setState({input: event.target.value})
  }

  onButtonPress = ()=>{
    this.setState({imgUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonPress= {this.onButtonPress}/>
        <FaceRecognition imgUrl={this.state.imgUrl}/>
      </div>
  )}
}

export default App;
