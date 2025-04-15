"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Kinh doanh",
    "Chỉ tiêu": 15000,
    "Hiện tại": 12500,
  },
  {
    name: "Chăm sóc KH",
    "Chỉ tiêu": 5000,
    "Hiện tại": 4200,
  },
  {
    name: "Marketing",
    "Chỉ tiêu": 3000,
    "Hiện tại": 2100,
  },
  {
    name: "Hành chính",
    "Chỉ tiêu": 1000,
    "Hiện tại": 950,
  },
]

export default function DepartmentPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} triệu VNĐ`} />
        <Legend />
        <Bar dataKey="Chỉ tiêu" fill="#3b82f6" />
        <Bar dataKey="Hiện tại" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  )
}
