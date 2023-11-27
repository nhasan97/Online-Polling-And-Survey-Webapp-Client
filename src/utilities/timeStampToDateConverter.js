import moment from "moment/moment";

const timeStampToDateConverter = (timeStamp) => {
  const date = moment.unix(timeStamp).format("DD-MM-YYYY");
  return date;
};

export default timeStampToDateConverter;
