import React, { Component } from 'react';
import { limitText } from '../../utils';

class AnnouncementDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      announcements: props.announcements,
      id: +props.match.params.id,
      announcement: null
    }
  }

  componentDidMount() {
    const announcement = this.state.announcements.find(a => a.id === this.state.id);
    this.setState({
      announcement
    }, () => {
      this.setState({
        similar: [
          ...this.findSimilarAnnouncements('title'),
          // ...this.findSimilarAnnouncements('description')
        ].splice(0, 3)
      })
    });
  }

  findSimilarAnnouncements(findBy) {
    if (!this.state.announcement) return;
    const similar = new Set();

    for (const prop of this.state.announcement[findBy].split(' ')) {
      for (const an of this.state.announcements) {
        if (an[findBy].indexOf(prop) !== -1 && an.id !== this.state.announcement.id) {
          similar.add(an);
        }
      }
    }

    return similar;
  }

  render() {
    return (
      this.state.announcement &&
      <section>
        <h2>{ this.state.announcement.title }</h2>
        <p>{ this.state.announcement.description }</p>
        <span className="badge badge-light">{ this.state.announcement.date }</span>
        <div className='mt-2'>
          <button type="button" className="btn btn-secondary" onClick={() => this.props.history.goBack()}>Back</button>
        </div>

        <hr/>

        <div className="similar-announcements">
          {
            this.state.similar && this.state.similar.length
              ? this.state.similar.map((a, index) => (
                <div className="card" key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{ a.title }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ a.date }</h6>
                    <p className="card-text">{limitText(a.description, 150)}</p>
                  </div>
                </div>
              )) : <div className="alert alert-primary">No similar announcements</div>
          }
        </div>
      </section>
    );
  }
}

export default AnnouncementDetails;
