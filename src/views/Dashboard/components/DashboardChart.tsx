import deviceService from 'apis/services/deviceService';
import { FC, memo, useState, useCallback, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Spin, Select, Tooltip } from 'antd';
import { DASHBOARD_UPDATE_PERIOD } from 'utils/constant';
import './index.scss';
import { dateFormat } from 'utils/function/format';
import Info from 'icons/Info';

interface ChartOptionProps {
    feed: string;
    title: string;
    label?: string;
    unit?: string;
}
interface DashboardChartProps {
    defaultOption: ChartOptionProps;
    options?: ChartOptionProps[];
}

const DashboardChart: FC<DashboardChartProps> = ({
    // feed,
    // title,
    // label = feed,
    // unit = '',
    defaultOption,
    options = [],
}) => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    const [currentOpt, setCurrentOpt] = useState(1);
    const [currentFeed, setCurrentFeed] = useState(defaultOption.feed);
    const selectedOption = useCallback(() => {
        return options.find(option => option.feed === currentFeed);
    }, [options, currentFeed]);
    const fetchChartData = useCallback(async (feed: string, hours: number) => {
        try {
            const response = await deviceService.getChartData(feed, {
                hours: hours,
            });
            setChartData(
                //Only show max 100 data points
                response.data.slice(
                    Math.max(response.length - 100, 0),
                    response.length
                )
            );
        } catch (error) {
            setIsLoading(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChartData(currentFeed, currentOpt);
    }, [fetchChartData, currentFeed, currentOpt]);

    const checkAndUpdateChart = useCallback(async () => {
        const response = await deviceService.getLatestValue(currentFeed);
        const updated =
            chartData.length > 0
                ? response?.created_at !== chartData[chartData.length - 1][0] // The dataset has been updated
                : response; // If there is response and prev chartData is empty => New dataset
        if (updated) {
            // console.log('Updated');
            fetchChartData(currentFeed, currentOpt);
        }
    }, [fetchChartData, currentFeed, chartData, currentOpt]);

    useEffect(() => {
        const interval = setInterval(
            checkAndUpdateChart,
            DASHBOARD_UPDATE_PERIOD * 1000
        );
        return () => clearInterval(interval);
    }, [checkAndUpdateChart]);

    useEffect(() => {
        if (!chartData) {
            return;
        }
        if (!isLoading && chartRef.current) {
            // Previous instance has already been used
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            const labels = chartData.map(item =>
                dateFormat(item[0], 'hh:mm A, MM/DD/YYYY')
            );
            const data = chartData.map(item => item[1]);

            if (ctx) {
                const newChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: `${selectedOption()?.label || ''} (${
                                    selectedOption()?.unit || ''
                                })`,
                                data,
                                fill: false,
                                borderColor: '#00ffff', // Line color
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.15)',
                                },
                                ticks: {
                                    color: 'white', // x-axis label text color
                                    // display: false,
                                    callback: function (
                                        tickValue,
                                        index,
                                        ticks
                                    ) {
                                        // Only show first and last timestamp
                                        if (
                                            index === 0 ||
                                            index === ticks.length - 1
                                        ) {
                                            return labels[index];
                                        }
                                    },
                                },
                            },
                            y: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.15)',
                                },
                                ticks: {
                                    color: 'white', // y-axis label text color
                                },
                                // stacked: true,
                            },
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'white', // legend label text color
                                },
                            },
                        },
                    },
                });

                chartInstanceRef.current = newChartInstance;
            }
        }
    }, [isLoading, chartData, currentFeed, selectedOption]);

    return (
        <>
            <div className="dashboard-chart">
                <div className="dashboard-chart__header">
                    <div className="dashboard-chart__header__title">
                        <Select
                            defaultValue={defaultOption.feed}
                            style={{ width: 'max-content' }}
                            options={options.map(item => ({
                                value: item.feed,
                                label: item.title,
                            }))}
                            onChange={value => {
                                setCurrentFeed(value);
                            }}
                        />
                        {/* {title} */}
                        <Tooltip title="Only max 100 data points are displayed">
                            <Info />
                        </Tooltip>
                    </div>
                    <div className="dashboard-chart__header__mode">
                        <Select
                            defaultValue="1"
                            style={{ width: 'max-content' }}
                            onChange={value => setCurrentOpt(Number(value))}
                            options={[
                                { value: '1', label: 'Last hour' },
                                { value: '3', label: 'Last 3 hours' },
                                { value: '6', label: 'Last 6 hours' },
                                { value: '12', label: 'Last 12 hours' },
                                { value: '24', label: 'Last 24 hours' },
                                { value: '72', label: 'Last 3 days' },
                            ]}
                        />
                    </div>
                </div>
                {!isLoading ? (
                    chartData.length > 0 ? (
                        <div style={{ width: '100%', height: '400px' }}>
                            <canvas ref={chartRef} />
                        </div>
                    ) : (
                        <div className="dashboard-chart__no-data">
                            No data to display
                        </div>
                    )
                ) : (
                    <Spin
                        tip="Generating chart..."
                        style={{ width: '100%', height: '400px' }}
                    />
                )}
            </div>
        </>
    );
};

DashboardChart.displayName = 'Dashboard Chart';

export default memo(DashboardChart);
