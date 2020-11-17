/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const renderField = ({
  input, type, placeholder, label, meta: { touched, error, visited },
}) => (
  <div className="input-field">
    <div className="field-column">
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={visited && error ? 'form-control error-outline' : (!visited ? 'form-control' : 'form-control success-outline')}
      />
      {
        (type === 'password' && input.name == 'password') && touched
          && (
          <span className={error ? 'error-message' : 'success-message'} style={!error ? { top: '.7em' } : { top: '' }}>
            {!error ? <ion-icon name="checkmark-circle" /> : <ion-icon name="close-circle"></ion-icon>}
            {error && (
            <div className="error-box">
              Great passwords use upper case and lower case characters, numbers, and symbols like &”!$%!
            </div>
            )}
          </span>
        )
      }
      {
        (type === 'password' && input.name == 'cpassword') && touched
          && (
          <span className={error ? 'error-message' : 'success-message'} style={{ top: '.7em' }}>
            {!error ? <ion-icon name="checkmark-circle" /> : <ion-icon name="close-circle"></ion-icon>}
            {error && (
            <div className="error-box">
              {error}
            </div>
            )}
          </span>
        )
      }
      {
        (input.name == 'email') && touched
          && (
          <span className={error ? 'error-message' : 'success-message'} style={!error ? { top: '.8em' } : { top: '0em' }}>
            {!error ? <ion-icon name="checkmark-circle" /> : <ion-icon name="close-circle"></ion-icon>} 
            {error && (
            <div className="error-box">
              {error}
            </div>
            )}
          </span>
        )
      }
    </div>
  </div>
);

export { renderField };
