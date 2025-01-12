import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { Cell, Label, Legend, Pie, PieChart } from 'recharts';

import { MainContainer } from '@layouts/main-container';

import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@ui/chart';

// Sample data for the pie chart
const chartData = [
  { name: 'Stocks', value: 40000 },
  { name: 'Bonds', value: 20000 },
  { name: 'Real Estate', value: 30000 },
  { name: 'Cash', value: 10000 },
  { name: 'Cryptocurrencies', value: 5000 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <MainContainer>
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-stone-900 dark:text-stone-50">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={Object.fromEntries(
                chartData.map((entry, index) => [entry.name.toLowerCase(), { label: entry.name, color: COLORS[index] }])
              )}
              className="mx-auto h-[400px] w-full"
            >
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={80} strokeWidth={5} fill="#8884d8" dataKey="value">
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                              ${totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              in total
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                  {chartData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* Chart */}

        {/* Existing entries */}
        <Card>
          <CardHeader>
            <CardTitle>Your Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <h3 className="font-semibold">{entry.name}</h3>
                  </div>
                  <p className="font-bold">${entry.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Existing entries */}
      </main>
    </MainContainer>
  );
}
