import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import { Container } from './styles';

class Users extends Component {
  static propTypes = {
    removeUserRequest: PropTypes.func.isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          login: PropTypes.string,
          url: PropTypes.string,
          avatar_url: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  removeUser = (id) => {
    this.props.removeUserRequest(id);
  };

  render() {
    console.warn(`loading: ${this.props.users.loading}`);
    return (
      <Fragment>
        <Container>
          <ul>
            {this.props.users.data.length === 0 && (
              <li>
                <center>Nenhum usuário adicionado.</center>
              </li>
            )}
            {this.props.users.data.map(user => (
              <li key={user.id}>
                <div className="box">
                  <img src={user.avatar_url} alt={user.name} />
                  <div className="inner">
                    <strong>{user.name}</strong>
                    <span>{user.login}</span>
                  </div>
                  <div className="right">
                    <span className="del fa-stack">
                      <i className="fa fa-circle fa-stack-2x" />
                      <button type="button" title="Remove" onClick={() => this.removeUser(user.id)}>
                        <i className="fa fa-remove fa-stack-1x" style={{ color: '#FFF' }} />
                      </button>
                    </span>
                    <i className="arrow fa fa-angle-right fa-lg" />
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </Container>
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
)(Users);
