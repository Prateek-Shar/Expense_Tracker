import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  data: { category: string; amount: number; color: string }[];
};

function ExpenseDonutChart({ data }: ChartProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%' as const,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="w-[200px] h-[200px] relative flex justify-center items-center">
      <Doughnut data={chartData} options={options} />
      <div className="absolute text-xl font-bold text-red-500">-₹{total}</div>
    </div>
  );
}

export default ExpenseDonutChart;
