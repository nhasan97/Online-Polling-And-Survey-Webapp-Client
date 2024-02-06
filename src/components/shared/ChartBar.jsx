import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ChartBar = ({ yes, no }) => {
  const data = [
    { vote: "Yes", count: yes },
    { vote: "No", count: no },
  ];

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={data} width={400} height={400}>
        <XAxis dataKey="vote" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#95D0D4" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartBar;
