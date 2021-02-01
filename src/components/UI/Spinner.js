const Spinner = (props) => {
  let renderInSpinner = <div className="Loader">Loading...</div>;

  if (props.showModal) {
    renderInSpinner = props.children;
  }

  return <>{renderInSpinner}</>;
};

export default Spinner;
