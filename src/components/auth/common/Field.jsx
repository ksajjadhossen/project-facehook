import React from "react";

const Field = ({ label, children, error }) => {
  const child = React.Children.only(children);
  const id = child.props.id;

  return (
    <div className="form-control">
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}

      {children}

      {error && (
        <div role="alert" className="text-red-600 mt-1">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Field;
