import React, {Component} from 'react';
import Aux from '../Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios ) => {
  return class extends Component {
    render () {
      return (
        <Aux>
          <Modal show>
            Something doesn't work !
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }    
  }
}

export default withErrorHandler;
