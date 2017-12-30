import React from 'react';
import { connect } from 'react-redux';
import { auth, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

import { startLinkAuthProvider, startLinkEmailAuthProvider, startUnlinkAuthProvider, setLinkEmailAuthProviderSuccess } from '../actions/auth';
import LinkEmailModal from './LinkEmailModal.js';


function AccountLinks(props) {
  const { 
    onGoogleLink, onGoogleUnlink, onFacebookLink, onFacebookUnlink,
    onEmailLinkClick, onEmailUnlink, signInProvider,
    isGoogleLinked, isFacebookLinked, isEmailLinked
  } = props;

  const currentSignIn = signInProvider === 'facebook.com' ? 
    'Facebook' : signInProvider === 'google.com' ?
    'Google' : 'Email';

  return (
    <div>
      <h1 className="link-page-title">Account linking</h1>

      <div className="link-account">
        <div className="link current-link">
          <p>Currently signed in with: {currentSignIn}</p>
        </div>

        <div className="link">
          {
            signInProvider !== 'password' &&
            (isEmailLinked ?
              <button onClick={onEmailUnlink} type="button" className="button">Unlink email account</button> :
              <button onClick={onEmailLinkClick} type="button" className="button">Link with email account</button>
            )
          }
        </div>

        <div className="link">
          {
            signInProvider !== 'facebook.com' &&
            (isFacebookLinked ?
            <button onClick={onFacebookUnlink} type="button" className="facebook-button">Unlink Facebook</button> :
            <button onClick={onFacebookLink} type="button" className="facebook-button">Link with Facebook</button>
            )
          }
        </div>

        <div className="link">
          {
            signInProvider !== 'google.com' &&
            (isGoogleLinked ?
            <button onClick={onGoogleUnlink} type="button" className="google-button">Unlink Google</button> :
            <button onClick={onGoogleLink} type="button" className="google-button">Link with Google</button>
            )
          }
        </div>
      </div>

    </div>

  );
}

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    // this.props.setLinkEmailAuthProviderSuccess();

    this.onEmailLinkClick = this.onEmailLinkClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onGoogleLink = this.onGoogleLink.bind(this);
    this.onGoogleUnlink = this.onGoogleUnlink.bind(this);
    this.onFacebookLink = this.onFacebookLink.bind(this);
    this.onFacebookUnlink = this.onFacebookUnlink.bind(this);
    this.onEmailUnlink = this.onEmailUnlink.bind(this);
  }

  onEmailLinkClick() {
    this.setState({ showModal: true });
  }

  onModalClose() {
    this.setState({ showModal: false });
  }

  onGoogleLink(event) {
    this.props.startLinkAuthProvider(googleAuthProvider);
  }

  onGoogleUnlink(event) {
    this.props.startUnlinkAuthProvider('google.com');
  }

  onFacebookLink(event) {
    this.props.startLinkAuthProvider(facebookAuthProvider);
  }

  onFacebookUnlink(event) {
    this.props.startUnlinkAuthProvider('facebook.com');
  }

  onEmailUnlink(event) {
    this.props.startUnlinkAuthProvider('password');
  }
  
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1>Profile</h1>
          </div>
        </div>

        <div className="content-container">

          <AccountLinks 
            onGoogleLink={this.onGoogleLink}
            onGoogleUnlink={this.onGoogleUnlink}
            onFacebookLink={this.onFacebookLink}
            onFacebookUnlink={this.onFacebookUnlink}
            onEmailLinkClick={this.onEmailLinkClick}
            onEmailUnlink={this.onEmailUnlink}
            isEmailLinked={this.props.isEmailLinked}
            isFacebookLinked={this.props.isFacebookLinked}
            isGoogleLinked={this.props.isGoogleLinked}
            signInProvider={this.props.signInProvider}
            providerData={this.props.providerData}
          />
          
          <LinkEmailModal
            showModal={this.state.showModal}
            onModalClose={this.onModalClose}
          />
        </div>
      </div>
    );
  }
}

const MAP_PROVIDER_TO_KEY = {
  'facebook.com': 'isFacebookLinked',
  'google.com': 'isGoogleLinked',
  'password': 'isEmailLinked'
};

const mapStateToProps = (state) => {
  const providerData = state.auth.user.providerData;
  let result = {
    isEmailLinked: false,
    isFacebookLinked: false,
    isGoogleLinked: false,
    signInProvider: state.auth.signInProvider,
  };
  providerData.forEach(provider => result[MAP_PROVIDER_TO_KEY[provider.providerId]] = true);
  console.log(result);
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startLinkEmailAuthProvider: (email, password) => dispatch(startLinkEmailAuthProvider(email, password)),
  startLinkAuthProvider: (provider) => dispatch(startLinkAuthProvider(provider)),
  startUnlinkAuthProvider: (providerId) => dispatch(startUnlinkAuthProvider(providerId)),
  setLinkEmailAuthProviderSuccess: () => dispatch(setLinkEmailAuthProviderSuccess(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);