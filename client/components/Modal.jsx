/**
 * ************************************
 *
 * @module  Main
 * @author Tu Pham
 * @date 1-3-2022
 * @description Modal to display when click on movieplacard
 * ************************************
 */

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