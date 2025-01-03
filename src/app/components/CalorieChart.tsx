'use client'

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface CalorieData {
  date: string
  consumed: number
  burned: number
}

interface CalorieChartProps {
  data: CalorieData[]
}

export default function CalorieChart({ data }: CalorieChartProps) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Calorie Overview</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="consumed" stroke="#8884d8" name="Calories Consumed" />
            <Line type="monotone" dataKey="burned" stroke="#82ca9d" name="Calories Burned" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

