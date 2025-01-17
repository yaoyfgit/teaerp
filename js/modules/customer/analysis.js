// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    // 初始化所有图表
    initAllCharts();
    
    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        const charts = [
            'salesChart', 'typeChart', 'regionChart',
            'frequencyChart', 'preferenceChart', 'valueChart',
            'repurchaseChart'
        ].map(id => echarts.getInstanceByDom(document.getElementById(id)))
         .filter(Boolean);
        
        charts.forEach(chart => chart.resize());
    });
});

// 销售额和订单分析
function initSalesChart() {
    const chart = echarts.init(document.getElementById('salesChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['销售金额', '订单数量']
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
            name: '订单数量',
            axisLabel: {
                formatter: '{value}单'
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
            name: '订单数量',
            type: 'line',
            yAxisIndex: 1,
            data: [89, 123, 117, 112, 68, 72],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });
}

// 客户类型分布
function initTypeChart() {
    const chart = echarts.init(document.getElementById('typeChart'));
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}位 ({d}%)'
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
                { value: 735, name: '零售客户' },
                { value: 310, name: '批发客户' },
                { value: 234, name: '经销商' },
                { value: 135, name: '团购客户' },
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

// 客户地区分布
function initRegionChart() {
    const chart = echarts.init(document.getElementById('regionChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['客户数量', '销售额']
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
            data: ['福建', '广东', '浙江', '江苏', '上海']
        },
        series: [{
            name: '客户数量',
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '销售额',
            type: 'bar',
            data: [120, 132, 101, 134, 90],
            itemStyle: {
                color: '#91cc75'
            }
        }]
    });
}

// 消费频次分析
function initFrequencyChart() {
    const chart = echarts.init(document.getElementById('frequencyChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['消费次数', '客单价']
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
            name: '消费次数',
            axisLabel: {
                formatter: '{value}次'
            }
        }, {
            type: 'value',
            name: '客单价',
            axisLabel: {
                formatter: '¥{value}'
            }
        }],
        series: [{
            name: '消费次数',
            type: 'bar',
            data: [2.5, 2.8, 3.2, 3.5, 3.7, 4.0],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '客单价',
            type: 'line',
            yAxisIndex: 1,
            data: [2100, 2300, 2500, 2400, 2600, 2800],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });
}

// 产品偏好分析
function initPreferenceChart() {
    const chart = echarts.init(document.getElementById('preferenceChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['销售额', '销售量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['红茶', '绿茶', '乌龙茶', '普洱茶', '花茶']
        },
        yAxis: [{
            type: 'value',
            name: '销售额',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }, {
            type: 'value',
            name: '销售量',
            axisLabel: {
                formatter: '{value}kg'
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
            name: '销售量',
            type: 'line',
            yAxisIndex: 1,
            data: [1200, 1100, 950, 800, 600],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });
}

// 客户价值分析
function initValueChart() {
    const chart = echarts.init(document.getElementById('valueChart'));
    chart.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [{
            name: '客户价值',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            data: [
                { value: 1048, name: '高价值客户' },
                { value: 735, name: '中高价值客户' },
                { value: 580, name: '中价值客户' },
                { value: 484, name: '低价值客户' }
            ]
        }]
    });
}

// 客户复购分析
function initRepurchaseChart() {
    const chart = echarts.init(document.getElementById('repurchaseChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['客户数量', '复购率', '客单价']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['首次购买', '二次购买', '多次购买']
        },
        yAxis: [{
            type: 'value',
            name: '客户数量',
            axisLabel: {
                formatter: '{value}位'
            }
        }, {
            type: 'value',
            name: '复购率/客单价',
            axisLabel: {
                formatter: '{value}%'
            }
        }],
        series: [{
            name: '客户数量',
            type: 'bar',
            data: [580, 320, 280],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '复购率',
            type: 'line',
            yAxisIndex: 1,
            data: [100, 55, 48],
            itemStyle: {
                color: '#409EFF'
            }
        }, {
            name: '客单价',
            type: 'line',
            yAxisIndex: 1,
            data: [80, 120, 150],
            itemStyle: {
                color: '#67C23A'
            }
        }]
    });
}

// 初始化所有图表
function initAllCharts() {
    // 销售额和订单分析
    initSalesChart();
    // 客户类型分布
    initTypeChart();
    // 客户地区分布
    initRegionChart();
    // 消费频次分析
    initFrequencyChart();
    // 产品偏好分析
    initPreferenceChart();
    // 客户价值分析
    initValueChart();
    // 客户复购分析
    initRepurchaseChart();
} 