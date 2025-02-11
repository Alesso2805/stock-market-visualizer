import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import styles from '../styles/StockChart.module.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const StockChart = ({ data, labels }) => {
    const [timeRange, setTimeRange] = useState("default");
    const [chartColor, setChartColor] = useState("rgb(3,123,102)");

    const filterData = (range) => {
        const endIndex = data.length;
        let startIndex;
        switch (range) {
            case "1d":
                startIndex = endIndex - 2;
                break;
            case "5d":
                startIndex = endIndex - 6;
                break;
            case "1m":
                startIndex = endIndex - 31;
                break;
            case "6m":
                startIndex = endIndex - 181;
                break;
            case "all":
                startIndex = 0;
                break;
            default:
                startIndex = endIndex - 2;
        }
        return {
            filteredData: data.slice(startIndex, endIndex),
            filteredLabels: labels.slice(startIndex, endIndex),
        };
    };

    const formatLabels = (range, labels) => {
        const today = new Date();
        switch (range) {
            case "1d":
                return labels.map((_, i) => (i + 1).toString());
            case "5d":
                return labels.map((_, i) => (i + 1).toString());
            case "1m":
                return labels.map((_, i) => (i + 1).toString());
            case "6m":
                return labels.map((_, i) => (i + 1).toString());
            default:
                return labels;
        }
    };

    const { filteredData, filteredLabels } = filterData(timeRange);
    const formattedLabels = formatLabels(timeRange, filteredLabels);

    useEffect(() => {
        const startValue = filteredData[0];
        const endValue = filteredData[filteredData.length - 1];
        if (endValue > startValue) {
            setChartColor("#037b66"); // Green for positive trend
        } else {
            setChartColor("#d60a22"); // Red for negative trend
        }
    }, [filteredData]);

    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                data: filteredData,
                fill: true,
                borderColor: chartColor,
                backgroundColor: chartColor,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                },
            },
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <div style={{ width: "90%", maxWidth: "1500px", height: "500px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "left" }}>Stock Market Price Visualization</h2>
            <div className={styles.buttonContainer}>
                <button className={`${styles.button} ${timeRange === "1d" ? styles.selected : ""}`} onClick={() => setTimeRange("1d")}>1D</button>
                <button className={`${styles.button} ${timeRange === "5d" ? styles.selected : ""}`} onClick={() => setTimeRange("5d")}>5D</button>
                <button className={`${styles.button} ${timeRange === "1m" ? styles.selected : ""}`} onClick={() => setTimeRange("1m")}>1M</button>
                <button className={`${styles.button} ${timeRange === "6m" ? styles.selected : ""}`} onClick={() => setTimeRange("6m")}>6M</button>
                <button className={`${styles.button} ${timeRange === "all" ? styles.selected : ""}`} onClick={() => setTimeRange("all")}>All</button>
            </div>
            <div style={{ width: "100%", height: "100%" }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default StockChart;