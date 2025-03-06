// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 底部导航切换
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPageId = this.getAttribute('data-page');
            
            // 隐藏所有页面
            document.querySelectorAll('.page-container').forEach(page => {
                page.classList.add('hidden');
            });
            
            // 显示目标页面
            document.getElementById(targetPageId).classList.remove('hidden');
            
            // 更新激活状态
            tabItems.forEach(tab => {
                tab.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // 筛选标签切换
    const filterTags = document.querySelectorAll('.filter-tag');
    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // 这里可以添加筛选逻辑
            });
        });
    }
    
    // 返回按钮功能
    const backButtons = document.querySelectorAll('.back');
    if (backButtons.length > 0) {
        backButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                history.back();
            });
        });
    }
});

// 弹窗功能
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex';
        popup.classList.add('fade-in');
    }
}

function hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}

// 应付管理相关功能
function viewPayable(id) {
    // 查看应付单详情
    window.location.href = `payable-detail.html?id=${id}`;
}

function applyPayment(id) {
    // 申请付款
    window.location.href = `payment-apply.html?id=${id}`;
}

// 供应商对账相关功能
function viewReconciliation(id) {
    // 查看对账单详情
    window.location.href = `reconciliation-detail.html?id=${id}`;
}

// 预付款申请相关功能
function createPrepayment() {
    // 创建预付款申请
    window.location.href = 'prepayment-create.html';
}