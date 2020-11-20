import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from '../../utils';

class AnnouncementItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      announcement: null,
      announcements: props.announcements,
      id: +props.match.params.id,
      isNew: !!props.add
    };
  }

  componentDidMount() {
    if (this.state.id != null && !this.state.isNew) {
      const announcement = this.state.announcements.find(a => a.id === this.state.id);

      this.setState({
        title: announcement.title,
        description: announcement.description,
        announcement
      }, () => console.log(this.state));
    }
  }

  createAnnouncement() {
    const { title, description } = this.state;

    if (!title || !description) {
      this.notify();
      return false;
    }

    const announcement = {
      id: new Date().getTime(),
      title: this.state.title,
      description: this.state.description,
      date: formatDate(new Date()),
    };

    this.props.add(announcement);
    this.props.history.push('/announcements');
  }

  updateAnnouncement() {
    const { title, description } = this.state;
    const { id } = this.state.announcement;

    this.props.update({ id, title, description });
    this.props.history.push('/announcements');
  }

  submit(e) {
    e.preventDefault();
    this.state.isNew ? this.createAnnouncement() : this.updateAnnouncement();
  }

  handleInputChange = (state) => {
    this.setState({ ...state });
  };

  notify = () => {
    return toast.error('Please fill out all fields', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <section>
        <h2>New Announcement</h2>
        <form onSubmit={(e) => this.submit(e)}>
          <div className="form-group">
            <label htmlFor="title">Announcement Title</label>
            <input type="text"
                   id="title"
                   className="form-control"
                   value={this.state.title}
                   onChange={(event) => this.handleInputChange({ title: event.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Announcement Description</label>
            <textarea id="description"
                      className="form-control"
                      cols="30"
                      rows="10"
                      value={this.state.description}
                      onChange={(event) => this.handleInputChange({ description: event.target.value })}>
            </textarea>
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-primary">{ this.state.isNew ? 'Create Announcement' : 'Update Announcement'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => this.props.history.goBack()}>Back</button>
          </div>
        </form>
        <ToastContainer />
      </section>
    );
  }
}

export default AnnouncementItem;
