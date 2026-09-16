import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const COLORS = ['#2563eb', '#7c3aed', '#f59e0b', '#10b981', '#ef4444']

export function RevenueChart({ data }) {
  const chartData = data || [
    { date: 'Sep 8', revenue: 4990, sales: 10 },
    { date: 'Sep 9', revenue: 7490, sales: 15 },
    { date: 'Sep 10', revenue: 9990, sales: 20 },
    { date: 'Sep 11', revenue: 5990, sales: 12 },
    { date: 'Sep 12', revenue: 12490, sales: 25 },
    { date: 'Sep 13', revenue: 8990, sales: 18 },
    { date: 'Sep 14', revenue: 14990, sales: 30 }
  ]

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
          <XAxis dataKey="date" fontSize={12}/>
          <YAxis fontSize={12}/>
          <Tooltip/>
          <Bar dataKey="revenue" fill="#2563eb" radius={[8,8,0,0]} name="Revenue ₹"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MembershipPie({ data }) {
  const chartData = data || [
    { name: 'Free', value: 4200 },
    { name: 'Pro', value: 850 },
    { name: 'Premium', value: 320 }
  ]

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2 text-xs">
        {chartData.map((d,i)=>(
          <span key={d.name} className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{background:COLORS[i]}}/> {d.name}: {d.value}</span>
        ))}
      </div>
    </div>
  )
}

export function ProgressLine({ data }) {
  const chartData = data || [
    { day: 'Mon', progress: 20 },
    { day: 'Tue', progress: 45 },
    { day: 'Wed', progress: 30 },
    { day: 'Thu', progress: 70 },
    { day: 'Fri', progress: 65 },
    { day: 'Sat', progress: 85 },
    { day: 'Sun', progress: 90 }
  ]

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
          <XAxis dataKey="day" fontSize={12}/>
          <YAxis fontSize={12}/>
          <Tooltip/>
          <Line type="monotone" dataKey="progress" stroke="#7c3aed" strokeWidth={3} dot={{ r:4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
