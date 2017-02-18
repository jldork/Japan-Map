import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';
import Japan from './Map/Japan';
import JapanStore from './Map/JapanStore';
import ContentBox from './ContentBox/ContentBox';


class App extends Component {
  render() {
    this.store = JapanStore;
    return (
      <div className="App">
        <Japan store={this.store}/>
        <ContentBox prefecture={this.store.selected}/>
      </div>
    );
  }
}

export default observer(App);
