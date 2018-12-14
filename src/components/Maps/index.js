import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

class Map extends Component {
  static propTypes = {
    modalRequest: PropTypes.func.isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool,
      success: PropTypes.oneOfType([null, PropTypes.string]),
      error: PropTypes.oneOfType([null, PropTypes.string]),
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          login: PropTypes.string,
          url: PropTypes.string,
          avatar_url: PropTypes.string,
        }),
      ),
      newUser: PropTypes.shape({
        showModal: PropTypes.bool,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    }).isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -16.741751754495613,
      longitude: -49.30602101288496,
      zoom: 14,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = (e) => {
    const [latitude, longitude] = e.lngLat;

    console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);

    const newUser = {
      showModal: true,
      latitude,
      longitude,
    };

    this.props.modalRequest(newUser);
  };

  alertSuccess = () => toast.success(this.props.users.success);

  alertError = () => toast.error(this.props.users.error);

  render() {
    if (this.props.users.success !== null) {
      this.alertSuccess();
    }
    if (this.props.users.error !== null) {
      this.alertError();
    }

    const { viewport } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '9999',
            display: this.props.users.loading ? 'block' : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '80px',
              height: '80px',
              zIndex: '9999',
            }}
          >
            <Loader type="Hearts" color="#F00" height={80} width={80} />
          </div>
        </div>
        <MapGL
          {...viewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
          onViewportChange={viewportChange => this.setState({ viewport: viewportChange })}
        >
          {this.props.users.data.map(user => (
            <Marker key={user.id} latitude={user.longitude} longitude={user.latitude}>
              <img
                alt=""
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                }}
                src={user.avatar_url}
              />
            </Marker>
          ))}
        </MapGL>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
