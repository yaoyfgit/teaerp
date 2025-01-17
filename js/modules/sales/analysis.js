// 初始化所有图表
function initAllCharts() {
    // 销售趋势图
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['销售金额', '同比增长']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [{
            type: 'value',
            name: '销售金额',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }, {
            type: 'value',
            name: '同比增长',
            axisLabel: {
                formatter: '{value}%'
            }
        }],
        series: [{
            name: '销售金额',
            type: 'bar',
            data: [150, 230, 224, 218, 135, 147],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '同比增长',
            type: 'line',
            yAxisIndex: 1,
            data: [15.2, 22.1, 18.9, 20.3, 12.5, 14.8],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });

    // 客户销售额占比
    const customerPieChart = echarts.init(document.getElementById('customerPieChart'));
    customerPieChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'pie',
            radius: '70%',
            data: [
                { value: 335, name: '客户A' },
                { value: 310, name: '客户B' },
                { value: 234, name: '客户C' },
                { value: 135, name: '客户D' },
                { value: 154, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });

    // 商品销售额占比
    const productPieChart = echarts.init(document.getElementById('productPieChart'));
    productPieChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'pie',
            radius: '70%',
            data: [
                { value: 435, name: '商品A' },
                { value: 310, name: '商品B' },
                { value: 234, name: '商品C' },
                { value: 155, name: '商品D' },
                { value: 154, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });

    // 商品销售排名
    const productRankChart = echarts.init(document.getElementById('productRankChart'));
    productRankChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['商品A', '商品B', '商品C', '商品D', '商品E']
        },
        series: [{
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            itemStyle: {
                color: '#8fd4d2'
            }
        }]
    });

    // 销售退货率分析
    const returnRateChart = echarts.init(document.getElementById('returnRateChart'));
    returnRateChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            name: '退货率',
            type: 'line',
            data: [2.6, 2.2, 3.1, 2.8, 2.5, 2.1],
            itemStyle: {
                color: '#f44336'
            }
        }]
    });

    // 销售及时率分析
    const onTimeRateChart = echarts.init(document.getElementById('onTimeRateChart'));
    onTimeRateChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            name: '及时率',
            type: 'line',
            data: [98.5, 97.8, 98.2, 98.9, 98.1, 98.7],
            itemStyle: {
                color: '#4caf50'
            }
        }]
    });

    // 区域销售分析
    const regionChart = echarts.init(document.getElementById('regionChart'));
    regionChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['销售额', '订单数', '平均客单价']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['华东', '华南', '华北', '西南', '其他']
        },
        yAxis: [{
            type: 'value',
            name: '销售额/订单数',
            axisLabel: {
                formatter: '{value}'
            }
        }, {
            type: 'value',
            name: '平均客单价',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }],
        series: [{
            name: '销售额',
            type: 'bar',
            data: [320, 280, 250, 220, 180],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '订单数',
            type: 'bar',
            data: [52, 45, 40, 38, 30],
            itemStyle: {
                color: '#91cc75'
            }
        }, {
            name: '平均客单价',
            type: 'line',
            yAxisIndex: 1,
            data: [6.2, 6.1, 6.3, 5.8, 6.0],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });

    // 平均客单价分析
    const avgOrderChart = echarts.init(document.getElementById('avgOrderChart'));
    avgOrderChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['平均客单价', '环比变化']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [{
            type: 'value',
            name: '客单价',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }, {
            type: 'value',
            name: '环比变化',
            axisLabel: {
                formatter: '{value}%'
            }
        }],
        series: [{
            name: '平均客单价',
            type: 'bar',
            data: [5.8, 6.0, 6.2, 6.1, 6.3, 6.2],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '环比变化',
            type: 'line',
            yAxisIndex: 1,
            data: [0, 3.4, 3.3, -1.6, 3.3, -1.6],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });

    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', function() {
        trendChart.resize();
        customerPieChart.resize();
        productPieChart.resize();
        productRankChart.resize();
        returnRateChart.resize();
        onTimeRateChart.resize();
        regionChart.resize();
        avgOrderChart.resize();
    });
}

// 更新图表数据
function updateCharts() {
    // 这里添加从后端获取数据的逻辑
    console.log('更新图表数据');
}

// 导出报表
function exportReport() {
    // 这里添加导出报表的逻辑
    console.log('导出报表');
}

// 客户销售额占比
function initCustomerPieChart() {
    const chart = echarts.init(document.getElementById('customerPieChart'));
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}万 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [{
            type: 'pie',
            radius: '70%',
            data: [
                { value: 335, name: '客户A' },
                { value: 310, name: '客户B' },
                { value: 234, name: '客户C' },
                { value: 135, name: '客户D' },
                { value: 154, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
}

// 商品销售额占比
function initProductPieChart() {
    const chart = echarts.init(document.getElementById('productPieChart'));
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}万 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [{
            type: 'pie',
            radius: '70%',
            data: [
                { value: 435, name: '商品A' },
                { value: 310, name: '商品B' },
                { value: 234, name: '商品C' },
                { value: 155, name: '商品D' },
                { value: 154, name: '其他' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
}

// 商品销售排名
function initProductRankChart() {
    const chart = echarts.init(document.getElementById('productRankChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c}万'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}万'
            }
        },
        yAxis: {
            type: 'category',
            data: ['商品A', '商品B', '商品C', '商品D', '商品E']
        },
        series: [{
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            itemStyle: {
                color: '#8fd4d2'
            }
        }]
    });
}

// 退货率分析
function initReturnRateChart() {
    const chart = echarts.init(document.getElementById('returnRateChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br>{a}: {c}%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [{
            name: '退货率',
            type: 'line',
            data: [2.6, 2.2, 3.1, 2.8, 2.5, 2.1],
            itemStyle: {
                color: '#f44336'
            }
        }]
    });
}

// 销售趋势分析
function initTrendChart() {
    const chart = echarts.init(document.getElementById('trendChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['销售金额', '同比增长']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: [{
            type: 'value',
            name: '销售金额',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }, {
            type: 'value',
            name: '同比增长',
            axisLabel: {
                formatter: '{value}%'
            }
        }],
        series: [{
            name: '销售金额',
            type: 'bar',
            data: [150, 230, 224, 218, 135, 147],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '同比增长',
            type: 'line',
            yAxisIndex: 1,
            data: [15.2, 22.1, 18.9, 20.3, 12.5, 14.8],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function() {
    initAllCharts();
}); 