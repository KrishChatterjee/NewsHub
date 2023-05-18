import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  pageSize=9;
  render() {
    return (
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<News key='general' pageSize={this.pageSize} country='in' category='general'/>}/>
         <Route path="/sports" element={<News key='sports' pageSize={this.pageSize} country='in' category='sports'/>}/>
         <Route path="business" element={<News key='business' pageSize={this.pageSize} country='in' category='business'/>}/>
         <Route path="entertainment" element={<News key='entertainment' pageSize={this.pageSize} country='in' category='entertainment'/>}/>
         <Route path="health" element={<News key='health' pageSize={this.pageSize} country='in' category='health'/>}/>
         <Route path="science" element={<News key='science' pageSize={this.pageSize} country='in' category='science'/>}/>
         <Route path="technology" element={<News key='technology' pageSize={this.pageSize} country='in' category='technology'/>}/>
          <Route path="*" element={<h1>This Page does not exist</h1>}/>
         <Route/>

      </Routes>
      
      </BrowserRouter>
    )
  }
}

