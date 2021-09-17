const enterHandler = (event, index) => {
  if (event.key === 'Enter') {
    event.currentTarget.removeEventListener(event.type, enterHandler);
    document.getElementById(index).blur();
  }
};

export default enterHandler;
