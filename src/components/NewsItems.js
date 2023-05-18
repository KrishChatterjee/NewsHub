import React, { Component } from 'react'

export default class NewsItems extends Component {
  
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props 
    return (
      <div className="my-3">

        
      <div className="card " >
      <img src={imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}<span style={{zIndex:"1",left:"90%"}}className="position-absolute top-0  translate-middle badge rounded-pill bg-danger">{source}</span></h5>
        <p className="card-text">{description}</p>
        <div className="card-footer">
      <small className="text-muted">By {author?author:"Unkown"} at {new Date(date).toGMTString()}</small>
        </div>
        <a href={newsUrl}  target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
      </div>
    </div>
    </div>
    )
  }
}
