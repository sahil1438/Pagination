import './App.css';
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 30,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {
        axios
            .get(`https://jsonplaceholder.typicode.com/photos`)
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                  <div style={{maxWidth:"800px", width:"100%", margin:"10px auto", padding:"10px", border:"1px solid #cccccc"}}>                    
                    <div style={{width:"200px", float:"left"}}><img src={pd.thumbnailUrl} alt=""/></div>
                    <div style={{width:"50%", float:"left"}}># {pd.title}</div>
                    <div style={{clear:"both"}}></div>
                  </div>
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            });
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }

    render() {
        return (
            <div>
                {this.state.postData}
                <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </div>
            </div>
        )
    }

}  
export default App;
