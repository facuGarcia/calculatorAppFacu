import OperationActions from 'redux/operations/actions';
import { DIGITS, SIGNS, OPERATORS } from 'app/screens/Calculator/constants.js';

export const handleFocus = (id, dispatch) => {
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
      const modifiedContent = document.getElementById(id).textContent;
      dispatch(
        modifiedContent === ''
          ? OperationActions.removeOperation(id)
          : OperationActions.modifyOperation(id, modifiedContent)
      );
    })
  );
};

const posibleCharacters = DIGITS.concat(SIGNS, OPERATORS);

export const handleKeyPress = event => {
  if (!posibleCharacters.includes(event.key)) {
    return event.preventDefault();
  }
};
