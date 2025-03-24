// 页面加载完成后初始化菜单
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单
    initMenu();
    
    // 添加菜单交互
    setupMenuInteractions();
});

// 初始化菜单
function initMenu() {
    // 获取菜单容器
    const menuContainer = document.querySelector('.main-menu');
    if (!menuContainer) return;
    
    // 菜单数据
    const menuData = [
        {
            icon: 'fas fa-home',
            text: '首页',
            link: getRelativePath('index.html')
        },
        {
            icon: 'fas fa-shopping-cart',
            text: '销售管理',
            children: [
                { text: '订单管理', link: getRelativePath('pages/sales/order/list.html') },
                { text: '客户管理', link: getRelativePath('pages/sales/customer/list.html') },
                { text: '合同管理', link: getRelativePath('pages/sales/contract/list.html') }
            ]
        },
        {
            icon: 'fas fa-shopping-bag',
            text: '采购管理',
            children: [
                { text: '采购需求', link: getRelativePath('pages/purchase/demand.html') },
                { text: '采购订单', link: getRelativePath('pages/purchase/order.html') },
                { text: '供应商管理', link: getRelativePath('pages/purchase/supplier.html') }
            ]
        },
        {
            icon: 'fas fa-warehouse',
            text: '库存管理',
            children: [
                { text: '入库管理', link: getRelativePath('pages/inventory/inbound/list.html') },
                { text: '出库管理', link: getRelativePath('pages/inventory/outbound/list.html') },
                { text: '库存查询', link: getRelativePath('pages/inventory/stock/list.html') }
            ]
        },
        {
            icon: 'fas fa-industry',
            text: '生产管理',
            children: [
                { text: '生产计划', link: getRelativePath('pages/production/plan/list.html') },
                { text: '生产任务', link: getRelativePath('pages/production/task/list.html') },
                { text: '工艺管理', link: getRelativePath('pages/production/process/list.html') },
                { text: '标准管理', link: getRelativePath('pages/production/standard/manage.html') }
            ]
        },
        {
            icon: 'fas fa-money-bill-wave',
            text: '财务管理',
            children: [
                { text: '应收管理', link: getRelativePath('pages/finance/receivable/list.html') },
                { text: '应付管理', link: getRelativePath('pages/finance/payable/list.html') },
                { text: '费用报销', link: getRelativePath('pages/finance/expense/list.html') }
            ]
        },
        {
            icon: 'fas fa-chart-line',
            text: '统计分析',
            children: [
                { text: '销售分析', link: getRelativePath('pages/analytics/sales/dashboard.html') },
                { text: '生产分析', link: getRelativePath('pages/analytics/production/dashboard.html') },
                { text: '库存分析', link: getRelativePath('pages/analytics/inventory/dashboard.html') }
            ]
        },
        {
            icon: 'fas fa-cog',
            text: '系统设置',
            children: [
                { text: '用户管理', link: getRelativePath('pages/settings/user/list.html') },
                { text: '角色管理', link: getRelativePath('pages/settings/role/list.html') },
                { text: '权限设置', link: getRelativePath('pages/settings/permission/list.html') },
                { text: '系统参数', link: getRelativePath('pages/settings/parameter/list.html') }
            ]
        }
    ];
    
    // 生成菜单HTML
    let menuHTML = '<ul>';
    
    menuData.forEach(item => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = checkActive(item);
        
        menuHTML += `<li class="${isActive ? 'active' : ''}">`;
        
        if (hasChildren) {
            menuHTML += `
                <div class="menu-item">
                    <i class="${item.icon}"></i>
                    <span>${item.text}</span>
                    <i class="fas fa-chevron-down arrow ${isActive ? 'rotate' : ''}"></i>
                </div>
                <ul class="submenu" style="${isActive ? 'display: block;' : ''}">
            `;
            
            item.children.forEach(child => {
                const childIsActive = checkActive(child);
                menuHTML += `
                    <li class="${childIsActive ? 'active' : ''}">
                        <a href="${child.link}">
                            <span>${child.text}</span>
                        </a>
                    </li>
                `;
            });
            
            menuHTML += '</ul>';
        } else {
            menuHTML += `
                <a href="${item.link}" class="menu-item">
                    <i class="${item.icon}"></i>
                    <span>${item.text}</span>
                </a>
            `;
        }
        
        menuHTML += '</li>';
    });
    
    menuHTML += '</ul>';
    
    // 设置菜单HTML
    menuContainer.innerHTML = menuHTML;
}

// 设置菜单交互
function setupMenuInteractions() {
    const menuItems = document.querySelectorAll('.main-menu .menu-item');
    menuItems.forEach(item => {
        if (item.nextElementSibling && item.nextElementSibling.classList.contains('submenu')) {
            item.addEventListener('click', function() {
                const submenu = this.nextElementSibling;
                const isOpen = submenu.style.display === 'block';
                
                // 关闭其他子菜单
                document.querySelectorAll('.main-menu .submenu').forEach(menu => {
                    if (menu !== submenu) {
                        menu.style.display = 'none';
                        const arrow = menu.previousElementSibling.querySelector('.arrow');
                        if (arrow) arrow.classList.remove('rotate');
                    }
                });
                
                // 切换当前子菜单
                submenu.style.display = isOpen ? 'none' : 'block';
                const arrow = this.querySelector('.arrow');
                if (arrow) arrow.classList.toggle('rotate', !isOpen);
            });
        }
    });
    
    // 侧边栏切换
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            document.querySelector('.app-container').classList.toggle('sidebar-collapsed');
        });
    }
}

// 检查菜单项是否激活
function checkActive(item) {
    const currentPath = window.location.pathname;
    
    if (item.link && currentPath.endsWith(item.link)) {
        return true;
    }
    
    if (item.children) {
        return item.children.some(child => {
            if (child.link && currentPath.endsWith(child.link)) {
                return true;
            }
            return false;
        });
    }
    
    return false;
}

// 获取相对路径
function getRelativePath(targetPath) {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    
    // 如果是在根目录
    if (pathParts.length <= 2) {
        return targetPath;
    }
    
    // 计算需要返回的层级
    let backLevels = pathParts.length - 2; // 减去域名和最后的空字符串
    
    // 如果当前路径是文件而不是目录，再减一层
    if (pathParts[pathParts.length - 1].includes('.')) {
        backLevels--;
    }
    
    // 构建相对路径
    let relativePath = '';
    for (let i = 0; i < backLevels; i++) {
        relativePath += '../';
    }
    
    return relativePath + targetPath;
}