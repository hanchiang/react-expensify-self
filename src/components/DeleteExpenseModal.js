import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

function DeleteExpenseModal(props) {
  const handleConfirmDelete = (event) => props.onModalConfirm(true);
  const handleRejectDelete = (event) => props.onModalConfirm(false);

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.onModalClose}
      closeTimeoutMS={300}
      contentLabel="Delete expense?"
      className="modal"
    >
      <div className="modal-header">
        <h2 className="modal-title">Delete Expense</h2>
      </div>

      <div className="modal-body">
        <p className="modal-message">Are you sure you want to delete expense?</p>
      </div>

      <div className="modal-actions">
        <button className="button button-normal" onClick={handleRejectDelete} type="button">Close</button>
        <button className="button button-warning" onClick={handleConfirmDelete} type="button">Delete</button>  
      </div>
    </Modal>
  );

}

export default DeleteExpenseModal;