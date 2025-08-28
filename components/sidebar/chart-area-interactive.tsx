"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive area chart"

const dummyEnrollmentsData = [
  { date: "2025-07-30", enrollments: 40 },
  { date: "2025-07-31", enrollments: 38 },
  { date: "2025-08-01", enrollments: 42 },
  { date: "2025-08-02", enrollments: 28 },
  { date: "2025-08-03", enrollments: 32 },
  { date: "2025-08-04", enrollments: 55 },
  { date: "2025-08-05", enrollments: 41 },
  { date: "2025-08-06", enrollments: 60 },
  { date: "2025-08-07", enrollments: 34 },
  { date: "2025-08-08", enrollments: 46 },
  { date: "2025-08-09", enrollments: 39 },
  { date: "2025-08-10", enrollments: 50 },
  { date: "2025-08-11", enrollments: 29 },
  { date: "2025-08-12", enrollments: 53 },
  { date: "2025-08-13", enrollments: 44 },
  { date: "2025-08-14", enrollments: 36 },
  { date: "2025-08-15", enrollments: 58 },
  { date: "2025-08-16", enrollments: 27 },
  { date: "2025-08-17", enrollments: 49 },
  { date: "2025-08-18", enrollments: 31 },
  { date: "2025-08-19", enrollments: 56 },
  { date: "2025-08-20", enrollments: 42 },
  { date: "2025-08-21", enrollments: 37 },
  { date: "2025-08-22", enrollments: 59 },
  { date: "2025-08-23", enrollments: 23 },
  { date: "2025-08-24", enrollments: 48 },
  { date: "2025-08-25", enrollments: 34 },
  { date: "2025-08-26", enrollments: 60 },
  { date: "2025-08-27", enrollments: 26 },
  { date: "2025-08-28", enrollments: 53 },
]

const chartConfig = {

  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  }

} satisfies ChartConfig

export function ChartAreaInteractive() {

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total enrollment for the last 30 days: 1200
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 days: 1200
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={dummyEnrollmentsData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={
                (value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey={"enrollments"} fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
