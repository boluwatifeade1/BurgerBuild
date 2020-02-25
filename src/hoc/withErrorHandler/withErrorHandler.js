import React from 'react';
import Aux from '../Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    return (
      <Aux>
        <Modal>
          Something doesn't work !
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
  }
}

export default withErrorHandler;
