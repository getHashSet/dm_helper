import React, { Component } from 'react';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Hero>
                    <h1>DM Helper</h1>
                </Hero>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}
