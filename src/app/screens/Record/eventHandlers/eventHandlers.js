import OperationActions from 'redux/operations/actions';

const handdleFocus = (index, dispatch) => {
  let enterHandler;
  let blurHandler;
  window.addEventListener(
    'keypress',
    (enterHandler = event => {
      if (event.key === 'Enter') {
        document.getElementById(index).blur();
      }
    })
  );
  document.getElementById(index).addEventListener(
    'blur',
    (blurHandler = () => {
      window.removeEventListener('keypress', enterHandler);
      document.getElementById(index).removeEventListener('blur', blurHandler);
      const modifiedContent = document.getElementById(index).textContent;
      dispatch(
        modifiedContent === ''
          ? OperationActions.removeOperation(index)
          : OperationActions.modifyOperation(index, modifiedContent)
      );
    })
  );
};

export default handdleFocus;
