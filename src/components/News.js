import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
   capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title=`NewsHub-${this.capitalizeFirstLetter(props.category)}`
  }
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=065528915092451e919f8db9ebb26f0f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    this.props.setProgress(20)
    let response = await fetch(url)
    this.props.setProgress(50)
    let data = await response.json()
    this.props.setProgress(70)
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    })
    this.props.setProgress(100)

  }


  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=065528915092451e919f8db9ebb26f0f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true })
    let response = await fetch(url)
    let data = await response.json()
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center my-3' style={{ margin: "35px 0px",paddingTop:'55px'}}>NewsHub-Top Headlines in {this.capitalizeFirstLetter(this.props.category)}</h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://gfx.nrk.no/7kT5zGoE2E-GnUKLojH1PQ0I1Nze4Ypu8lxM-oBjubQw.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}
            </div>
          </div>

        </InfiniteScroll>


      </>


    )
  }
}

export default News