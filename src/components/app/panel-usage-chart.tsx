"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export type UsagePoint = { date: string; label: string; views: number };

export function UsageChart({ data }: { data: UsagePoint[] }) {
  const hasViews = data.some((d) => d.views > 0);

  if (!hasViews) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        No views recorded in the last 30 days yet.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f5" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={40}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ stroke: "#c7d2fe", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              fontSize: 12,
              boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
            }}
            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
            formatter={(value) => [Number(value).toLocaleString("en-IN"), "Views"]}
          />
          <Area type="monotone" dataKey="views" stroke="#0d9488" strokeWidth={2} fill="url(#usageFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
