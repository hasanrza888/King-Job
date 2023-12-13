import React from 'react';
import './LoadingSpinner.css'; // You can define styles for this component in LoadingSpinner.css
import svg from '../../images/king_job_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faSpinner } from '@fortawesome/free-solid-svg-icons';
function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <img
        src={svg} // Replace with the path to your logo
        alt=""
        className="logo-spin"
      />
      <FontAwesomeIcon className='page_loading_rotates' icon={faSpinner} />
    </div>
  );
}

export default LoadingSpinner;