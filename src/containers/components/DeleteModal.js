import React from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';

export default (props) => {
  return (
    <ReactModal
      className={'delete-modal'}
      isOpen={props.isOpen}
    >
      <div>
        <div onClick={props.close} className="flex flex-row-reverse close-icon">
          <FaTimes />
        </div>
        <strong><p className="title text-center">{props.title}</p></strong>
        <hr />
        <div className="body text-center">
          <p className="mt-6">Are you <strong>sure</strong> to delete it?</p>
        </div>
        <div className="flex flex-row-reverse">
          <button
            onClick={props.delete}
            className="button-save"
          >
            Delete
          </button>
          <button
            className="button-cancel mr-2"
            onClick={props.close}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  )
}

ReactModal.setAppElement('#root');