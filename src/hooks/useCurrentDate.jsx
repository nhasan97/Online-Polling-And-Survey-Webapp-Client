import moment from "moment/moment";

const useCurrentDate = () => {
  const today = moment().format("YYYY/MM/DD");
  return today;
};

export default useCurrentDate;
