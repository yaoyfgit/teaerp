// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    
    // 初始化所有图表
    initAllCharts();
    
    // 初始化标签页
    initTabs();
    
    // 初始化表格数据
    initTableData();
    
    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', () => {
        const charts = [
            'turnoverTrendChart', 'stockStructureChart', 'materialAnalysisChart',
            'stockAbnormalChart', 'stockCostChart'
        ].map(id => echarts.getInstanceByDom(document.getElementById(id)))
         .filter(Boolean);
        
        charts.forEach(chart => chart.resize());
    });

    // 监听查询条件变化
    document.querySelectorAll('.search-box select').forEach(select => {
        select.addEventListener('change', () => {
            updateCharts();
        });
    });

    // 确保初始化完成后显示第一个标签页
    const firstTab = document.querySelector('.tab-header .standard-button');
    if (firstTab) {
        firstTab.click();
    }
});

// 初始化所有图表
function initAllCharts() {
    initTurnoverTrendChart();
    initStockStructureChart();
    initMaterialAnalysisChart();
    initStockAbnormalChart();
    initStockCostChart();
}

// 库存周转趋势
function initTurnoverTrendChart() {
    const chart = echarts.init(document.getElementById('turnoverTrendChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['茶叶周转率', '茶具周转率', '包装材料周转率', '周转天数']
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
            name: '周转率',
            axisLabel: {
                formatter: '{value}次'
            }
        }, {
            type: 'value',
            name: '周转天数',
            axisLabel: {
                formatter: '{value}天'
            }
        }],
        series: [{
            name: '茶叶周转率',
            type: 'bar',
            stack: 'turnover',
            data: [3.2, 3.3, 3.4, 3.5, 3.6, 3.7],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '茶具周转率',
            type: 'bar',
            stack: 'turnover',
            data: [2.8, 2.9, 3.0, 3.1, 3.2, 3.3],
            itemStyle: {
                color: '#91cc75'
            }
        }, {
            name: '包装材料周转率',
            type: 'bar',
            stack: 'turnover',
            data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7],
            itemStyle: {
                color: '#5470c6'
            }
        }, {
            name: '周转天数',
            type: 'line',
            yAxisIndex: 1,
            data: [18, 17, 16, 15, 14, 13],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });
}

// 库存结构分析
function initStockStructureChart() {
    const chart = echarts.init(document.getElementById('stockStructureChart'));
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}万元 ({d}%)'
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
            data: [
                { value: 735, name: '原料仓' },
                { value: 580, name: '成品仓' },
                { value: 484, name: '半成品仓' },
                { value: 300, name: '包材仓' }
            ]
        }]
    });
}

// 物料分类分析
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
            data: ['商品数量', '库存金额']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['茶叶', '茶具', '包装材料', '其他']
        },
        yAxis: [{
            type: 'value',
            name: '商品数量',
            axisLabel: {
                formatter: '{value}个'
            }
        }, {
            type: 'value',
            name: '库存金额',
            axisLabel: {
                formatter: '¥{value}万'
            }
        }],
        series: [{
            name: '商品数量',
            type: 'bar',
            data: [120, 80, 60, 40],
            itemStyle: {
                color: '#8fd4d2'
            }
        }, {
            name: '库存金额',
            type: 'line',
            yAxisIndex: 1,
            data: [500, 300, 200, 100],
            itemStyle: {
                color: '#409EFF'
            }
        }]
    });
}

// 库存异常分析
function initStockAbnormalChart() {
    const chart = echarts.init(document.getElementById('stockAbnormalChart'));
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}件 ({d}%)'
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
                { value: 50, name: '积压库存' },
                { value: 30, name: '库存短缺' },
                { value: 40, name: '超储库存' },
                { value: 20, name: '呆滞库存' }
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

// 库存成本分析
function initStockCostChart() {
    const chart = echarts.init(document.getElementById('stockCostChart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['持有成本']
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
            name: '成本',
            axisLabel: {
                formatter: '¥{value}万'
            }
        },
        series: [{
            name: '持有成本',
            type: 'bar',
            data: [15, 16, 17, 16, 15, 14],
            itemStyle: {
                color: '#8fd4d2'
            }
        }]
    });
}

// 更新图表数据
function updateCharts() {
    // 获取查询条件
    const warehouse = document.querySelector('select:nth-child(1)').value;
    const category = document.querySelector('select:nth-child(2)').value;
    const timeRange = document.querySelector('select:nth-child(3)').value;

    // TODO: 根据查询条件更新图表数据
    console.log('更新图表数据:', { warehouse, category, timeRange });
}

// 导出报表
function exportReport() {
    // TODO: 实现导出功能
    console.log('导出报表');
}

// 初始化标签页切换
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-header .standard-button');
    const tabPanes = document.querySelectorAll('.tab-content .tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 设置当前标签为活动状态
            button.classList.add('active');
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
}

// 初始化表格数据
function initTableData() {
    // 周转分析数据
    const turnoverData = [
        { category: '茶叶', count: 120, amount: '125,000', turnover: 3.8, days: 12, mom: '+0.3', yoy: '+0.5' },
        { category: '茶具', count: 85, amount: '98,000', turnover: 3.2, days: 15, mom: '+0.1', yoy: '+0.3' },
        { category: '包装', count: 65, amount: '45,000', turnover: 4.2, days: 10, mom: '+0.4', yoy: '+0.8' },
        { category: '礼盒', count: 45, amount: '68,000', turnover: 2.8, days: 18, mom: '-0.2', yoy: '+0.2' }
    ];

    // 结构分析数据
    const structureData = [
        { warehouse: '主仓库', category: '茶叶', productCount: 120, stockCount: 2500, amount: '125,000', ratio: '37.2%' },
        { warehouse: '主仓库', category: '茶具', productCount: 85, stockCount: 1800, amount: '98,000', ratio: '29.2%' },
        { warehouse: '次仓库', category: '包装', productCount: 65, stockCount: 3500, amount: '45,000', ratio: '13.4%' },
        { warehouse: '次仓库', category: '礼盒', productCount: 45, stockCount: 1200, amount: '68,000', ratio: '20.2%' }
    ];

    // 物料分类分析数据
    const materialData = [
        { category: '茶叶', productCount: 58, productRatio: '18.5%', amount: '220,000', amountRatio: '65.4%', strategy: '重点管理，严格控制' },
        { category: '茶具', productCount: 125, productRatio: '39.8%', amount: '85,000', amountRatio: '25.3%', strategy: '常规管理，适度控制' },
        { category: '包装', productCount: 131, productRatio: '41.7%', amount: '31,000', amountRatio: '9.3%', strategy: '简单管理，放宽控制' }
    ];

    // 异常分析数据
    const abnormalData = [
        { type: '积压', count: 35, amount: '58,000', ratio: '35.8%', suggestion: '促销清理，控制采购' },
        { type: '缺货', count: 25, amount: '42,000', ratio: '25.9%', suggestion: '及时补货，提高库存' },
        { type: '呆滞', count: 20, amount: '35,000', ratio: '21.6%', suggestion: '折价处理，避免积压' },
        { type: '超储', count: 15, amount: '22,000', ratio: '13.6%', suggestion: '降低库存，加快周转' },
        { type: '其他', count: 5, amount: '5,000', ratio: '3.1%', suggestion: '具体分析，专项处理' }
    ];

    // 渲染表格数据
    renderTable('turnoverTable', turnoverData, [
        { key: 'category', format: v => v },
        { key: 'count', format: v => v },
        { key: 'amount', format: v => v },
        { key: 'turnover', format: v => v.toFixed(1) },
        { key: 'days', format: v => v },
        { key: 'mom', format: v => formatTrend(v) },
        { key: 'yoy', format: v => formatTrend(v) }
    ]);

    renderTable('structureTable', structureData, [
        { key: 'warehouse', format: v => v },
        { key: 'category', format: v => v },
        { key: 'productCount', format: v => v },
        { key: 'stockCount', format: v => v.toLocaleString() },
        { key: 'amount', format: v => v },
        { key: 'ratio', format: v => v }
    ]);

    renderTable('materialTable', materialData, [
        { key: 'category', format: v => v },
        { key: 'productCount', format: v => v },
        { key: 'productRatio', format: v => v },
        { key: 'amount', format: v => v },
        { key: 'amountRatio', format: v => v },
        { key: 'strategy', format: v => v }
    ]);

    renderTable('abnormalTable', abnormalData, [
        { key: 'type', format: v => v },
        { key: 'count', format: v => v },
        { key: 'amount', format: v => v },
        { key: 'ratio', format: v => v },
        { key: 'suggestion', format: v => v }
    ]);
}

// 渲染表格
function renderTable(tableId, data, columns) {
    const tbody = document.getElementById(tableId);
    if (!tbody) {
        console.error('Table body not found:', tableId);
        return;
    }
    
    tbody.innerHTML = data.map(row => `
        <tr>
            ${columns.map(col => `<td>${col.format(row[col.key])}</td>`).join('')}
        </tr>
    `).join('');
}

// 格式化趋势
function formatTrend(value) {
    const cls = value.startsWith('+') ? 'success' : 'danger';
    return `<span class="trend ${cls}">${value}</span>`;
} 