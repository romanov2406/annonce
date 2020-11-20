import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Announcements from './components/Announcements/announcements';
import AnnouncementItem from './components/Announcement-Item/announcement-Item';
import AnnouncementDetails from './components/Announcement-details/announcement-details';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';


class App extends Component {

  constructor(props) {
    super(props);

    const announcements = localStorage.getItem('announcements');

    this.state = {
      announcements: announcements ? JSON.parse(announcements) : []
    };
  }

  save() {
    localStorage.setItem('announcements', JSON.stringify(this.state.announcements));
  }

  add(announcement) {
    this.setState({
      announcements: [...this.state.announcements, announcement]
    }, this.save);
  }

  update(announcement) {
    const { title, description } = announcement;

    const announcements = this.state.announcements.map(a => {
      if (a.id === announcement.id) {
        return Object.assign({}, a, { title, description })
      }

      return a;
    });

    this.setState({ announcements }, this.save);
  }

  remove(announcement) {
    this.setState({
      announcements: this.state.announcements.filter(a => a.id !== announcement.id)
    }, this.save);
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <Switch>
            <Route path="/announcements/new"
                   render={ (props) => (
                     <AnnouncementItem { ...props } add={ (a) => this.add(a) }/>)
                   }/>
            <Route path="/announcements/:id"
                   render={ (props) => (
                     <AnnouncementItem { ...props } announcements={ this.state.announcements } update={ (a) => this.update(a) }/>
                   ) }/>
            <Route path="/announcements"
                   render={ (props) => (
                     <Announcements { ...props } announcements={ this.state.announcements } remove={ (a) => this.remove(a) }/>
                   ) }/>
            <Route path="/announcements-details/:id"
                   render={ (props) => (
                     <AnnouncementDetails { ...props } announcements={ this.state.announcements } />)
                   }/>
            <Redirect from="/" to="/announcements"/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
