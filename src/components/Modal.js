import React from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';

export default (props) => {
  return (
    <ReactModal
      className={'post-modal'}
      isOpen={props.isOpen}
    >
      <div>
        <div onClick={props.close} className="flex flex-row-reverse close-icon">
          <FaTimes />
        </div>
        <strong><p className="title text-center">{props.title}</p></strong>
        <hr />
        <div className="body">
          {props.children}
        </div>
        <div className="flex flex-row-reverse">
          <button
            onClick={props.save}
            className="button-save"
          >
            Save
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