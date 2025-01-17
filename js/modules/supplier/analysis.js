// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initSupplierAnalysis();
});

// 初始化供应商分析
function initSupplierAnalysis() {
    // 加载供应商列表
    loadSupplierOptions();
    // 初始化图表
    initCharts();
    // 加载供应商排名
    loadSupplierRanking();
}

// 加载供应商选项
function loadSupplierOptions() {
    // 模拟API调用
    const suppliers = [
        { id: 1, name: '供应商A' },
        { id: 2, name: '供应商B' },
        { id: 3, name: '供应商C' }
    ];
    const select = document.querySelector('[name="supplierId"]');
    select.innerHTML = '<option value="">全部供应商</option>' + 
        suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

// 初始化图表
function initCharts() {
    initPurchaseAmountChart();
    initSupplierRatioChart();
    initCategoryDistributionChart();
    initSupplierScoreChart();
}

// 采购金额趋势图
function initPurchaseAmountChart() {
    const chart = echarts.init(document.getElementById('purchaseAmountChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '采购金额(万元)'
        },
        series: [{
            data: [120, 150, 180, 170, 220, 250],
            type: 'line',
            smooth: true,
            areaStyle: {
                opacity: 0.1
            }
        }]
    };
    chart.setOption(option);
}

// 供应商占比图
function initSupplierRatioChart() {
    const chart = echarts.init(document.getElementById('supplierRatioChart'));
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        series: [{
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
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '供应商A' },
                { value: 735, name: '供应商B' },
                { value: 580, name: '供应商C' },
                { value: 484, name: '供应商D' },
                { value: 300, name: '其他' }
            ]
        }]
    };
    chart.setOption(option);
}

// 品类分布图
function initCategoryDistributionChart() {
    const chart = echarts.init(document.getElementById('categoryDistributionChart'));
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [{
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
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '红茶' },
                { value: 735, name: '绿茶' },
                { value: 580, name: '乌龙茶' },
                { value: 484, name: '普洱茶' },
                { value: 300, name: '其他' }
            ]
        }]
    };
    chart.setOption(option);
}

// 供应商评分图
function initSupplierScoreChart() {
    const chart = echarts.init(document.getElementById('supplierScoreChart'));
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        radar: {
            indicator: [
                { name: '价格', max: 100 },
                { name: '质量', max: 100 },
                { name: '交付', max: 100 },
                { name: '服务', max: 100 },
                { name: '创新', max: 100 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [85, 90, 88, 95, 80],
                    name: '供应商A',
                    areaStyle: {
                        opacity: 0.1
                    }
                },
                {
                    value: [95, 80, 95, 85, 85],
                    name: '供应商B',
                    areaStyle: {
                        opacity: 0.1
                    }
                }
            ]
        }]
    };
    chart.setOption(option);
}

// 加载供应商排名
function loadSupplierRanking() {
    // 模拟API调用
    const mockData = [
        {
            rank: 1,
            name: '供应商A',
            amount: 1234567.89,
            orderCount: 156,
            deliveryDays: 5.2,
            qualifiedRate: 99.5,
            score: 95
        },
        {
            rank: 2,
            name: '供应商B',
            amount: 987654.32,
            orderCount: 123,
            deliveryDays: 6.1,
            qualifiedRate: 98.8,
            score: 92
        }
    ];
    renderSupplierRanking(mockData);
}

// 渲染供应商排名
function renderSupplierRanking(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.map(supplier => `
        <tr>
            <td>${supplier.rank}</td>
            <td>${supplier.name}</td>
            <td>${formatAmount(supplier.amount)}</td>
            <td>${supplier.orderCount}</td>
            <td>${supplier.deliveryDays}天</td>
            <td>${supplier.qualifiedRate}%</td>
            <td>${supplier.score}</td>
        </tr>
    `).join('');
}

// 应用筛选条件
function applyFilter() {
    const supplierId = document.querySelector('[name="supplierId"]').value;
    const startDate = document.querySelector('[name="startDate"]').value;
    const endDate = document.querySelector('[name="endDate"]').value;

    // 重新加载数据
    loadAnalysisData(supplierId, startDate, endDate);
}

// 加载分析数据
function loadAnalysisData(supplierId, startDate, endDate) {
    console.log('加载分析数据:', { supplierId, startDate, endDate });
    // TODO: 调用后端API获取数据
    // 重新初始化图表
    initCharts();
    // 重新加载供应商排名
    loadSupplierRanking();
}

// 格式化金额
function formatAmount(amount) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(amount);
}

// 采购趋势分析
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
            data: ['采购金额', '同比增长']
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
            name: '采购金额',
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
            name: '采购金额',
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

// 供应商采购额占比
function initSupplierPieChart() {
    const chart = echarts.init(document.getElementById('supplierPieChart'));
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
                { value: 335, name: '供应商A' },
                { value: 310, name: '供应商B' },
                { value: 234, name: '供应商C' },
                { value: 135, name: '供应商D' },
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

// 物料分类采购占比
function initMaterialPieChart() {
    const chart = echarts.init(document.getElementById('materialPieChart'));
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
                { value: 435, name: '原料茶' },
                { value: 310, name: '包装材料' },
                { value: 234, name: '生产设备' },
                { value: 155, name: '办公用品' },
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

// 供应商采购排名
function initSupplierRankChart() {
    const chart = echarts.init(document.getElementById('supplierRankChart'));
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
            data: ['供应商A', '供应商B', '供应商C', '供应商D', '供应商E']
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

// 物料分类供货分析
function initMaterialAnalysisChart() {
    const chart = echarts.init(document.getElementById('materialAnalysisChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['采购额', '订单数', '平均单价']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['原料茶', '包装材料', '生产设备', '办公用品', '其他']
        },
        yAxis: [{
            type: 'value',
            name: '采购额/订单数',
            axisLabel: {
                formatter: '{value}'
            }
        }, {
            type: 'value',
            name: '平均单价',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }],
        series: [{
            name: '采购额',
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
            name: '平均单价',
            type: 'line',
            yAxisIndex: 1,
            data: [6.2, 6.1, 6.3, 5.8, 6.0],
            itemStyle: {
                color: '#409EFF'
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
            data: [1.6, 1.2, 2.1, 1.8, 1.5, 1.1],
            itemStyle: {
                color: '#f44336'
            }
        }]
    });
}

// 交期准时率分析
function initDeliveryRateChart() {
    const chart = echarts.init(document.getElementById('deliveryRateChart'));
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
            name: '准时率',
            type: 'line',
            data: [95.5, 96.8, 94.2, 95.9, 97.1, 96.7],
            itemStyle: {
                color: '#4caf50'
            }
        }]
    });
}

// 初始化所有图表
function initAllCharts() {
    // 采购趋势分析
    initTrendChart();
    // 供应商采购额占比
    initSupplierPieChart();
    // 物料分类采购占比
    initMaterialPieChart();
    // 供应商采购排名
    initSupplierRankChart();
    // 物料分类供货分析
    initMaterialAnalysisChart();
    // 退货率分析
    initReturnRateChart();
    // 交期准时率分析
    initDeliveryRateChart();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    // 初始化所有图表
    initAllCharts();
    
    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        const charts = [
            'trendChart', 'supplierPieChart', 'materialPieChart',
            'supplierRankChart', 'materialAnalysisChart', 'returnRateChart',
            'deliveryRateChart'
        ].map(id => echarts.getInstanceByDom(document.getElementById(id)))
         .filter(Boolean);
        
        charts.forEach(chart => chart.resize());
    });
}); 