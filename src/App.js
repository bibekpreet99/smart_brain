import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from 'clarifai'
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";


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

const initialState = {
  input: "",
  imgUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: '',
    name: "",
    email: "",
    submissions: "",
    time: ""
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  loadUser = (data)=>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        submissions: data.submissions,
        time: data.time
      }
    })
  }

  calculateFaceData= (data)=>{
    console.log(data)
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('myImg')
    const width = Number(img.width);
    const height = Number(img.height);
    return{
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    }
  }

  faceLocator = (box)=>{
    this.setState({box: box})
  }

  onInputChange = (event)=>{
    this.setState({input: event.target.value})
  }

  onButtonPress = ()=>{
    this.setState({imgUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response)=>{
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        
        })
        .then(response=>response.json())
        .then(count=>this.setState(Object.assign(this.state.user, {submissions: count})))
      }
      this.faceLocator(this.calculateFaceData(response))})
    .catch((err)=>console.log(err))
  }
  onRouteChange = (route)=>{
    if(route==='home'){
      this.setState({isSignedIn: true})
    }  
    else{
      this.setState(initialState)
    }  
    this.setState({route: route})
  }
  

  render(){
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
          this.state.route === 'home'
          ?(<div>
            <Logo />
            <Rank name={this.state.user.name} submissions={this.state.user.submissions} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonPress= {this.onButtonPress}/>
            <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
          </div>)
          :
          (this.state.route=== 'signin')
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
  )}
}

export default App;
