import React, { Component } from 'react';
import SearchBox from '../Component/SearchBox';
import CardList from '../Component/CardList';
import './App.css';
import Scroll from '../Component/Scroll';
import ErrorBoundary from '../Component/ErrorBoundary';


class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users/').then(response => response.json())
        .then(users => this.setState({robots: users}))
    }

    onSearchChange =(event)=>{
        this.setState({searchfield: event.target.value});

    }

    render(){
        const {robots, searchfield} = this.state;

        const fillteredarray = robots.filter(robot =>{
              return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        if(robots.length === 0){
            return <h1>Loading</h1>
        }
        else{
    return(
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox onchange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                 <CardList robots={fillteredarray}/>
                </ErrorBoundary>
            </Scroll>
        </div>
    );}

    }

}


export default App;