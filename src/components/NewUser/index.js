import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import { Form, ModalContent } from './styles';

class NewUser extends Component {
  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    modalRequest: PropTypes.func.isRequired,
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
      newUser: PropTypes.shape({
        showModal: PropTypes.bool,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    }).isRequired,
  };

  state = {
    repositoryInput: '',
  };

  componentDidMount() {
    document.getElementById('repository').focus();
  }

  handleAddRepository = (event) => {
    event.preventDefault();

    this.props.addUserRequest({
      ...this.props.users.newUser,
      repository: this.state.repositoryInput,
    });
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ repositoryInput: '' });
    const { modalRequest } = this.props;
    modalRequest(false);
  };

  render() {
    return (
      <Fragment>
        <Modal
          visible={this.props.users.newUser.showModal}
          width="400"
          height="200"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <ModalContent>
            <Form onSubmit={this.handleAddRepository}>
              <h1>Adicionar novo usuário</h1>
              <input
                id="repository"
                type="text"
                placeholder="Usuário no Github"
                value={this.state.repositoryInput}
                onChange={e => this.setState({ repositoryInput: e.target.value })}
                autoComplete="off"
              />
              <div className="divButtons">
                <button type="button" onClick={this.closeModal} className="cancel">
                  Cancelar
                </button>
                <button type="submit" className="save">
                  Salvar
                </button>
              </div>
            </Form>
          </ModalContent>
        </Modal>
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
)(NewUser);
