import NoData from "../../components/shared/NoData";
import Title from "../../components/shared/Title";
import { Helmet } from "react-helmet-async";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import usePerformMutation from "../../hooks/usePerformMutation";
import { useQuery } from "@tanstack/react-query";
import { getUsersData, updateUserRole } from "../../api/usersAPIs";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";

const ManageUsers = () => {
  const roles = ["user", "surveyor", "admin", "pro-user"];

  //setting the title
  const title = {
    mainTitle: "Users",
    subTitle: "",
  };

  //fetching users data
  const {
    isLoading: loadingUsers,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["getUsersData"],
    queryFn: getUsersData,
  });

  //performing mutation for updating user role
  const mutation = usePerformMutation(
    "updateRole",
    updateUserRole,
    "Updated successfully!"
  );

  //update button handler
  const handleUserRole = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value || "Not Found";
    const role = form.role.value || "Not Found";

    const updatedRole = {
      role,
    };

    mutation.mutate({ email, updatedRole });
    refetch();
    form.reset();
  };

  if (loadingUsers) {
    return <Loading />;
  }

  if (users.length > 0) {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <Helmet>
            <title>PanaPoll | Dashboard | Manage Users</title>
          </Helmet>

          <Title title={title}></Title>

          <div className="w-full sm:w-[90%] h-[80%] overflow-y-auto rounded-lg border">
            <table className="w-full table table-zebra rounded-lg text-base text-center">
              {/* head */}
              <thead className=" bg-[#71357B] text-base text-white font-normal text-center">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined On</th>
                </tr>
              </thead>
              <tbody>
                {/* row  */}
                {users.map((user) => (
                  <tr key={user._id}>
                    <th className="text-[#71357B]">{user.name}</th>

                    <td>{user.email}</td>

                    <td className="flex justify-center gap-3">
                      <button
                        className="btn hover:bg-emerald-400 hover:text-white"
                        onClick={() =>
                          document.getElementById(user._id).showModal()
                        }
                      >
                        {user.role}
                      </button>

                      <dialog id={user._id} className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <div className="p-5">
                            <form
                              className="w-full flex flex-col gap-4 text-left"
                              onSubmit={handleUserRole}
                            >
                              <input
                                type="text"
                                name="email"
                                required
                                hidden
                                defaultValue={user.email}
                              />

                              <div className="relative">
                                <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                                  <i className="fa-solid fa-user text-xl text-white"></i>
                                </div>
                                <select
                                  defaultValue={user.role}
                                  type="text"
                                  name="role"
                                  placeholder="Role"
                                  required
                                  className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                                >
                                  {roles.map((role) => (
                                    <option key={role}>{role}</option>
                                  ))}
                                </select>
                              </div>

                              <input
                                type="submit"
                                value="Update"
                                className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
                              />
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>

                    <td>{timeStampToDateConverter(user.timeStamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardContainer>
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <DashboardContainer>
          <NoData text="No Users Found"></NoData>
        </DashboardContainer>
      </div>
    );
  }
};

export default ManageUsers;
