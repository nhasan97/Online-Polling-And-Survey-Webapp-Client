const timeStampToDateConverter = (timeStamp) => {
  const date = new Date(timeStamp);
  return date.toLocaleDateString();
};

export default timeStampToDateConverter;
