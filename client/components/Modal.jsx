import React from 'react';
import MovieModal from './MovieModal';

const Modal = props => {
  return (props.modal[0]) ? (
      <div className='modal' onClick={() => props.setModal([false, {}])}>
        <div className='modal-inner'>
        <MovieModal movie={props.modal[1]} />
        </div>
      </div>
    ) : '';
};

export default Modal;