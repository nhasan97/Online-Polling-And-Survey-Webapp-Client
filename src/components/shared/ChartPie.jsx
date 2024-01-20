import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const ChartPie = ({ yes, no }) => {
  console.log(yes, no);
  const data = [
    { vote: "Yes", count: yes },
    { vote: "No", count: no },
  ];

  // const COLORS = ["#00C49F", "#FF444A"];
  const COLORS = ["#71357B", "#FE7E51"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="h-full mx-auto">
      <ResponsiveContainer className="w-[100%] h-[100%]">
        <PieChart
          width={`100%`}
          height={`100%`}
          className="text-base md:text-3xl font-bold"
        >
          <Legend verticalAlign="bottom" align="center" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={`100%`}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip className="hidden md:flex" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie;
