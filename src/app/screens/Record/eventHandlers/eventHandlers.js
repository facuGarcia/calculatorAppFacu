import OperationActions from 'redux/operations/actions';

const handdleFocus = (id, dispatch) => {
  let enterHandler;
  let blurHandler;
  window.addEventListener(
    'keypress',
    (enterHandler = event => {
      if (event.key === 'Enter') {
        document.getElementById(id).blur();
      }
    })
  );
  document.getElementById(id).addEventListener(
    'blur',
    (blurHandler = () => {
      window.removeEventListener('keypress', enterHandler);
      document.getElementById(id).removeEventListener('blur', blurHandler);
      dispatch(OperationActions.modifyOperation(id, document.getElementById(id).textContent));
    })
  );
};

export default handdleFocus;
