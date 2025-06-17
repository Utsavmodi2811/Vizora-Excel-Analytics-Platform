"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChartImage = void 0;
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
const generateChartImage = async (config) => {
    const width = 800;
    const height = 600;
    const chartJSNodeCanvas = new chartjs_node_canvas_1.ChartJSNodeCanvas({ width, height });
    const chartData = {
        labels: config.data.map(item => item[config.xAxis]),
        datasets: [{
                label: config.yAxis,
                data: config.data.map(item => item[config.yAxis]),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${config.yAxis} vs ${config.xAxis}`
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    const configuration = {
        type: config.chartType,
        data: chartData,
        options: chartOptions
    };
    return await chartJSNodeCanvas.renderToBuffer(configuration);
};
exports.generateChartImage = generateChartImage;
