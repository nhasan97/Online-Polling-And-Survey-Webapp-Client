import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
// import useParticularSurveyVote from "../../hooks/useParticularSurveyVote";
// import Loading from "./Loading";

const ChartBar = ({ votes }) => {
  console.log(votes);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(`https://b8-a11-online-marketplace-server.vercel.app/popularity`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  // const {
  //   isLoading: loadingVote,
  //   data: votes,
  //   refetch: voteRefetch,
  // } = useQuery({
  //   queryKey: ["getVotes"],
  //   queryFn: getTotalVotes,
  // });

  // if (loadingVote) {
  //   return <Loading></Loading>;
  // }

  return (
    // <div className="max-w-screen-xl mx-auto px-20">

    // <div className="w-full min-h-screen flex flex-col justify-center items-center mt-24">
    //
    <div className="max-w-screen-xl mx-auto px-20 py-10 mt-16 ">
      <div className="py-10">
        {/* <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={data} width={400} height={400}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#323384" />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
    </div>
    // </div>
  );
};

export default ChartBar;
