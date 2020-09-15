import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
  let classesJoined = [classes.InputElement, props.className].join(' ');
  if (props.error) {
    classesJoined = [
      classes.InputElement,
      classes.InputError,
      props.className,
    ].join(' ');
  }

  return (
    <div className={classesJoined}>
      <label for={props.id}>{props.label}</label>
      <input {...props} />
    </div>
  );
};

export default input;
