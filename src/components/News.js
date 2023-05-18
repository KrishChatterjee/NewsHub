import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

  }
  constructor(){
    super();
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }
  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=065528915092451e919f8db9ebb26f0f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let response=await fetch(url)
    let data=await response.json()
    this.setState({articles:data.articles,
      totalResults:data.totalResults,
      loading:false})

  }
  handelNextPage=async()=>{
  if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
  this.setState({page:this.state.page+1}, () => {
    this.updateNews()
  });
  
  }
}

  handelPrevPage=async()=>{
    this.setState({page:this.state.page-1}, () => {
      this.updateNews()
    });
  }

  async componentDidMount(){
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsHub-Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{

            return <div className="col-md-4" key={element.url}>
                   <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://gfx.nrk.no/7kT5zGoE2E-GnUKLojH1PQ0I1Nze4Ypu8lxM-oBjubQw.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>

          })}
        </div>
        <div className='d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handelPrevPage}>&laquo; Previous</button>
        <button type="button"   disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))} className="btn btn-dark" onClick={this.handelNextPage}>Next &raquo;</button>
        </div>
        
       
      </div>
      
    )
  }
}

export default News