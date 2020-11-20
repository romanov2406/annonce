import React, { Component, Fragment } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { limitText } from '../../utils';

class Announcements extends Component {

  constructor(props) {
    super(props);
    this.state = {filter:'', announcements: props.announcements };
  }

  remove(announcement) {
    this.setState({
      announcements: this.state.announcements.filter(a => a.id !== announcement.id)
    });

    this.props.remove(announcement);
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { filter, announcements } = this.state;
    const filteredData = announcements.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));

    return (
      <Fragment>
        <button className="btn btn-primary new" onClick={ () => this.props.history.push('/announcements/new') }>Add New
          Announcement
        </button>
        <div className="row">
          <div className="col-4">
            <input className="form-control search" value={filter} onChange={this.handleChange} placeholder="search" />
          </div>
        </div>
        <ListGroup>
          {
            filteredData.length ?
            filteredData.map((announcement, index) => (
                <ListGroup.Item key={ index }>
                  <div className='announcement-item'>
                    <div className="info">
                      <Link to={`/announcements-details/${announcement.id}`} >
                        <h4>{ announcement.title }</h4>
                      </Link>
                      <div className="alert alert-light" role="alert">
                        <p>{ limitText(announcement.description, 250) }</p>
                      </div>
                      <span className="badge badge-light">{ announcement.date }</span>
                    </div>
                    <div className="actions">
                      <img src={ 'icons/trash.svg' } alt='trash' onClick={ () => this.remove(announcement) }/>
                      <img src={ 'icons/pencil.svg' } alt='pencil'
                           onClick={ () => this.props.history.push(`/announcements/${ announcement.id }`) }/>
                    </div>
                  </div>
                </ListGroup.Item>
              )) : <div className="d-flex justify-content-center"><img src="empty.png" width="400px" alt="empty"/></div>
          }
        </ListGroup>
      </Fragment>
    );
  }

}

export default Announcements;
