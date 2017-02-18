import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './ContentBox.css';

export default observer(class ContentBox extends Component {
    render() {
        return (
            <div className="content-box">
                <div className="title">
                    <h1>{this.props.prefecture['en']}</h1>
                    <h2>{this.props.prefecture['jp']}</h2>
                </div>
            </div>
        );
    }
})
