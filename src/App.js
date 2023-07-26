import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  pageSize=9;
  
  state={progress:0}
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
        color='#0b74f1'
        progress={this.state.progress}
        height={3}
      />

      <Routes>
        <Route path="/" element={<News setProgress={this.setProgress} key='general' pageSize={this.pageSize} country='in' category='general'/>}/>
         <Route path="/sports" element={<News setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country='in' category='sports'/>}/>
         <Route path="business" element={<News setProgress={this.setProgress} key='business' pageSize={this.pageSize} country='in' category='business'/>}/>
         <Route path="entertainment" element={<News setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country='in' category='entertainment'/>}/>
         <Route path="health" element={<News setProgress={this.setProgress} key='health' pageSize={this.pageSize} country='in' category='health'/>}/>
         <Route path="science" element={<News setProgress={this.setProgress} key='science' pageSize={this.pageSize} country='in' category='science'/>}/>
         <Route path="technology" element={<News setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country='in' category='technology'/>}/>
          <Route path="*" element={<h1>This Page does not exist</h1>}/>
         <Route/>

      </Routes>
      
      </BrowserRouter>
    )
  }
}

