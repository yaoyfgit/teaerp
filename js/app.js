// 获取基础路径
function getBasePath() {
    // 判断是否在GitHub Pages环境
    if (window.location.hostname.includes('github.io')) {
        return '/teaerp/';
    }
    // 本地开发环境 - 使用完整的本地路径
    return '/C:/teaerp/';
}

// 处理路径
function processPath(path) {
    const basePath = getBasePath();
    // 如果路径已经包含了基础路径，直接返回
    if (path.startsWith(basePath)) {
        return path;
    }
    // 移除开头的斜杠并拼接
    return basePath + path.replace(/^\//, '');
}

// 菜单配置
const menuConfig = [
    {
        key: 'purchase',
        title: '采购管理',
        icon: 'shopping-cart',
        children: [
            {
                key: 'requirement',
                title: '采购需求',
                icon: 'clipboard-list',
                path: 'pages/purchase/demand.html'
            },
            {
                key: 'order',
                title: '采购订单',
                icon: 'file-invoice',
                path: 'pages/purchase/order.html'
            },
            {
                key: 'receive',
                title: '通知收货',
                icon: 'truck-loading',
                path: 'pages/purchase/receive.html'
            },
            {
                key: 'return',
                title: '通知退货',
                icon: 'undo',
                path: 'pages/purchase/return.html'
            },
            {
                key: 'analysis',
                title: '采购分析',
                icon: 'chart-line',
                path: 'pages/purchase/analysis.html'
            }
        ]
    },
    {
        key: 'sale',
        title: '销售管理',
        icon: 'store',
        children: [
            {
                key: 'order',
                title: '销售订单',
                icon: 'file-invoice-dollar',
                path: 'pages/sales/order.html'
            },
            {
                key: 'delivery',
                title: '通知发货',
                icon: 'truck',
                path: 'pages/sales/delivery.html'
            },
            {
                key: 'return',
                title: '通知退货',
                icon: 'undo-alt',
                path: 'pages/sales/return.html'
            },
            {
                key: 'analysis',
                title: '销售分析',
                icon: 'chart-bar',
                path: 'pages/sales/analysis.html'
            },
            {
                key: 'manual',
                title: '产品手册',
                icon: 'book',
                path: 'pages/sales/product-manual.html'
            }
        ]
    },
    {
        key: 'supplier',
        title: '供应商管理',
        icon: 'truck',
        children: [
            {
                key: 'info',
                title: '供应商信息',
                icon: 'info-circle',
                path: 'pages/supplier/info.html'
            },
            {
                key: 'contract',
                title: '供应商合同',
                icon: 'file-contract',
                path: 'pages/supplier/contract.html'
            },
            {
                key: 'reconciliation',
                title: '供应商对账',
                icon: 'balance-scale',
                path: 'pages/supplier/reconciliation.html'
            },
            {
                key: 'analysis',
                title: '供应商分析',
                icon: 'chart-pie',
                path: 'pages/supplier/analysis.html'
            }
        ]
    },
    {
        key: 'customer',
        title: '客户管理',
        icon: 'users',
        children: [
            {
                key: 'info',
                title: '客户列表',
                icon: 'user-circle',
                path: 'pages/customer/list.html'
            },
            {
                key: 'contract',
                title: '客户合同',
                icon: 'file-signature',
                path: 'pages/customer/contract.html'
            },
            {
                key: 'reconciliation',
                title: '客户对账',
                icon: 'balance-scale-right',
                path: 'pages/customer/reconciliation.html'
            },
            {
                key: 'service',
                title: '客户服务',
                icon: 'headset',
                path: 'pages/customer/service.html'
            },
            {
                key: 'analysis',
                title: '客户分析',
                icon: 'chart-area',
                path: 'pages/customer/analysis.html'
            }
        ]
    },
    {
        key: 'stock',
        title: '库存管理',
        icon: 'warehouse',
        children: [
            {
                key: 'inbound',
                title: '入库管理',
                icon: 'sign-in-alt',
                path: 'pages/stock/inbound.html'
            },
            {
                key: 'outbound',
                title: '出库管理',
                icon: 'sign-out-alt',
                path: 'pages/stock/outbound.html'
            },
            {
                key: 'flow',
                title: '库存流水',
                icon: 'stream',
                path: 'pages/stock/stock-flow.html'
            },
            {
                key: 'query',
                title: '库存查询',
                icon: 'search',
                path: 'pages/stock/stock-query.html'
            },
            {
                key: 'check',
                title: '库存盘点',
                icon: 'clipboard-check',
                path: 'pages/stock/stock-check.html'
            },
            {
                key: 'warning',
                title: '库存预警',
                icon: 'exclamation-triangle',
                path: 'pages/stock/stock-warning.html'
            },
            {
                key: 'transfer',
                title: '库存调拨',
                icon: 'exchange-alt',
                path: 'pages/stock/stock-transfer.html'
            },
            {
                key: 'analysis',
                title: '库存分析',
                icon: 'chart-line',
                path: 'pages/stock/stock-analysis.html'
            }
        ]
    },
    {
        key: 'production',
        title: '生产管理',
        icon: 'industry',
        children: [
            {
                key: 'bom',
                title: 'BOM管理',
                icon: 'sitemap',
                children: [
                    { key: 'material', title: '物料管理', icon: 'boxes', path: 'pages/production/bom/material.html' },
                    { key: 'structure', title: '结构管理', icon: 'project-diagram', path: 'pages/production/bom/structure.html' },
                    { key: 'process', title: '工艺路线', icon: 'route', path: 'pages/production/bom/process.html' }
                ]
            },
            {
                key: 'plan',
                title: '生产计划',
                icon: 'calendar-alt',
                path: 'pages/production/plan/index.html'
            },
            {
                key: 'workorder',
                title: '工单管理',
                icon: 'tasks',
                path: 'pages/production/workorder/index.html'
            },
            {
                key: 'report',
                title: '生产报工',
                icon: 'clipboard-list',
                children: [
                    { 
                        key: 'daily-report', 
                        title: '日报表', 
                        icon: 'calendar-day', 
                        path: 'pages/production/report/daily.html'
                    },
                    { 
                        key: 'summary-report', 
                        title: '汇总报表', 
                        icon: 'list-alt', 
                        path: 'pages/production/report/summary.html'
                    },
                    { 
                        key: 'analysis-report', 
                        title: '分析报表', 
                        icon: 'chart-line', 
                        path: 'pages/production/report/analysis.html'
                    }
                ]
            },
            {
                key: 'process',
                title: '生产过程',
                icon: 'cogs',
                path: 'pages/production/process/index.html'
            },
            {
                key: 'collect',
                title: '数据采集',
                icon: 'database',
                children: [
                    {
                        key: 'material-collect',
                        title: '物料采集',
                        icon: 'box',
                        path: 'pages/production/collect/material.html'
                    },
                    {
                        key: 'progress-collect',
                        title: '进度采集',
                        icon: 'tasks',
                        path: 'pages/production/collect/progress.html'
                    },
                    {
                        key: 'energy-collect',
                        title: '能耗采集',
                        icon: 'bolt',
                        path: 'pages/production/collect/energy.html'
                    }
                ]
            },
            {
                key: 'analysis',
                title: '生产分析',
                icon: 'chart-bar',
                children: [
                    {
                        key: 'energy-analysis',
                        title: '能耗分析',
                        icon: 'bolt',
                        path: 'pages/production/analysis/energy.html'
                    },
                    {
                        key: 'cost-analysis',
                        title: '成本分析',
                        icon: 'dollar-sign',
                        path: 'pages/production/analysis/cost.html'
                    },
                    {
                        key: 'capacity-analysis',
                        title: '产能分析',
                        icon: 'industry',
                        path: 'pages/production/analysis/capacity.html'
                    },
                    {
                        key: 'efficiency-analysis',
                        title: '效率分析',
                        icon: 'tachometer-alt',
                        path: 'pages/production/analysis/efficiency.html'
                    },
                    {
                        key: 'quality-analysis',
                        title: '质量分析',
                        icon: 'check-circle',
                        path: 'pages/production/analysis/quality.html'
                    }
                ]
            }
        ]
    },
    {
        key: 'finance',
        title: '财务管理',
        icon: 'money-bill-wave',
        children: [
            {
                key: 'ledger',
                title: '总账管理',
                icon: 'book',
                children: [
                    {
                        key: 'account',
                        title: '科目设置',
                        icon: 'cog',
                        path: 'pages/finance/ledger/account.html'
                    },
                    {
                        key: 'voucher',
                        title: '凭证管理',
                        icon: 'file-invoice',
                        path: 'pages/finance/ledger/voucher.html'
                    },
                    {
                        key: 'book',
                        title: '账簿查询',
                        icon: 'book-open',
                        path: 'pages/finance/ledger/book.html'
                    }
                ]
            },
            {
                key: 'receivable',
                title: '应收管理',
                icon: 'hand-holding-usd',
                children: [
                    {
                        key: 'bill',
                        title: '应收单',
                        path: 'pages/finance/receivable/bill.html'
                    },
                    {
                        key: 'receipt',
                        title: '收款单',
                        path: 'pages/finance/receivable/receipt.html'
                    },
                    {
                        key: 'aging',
                        title: '应收账龄',
                        path: 'pages/finance/receivable/aging.html'
                    }
                ]
            },
            {
                key: 'payable',
                title: '应付管理',
                icon: 'credit-card',
                children: [
                    {
                        key: 'bill',
                        title: '应付单',
                        path: 'pages/finance/payable/bill.html'
                    },
                    {
                        key: 'payment',
                        title: '付款单',
                        path: 'pages/finance/payable/payment.html'
                    },
                    {
                        key: 'aging',
                        title: '应付账龄',
                        path: 'pages/finance/payable/aging.html'
                    }
                ]
            },
            {
                key: 'cost',
                title: '成本管理',
                icon: 'calculator',
                children: [
                    {
                        key: 'cost-accounting',
                        title: '成本核算',
                        path: 'pages/finance/cost/cost-accounting.html'
                    },
                    {
                        key: 'cost-analysis',
                        title: '成本分析',
                        path: 'pages/finance/cost/cost-analysis.html'
                    },
                    {
                        key: 'cost-report',
                        title: '成本报表',
                        path: 'pages/finance/cost/cost-report.html'
                    }
                ]
            },
            {
                key: 'invoice',
                title: '发票管理',
                icon: 'file-invoice',
                children: [
                    {
                        key: 'invoice-management',
                        title: '发票管理',
                        path: 'pages/finance/invoice/index.html'
                    },
                    {
                        key: 'invoice-statistics',
                        title: '发票统计',
                        path: 'pages/finance/invoice/statistics.html'
                    }
                ]
            },
            {
                key: 'expense',
                title: '费用管理',
                icon: 'receipt',
                children: [
                    {
                        key: 'expense-management',
                        title: '费用管理',
                        path: 'pages/finance/expense/index.html'
                    },
                    {
                        key: 'expense-statistics',
                        title: '费用统计',
                        path: 'pages/finance/expense/statistics.html'
                    }
                ]
            },
            {
                key: 'analysis',
                title: '财务分析',
                icon: 'chart-bar',
                path: 'pages/finance/analysis/index.html'
            }
        ]
    },
    {
        key: 'system',
        title: '系统管理',
        icon: 'cog',
        children: [
            {
                key: 'user',
                title: '用户管理',
                icon: 'user-cog',
                path: 'pages/system/user.html'
            },
            {
                key: 'role',
                title: '角色管理',
                icon: 'users-cog',
                path: 'pages/system/role.html'
            },
            {
                key: 'permission',
                title: '权限管理',
                icon: 'lock',
                path: 'pages/system/permission.html'
            },
            {
                key: 'log',
                title: '日志管理',
                icon: 'history',
                path: 'pages/system/log.html'
            },
            {
                key: 'monitor',
                title: '系统监控',
                icon: 'desktop',
                path: 'pages/system/monitor.html'
            },
            {
                key: 'config',
                title: '系统配置',
                icon: 'sliders-h',
                path: 'pages/system/config.html'
            },
            {
                key: 'backup',
                title: '系统备份',
                icon: 'database',
                path: 'pages/system/backup.html'
            },
            {
                key: 'recovery',
                title: '系统恢复',
                icon: 'redo',
                path: 'pages/system/recovery.html'
            }
        ]
    },
    {
        key: 'operation',
        title: '经营计划',
        icon: 'chart-line',
        children: [
            {
                key: 'target',
                title: '计划制定',
                icon: 'bullseye',
                path: 'pages/operation/plan/target/index.html'
            },
            {
                key: 'adjust',
                title: '计划调整',
                icon: 'sliders-h',
                path: 'pages/operation/plan/adjust/index.html'
            },
            {
                key: 'analysis',
                title: '计划分析',
                icon: 'chart-bar',
                path: 'pages/operation/plan/analysis/index.html'
            }
        ]
    },
    {
        key: 'quality',
        title: '质量管理',
        icon: 'vial',
        children: [
            {
                key: 'inspection',
                title: '检验管理',
                icon: 'microscope',
                children: [
                    {
                        key: 'inspection-scheme',
                        title: '检验方案',
                        icon: 'clipboard-list',
                        path: 'pages/quality/inspection/scheme.html'
                    },
                    {
                        key: 'inbound-inspection',
                        title: '入库检验',
                        icon: 'clipboard-check',
                        path: 'pages/quality/inspection/inbound.html'
                    },
                    {
                        key: 'outbound-inspection',
                        title: '出库检验',
                        icon: 'tasks',
                        path: 'pages/quality/inspection/outbound.html'
                    }
                ]
            },
            {
                key: 'quality-standard',
                title: '质量标准',
                icon: 'ruler',
                path: 'pages/quality/standard/index.html'
            },
            {
                key: 'quality-report',
                title: '质量报表',
                icon: 'chart-bar',
                path: 'pages/quality/report/index.html'
            }
        ]
    }
];

// 菜单管理
const Menu = {
    // 渲染菜单
    renderMenu() {
        const menuContainer = document.querySelector('.main-menu');
        if (!menuContainer) return;

        // 渲染一级菜单
        menuContainer.innerHTML = menuConfig.map(module => `
            <div class="menu-module" data-key="${module.key}">
                <div class="module-title">
                    <i class="fas fa-${module.icon}"></i>
                    <span>${module.title}</span>
                    <i class="fas fa-chevron-down icon-arrow"></i>
                </div>
                ${this.renderSubMenu(module.children)}
            </div>
        `).join('');

        this.bindEvents();
        this.setActiveMenu();
    },

    // 渲染子菜单
    renderSubMenu(items) {
        if (!items) return '';

        return `
            <ul class="sub-menu">
                ${items.map(item => `
                    <li class="menu-item" data-key="${item.key}">
                        ${item.children ? `
                            <div class="menu-group">
                                <i class="fas fa-${item.icon || 'circle'}"></i>
                                <span>${item.title}</span>
                                <i class="fas fa-chevron-down icon-arrow"></i>
                            </div>
                            ${this.renderSubMenu(item.children)}
                        ` : `
                            <a href="${processPath(item.path)}" class="menu-link">
                                <i class="fas fa-${item.icon || 'circle'}"></i>
                                <span>${item.title}</span>
                            </a>
                        `}
                    </li>
                `).join('')}
            </ul>
        `;
    },

    // 绑定事件
    bindEvents() {
        // 模块标题点击事件
        document.querySelectorAll('.module-title').forEach(title => {
            title.addEventListener('click', () => {
                const menuModule = title.closest('.menu-module');
                this.toggleModule(menuModule);
            });
        });

        // 菜单组点击事件
        document.querySelectorAll('.menu-group').forEach(group => {
            group.addEventListener('click', () => {
                const menuItem = group.closest('.menu-item');
                this.toggleSubMenu(menuItem);
            });
        });
    },

    // 切换模块展开状态
    toggleModule(menuModule) {
        const subMenu = menuModule.querySelector('.sub-menu');
        if (subMenu) {
            menuModule.classList.toggle('expanded');
            const isExpanded = menuModule.classList.contains('expanded');
            subMenu.style.display = isExpanded ? 'block' : 'none';
        }
    },

    // 切换子菜单
    toggleSubMenu(menuItem) {
        const subMenu = menuItem.querySelector('.sub-menu');
        if (subMenu) {
            menuItem.classList.toggle('expanded');
            const isExpanded = menuItem.classList.contains('expanded');
            subMenu.style.display = isExpanded ? 'block' : 'none';
        }
    },

    // 设置当前激活的菜单
    setActiveMenu() {
        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll('.menu-link');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath.includes(href)) {
                const menuItem = link.closest('.menu-item');
                const menuModule = link.closest('.menu-module');
                
                // 激活当前菜单项
                menuItem.classList.add('active');
                
                // 展开父级菜单
                const parentSubMenu = menuItem.closest('.sub-menu');
                if (parentSubMenu) {
                    parentSubMenu.style.display = 'block';
                    const parentMenuItem = parentSubMenu.closest('.menu-item');
                    if (parentMenuItem) {
                        parentMenuItem.classList.add('expanded');
                    }
                }
                
                // 展开模块
                if (menuModule) {
                    menuModule.classList.add('expanded');
                    const moduleSubMenu = menuModule.querySelector('.sub-menu');
                    if (moduleSubMenu) {
                        moduleSubMenu.style.display = 'block';
                    }
                }
            }
        });
    }
};

// 初始化菜单切换功能
function initMenuToggle() {
    const toggleBtn = document.querySelector('.toggle-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });
    }
}

// 初始化销售趋势图表
function initSalesChart() {
    const chart = echarts.init(document.getElementById('salesChart'));
    
    const option = {
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
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '销售额',
            type: 'line',
            data: [12000, 15000, 14000, 18000, 16000, 20000, 22000],
            smooth: true,
            lineStyle: {
                color: '#81D8D0'
            },
            itemStyle: {
                color: '#81D8D0'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(129, 216, 208, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(129, 216, 208, 0.1)'
                }])
            }
        }]
    };
    
    chart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 初始化生产计划图表
function initProductionChart() {
    const chart = echarts.init(document.getElementById('productionChart'));
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        series: [{
            name: '生产计划',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 735, name: '已完成', itemStyle: { color: '#81D8D0' } },
                { value: 580, name: '进行中', itemStyle: { color: '#A5E6E1' } },
                { value: 484, name: '未开始', itemStyle: { color: '#C9F0EC' } },
                { value: 300, name: '已延期', itemStyle: { color: '#ff6b6b' } }
            ]
        }]
    };
    
    chart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    // 初始化销售趋势图表
    initSalesChart();
    // 初始化生产计划图表
    initProductionChart();
    // 初始化菜单切换功能
    initMenuToggle();
}); 