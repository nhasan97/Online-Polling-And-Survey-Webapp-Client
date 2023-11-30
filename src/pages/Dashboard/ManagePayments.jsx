import { Helmet } from "react-helmet-async";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";
import Title from "../../components/shared/Title";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../api/paymentAPIs";

const ManagePayments = () => {
  //setting the title
  const title = {
    mainTitle: "Payments",
    subTitle: "",
  };

  //fetching payments data
  const { isLoading: loadingPayments, data: payments } = useQuery({
    queryKey: ["getPayments"],
    queryFn: getPayments,
  });

  if (loadingPayments) {
    return <Loading />;
  }

  if (payments.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Manage Payments</title>
        </Helmet>

        <Title title={title}></Title>

        <div className="w-[90%] overflow-y-auto h-[400px] rounded-lg">
          <table className="w-full table table-zebra rounded-lg text-base text-center">
            {/* head */}
            <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Paid</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <th className="text-[#71357B] text-left">{payment.name}</th>

                  <td>{payment.email}</td>
                  <td>{payment.price}</td>
                  <td>{payment.transactionID}</td>

                  <td>{timeStampToDateConverter(payment.timeStamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardContainer>
    );
  } else {
    <NoData text={"No Users Found"}></NoData>;
  }
};

export default ManagePayments;
