import { Helmet } from "react-helmet-async";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import NoData from "../../components/shared/NoData";
import Title from "../../components/shared/Title";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../api/paymentAPIs";
import { FaCcStripe } from "react-icons/fa";

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
      <div className="h-screen">
        <DashboardContainer>
          <Helmet>
            <title>PanaPoll | Dashboard | Manage Payments</title>
          </Helmet>

          <Title title={title}></Title>

          <div className="hidden lg:block w-full h-[80%] overflow-y-auto rounded-lg border">
            <table className="w-full table table-zebra rounded-lg text-base text-center">
              {/* head */}
              <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
                <tr>
                  <th>User</th>
                  {/* <th>Email</th> */}
                  <th>Paid</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* row  */}
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <th className=" text-left">
                      <span className="text-[#71357B]">{payment.name}</span>
                      {/* <span className="text-sm">{payment.email}</span> */}
                    </th>

                    <td>{payment.price}</td>
                    <td>{payment.transactionID}</td>

                    <td>{timeStampToDateConverter(payment.timeStamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden w-full h-[80%] overflow-y-auto rounded-lg">
            {payments.map((payment) => (
              <div key={payment._id} className="card bg-base-100 shadow-xl">
                <div className="card-body p-5">
                  <h2 className="card-title text-[#71357B] text-lg sm:text-xl lg:text-2xl">
                    {payment.name}
                  </h2>
                  <p className="text-base flex items-center justify-start gap-2">
                    <i className="fa-solid fa-envelope text-[#95D0D4]"></i>{" "}
                    {payment.email}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-base flex items-center justify-start gap-2">
                      <FaCcStripe className="text-[#71357B]" /> {payment.price}$
                    </p>
                    <p className="text-base flex items-center justify-start gap-2">
                      <i className="fa-solid fa-calendar-days text-[#FE7E51]"></i>
                      {timeStampToDateConverter(payment.timeStamp)}
                    </p>
                  </div>

                  <div className="card-actions justify-center">
                    <button
                      className="w-full btn hover:bg-emerald-400 hover:text-white"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      TID
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">Transaction ID</h3>
                        <p className="py-4">{payment.transactionID}</p>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardContainer>
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <NoData text="No Payment Found"></NoData>
        </DashboardContainer>
      </div>
    );
  }
};

export default ManagePayments;
