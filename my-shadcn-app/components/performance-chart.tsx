"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Nguyễn Văn A",
    "Doanh số": 4000,
    "Chỉ tiêu": 2400,
  },
  {
    name: "Trần Thị B",
    "Doanh số": 3000,
    "Chỉ tiêu": 1398,
  },
  {
    name: "Lê Văn C",
    "Doanh số": 2000,
    "Chỉ tiêu": 3800,
  },
  {
    name: "Phạm Thị D",
    "Doanh số": 2780,
    "Chỉ tiêu": 3908,
  },
  {
    name: "Hoàng Văn E",
    "Doanh số": 1890,
    "Chỉ tiêu": 4800,
  },
  {
    name: "Đỗ Thị F",
    "Doanh số": 2390,
    "Chỉ tiêu": 3800,
  },
  {
    name: "Vũ Văn G",
    "Doanh số": 3490,
    "Chỉ tiêu": 4300,
  },
]

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Doanh số" fill="#22c55e" />
        <Bar dataKey="Chỉ tiêu" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
