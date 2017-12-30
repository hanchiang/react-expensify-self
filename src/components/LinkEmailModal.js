import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import LinkEmailForm from './LinkEmailForm';
import { startLinkEmailAuthProvider, setLinkEmailAuthProviderError } from '../actions/auth';

Modal.setAppElement('#app');

function LinkEmailModal(props) {
  // validation and async action is handled by form.
  const handleCloseLink = () => props.onModalClose();
  const handleSuccess = () => props.onModalClose();

  const startLinkEmailAuthProvider = (user) => {
    props.setLinkEmailAuthProviderError('');
    props.startLinkEmailAuthProvider(user);
  }
  
  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.onModalClose}
      closeTimeoutMS={300}
      contentLabel="Link email"
      className="link-email-modal"
    >
      <LinkEmailForm
        closeModal={handleCloseLink}
        onSubmit={startLinkEmailAuthProvider}
        linkEmailAuthProviderError={props.linkEmailAuthProviderError}
        linkEmailAuthProviderSuccess={props.linkEmailAuthProviderSuccess}
        shouldCloseLinkEmailModal={props.shouldCloseLinkEmailModal}
      />
    </Modal>
  );
}

const mapStatetoProps = (state) => ({
  linkEmailAuthProviderError: state.auth.linkEmailAuthProviderError,
  linkEmailAuthProviderSuccess: state.auth.linkEmailAuthProviderSuccess,
  shouldCloseLinkEmailModal: state.auth.shouldCloseLinkEmailModal
});

const mapDispatchToProps = (dispatch) => ({
  startLinkEmailAuthProvider: (user) => dispatch(startLinkEmailAuthProvider(user)),
  setLinkEmailAuthProviderError: (error) => dispatch(setLinkEmailAuthProviderError(error))
});

export default connect(mapStatetoProps, mapDispatchToProps)(LinkEmailModal);