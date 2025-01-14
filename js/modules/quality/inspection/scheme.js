// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单
    initMenu();
    // 加载检验方案列表
    loadSchemeList();
    // 绑定添加检验项目按钮的点击事件
    const addItemBtn = document.querySelector('button[onclick="showItemSelectorModal()"]');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', showItemSelectorModal);
    }

    // 绑定模态框背景点击关闭事件
    const modals = document.querySelectorAll('.standard-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// 加载检验方案列表
function loadSchemeList() {
    // 模拟数据
    const schemes = [
        {
            id: 'SP202403010001',
            name: '原料入库检验方案A',
            type: '入库检验',
            materialType: '原料',
            itemCount: 8,
            creator: '张三',
            createTime: '2024-03-01',
            status: '1'  // 启用
        },
        {
            id: 'SP202403010002',
            name: '成品出库检验方案B',
            type: '出库检验',
            materialType: '成品',
            itemCount: 6,
            creator: '李四',
            createTime: '2024-03-02',
            status: '0'  // 停用
        },
        {
            id: 'SP202403010003',
            name: '半成品生产检验方案C',
            type: '生产检验',
            materialType: '半成品',
            itemCount: 10,
            creator: '王五',
            createTime: '2024-03-03',
            status: '1'  // 启用
        },
        {
            id: 'SP202403010004',
            name: '原料入库检验方案D',
            type: '入库检验',
            materialType: '原料',
            itemCount: 5,
            creator: '赵六',
            createTime: '2024-03-04',
            status: '0'  // 停用
        }
    ];

    const tbody = document.getElementById('schemeTable');
    tbody.innerHTML = schemes.map(scheme => `
        <tr>
            <td>${scheme.id}</td>
            <td>${scheme.name}</td>
            <td>${scheme.type}</td>
            <td>${scheme.materialType}</td>
            <td>${scheme.itemCount}</td>
            <td>${scheme.creator}</td>
            <td>${scheme.createTime}</td>
            <td>
                <span class="status-badge ${scheme.status === '1' ? 'success' : 'warning'}">
                    ${scheme.status === '1' ? '启用' : '停用'}
                </span>
            </td>
            <td>
                <div class="operation-buttons">
                    <button class="standard-button small" onclick="viewScheme('${scheme.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="standard-button small" onclick="editScheme('${scheme.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="standard-button small ${scheme.status === '1' ? 'danger' : 'success'}" 
                            onclick="toggleSchemeStatus('${scheme.id}', '${scheme.status}')">
                        <i class="fas fa-${scheme.status === '1' ? 'ban' : 'check'}"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 显示新增方案弹窗
function showSchemeModal() {
    const modal = document.getElementById('schemeModal');
    if (modal) {
        // 重置表单
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        // 生成新的方案编号
        const schemeCode = generateSchemeCode();
        const codeInput = modal.querySelector('input[name="schemeCode"]');
        if (codeInput) {
            codeInput.value = schemeCode;
        }
        // 清空检验项目表格
        const itemTable = document.getElementById('itemTable');
        if (itemTable) {
            itemTable.innerHTML = '';
        }
        // 显示弹窗
        modal.style.display = 'flex';
    }
}

// 生成方案编号
function generateSchemeCode() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `SP${year}${month}${day}${random}`;
}

// 编辑检验方案
function editScheme(id) {
    document.getElementById('modalTitle').textContent = '编辑检验方案';
    
    // 模拟获取方案数据
    const scheme = {
        id: 'JY202403001',
        name: '茶叶原料入库检验',
        type: '1',
        materialType: '1',
        status: '1',
        remark: '适用于茶叶原料入库检验',
        items: [
            {
                id: 1,
                name: '外观',
                method: '目测',
                standard: '色泽鲜艳',
                upperLimit: '',
                lowerLimit: '',
                required: true
            },
            {
                id: 2,
                name: '水分',
                method: '烘干法',
                standard: '5%',
                upperLimit: '6%',
                lowerLimit: '4%',
                required: true
            }
        ]
    };

    // 填充表单数据
    const form = document.getElementById('schemeForm');
    form.name.value = scheme.name;
    form.type.value = scheme.type;
    form.materialType.value = scheme.materialType;
    form.status.value = scheme.status;
    form.remark.value = scheme.remark;

    // 填充检验项目
    const tbody = document.getElementById('inspectionItems');
    tbody.innerHTML = scheme.items.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.method}</td>
            <td>${item.standard}</td>
            <td>${item.upperLimit}</td>
            <td>${item.lowerLimit}</td>
            <td>
                <input type="checkbox" ${item.required ? 'checked' : ''}>
            </td>
            <td>
                <button type="button" class="button-link" onclick="removeInspectionItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    showModal('schemeModal');
}

// 查看检验方案
function viewScheme(id) {
    // 实现查看功能
    editScheme(id); // 复用编辑功能，但需要禁用所有输入框
    const form = document.getElementById('schemeForm');
    form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
    document.querySelector('#schemeModal .modal-footer').style.display = 'none';
}

// 切换方案状态
function toggleSchemeStatus(id, currentStatus) {
    const newStatus = currentStatus === '1' ? '0' : '1';
    const action = newStatus === '1' ? '启用' : '停用';
    
    if (confirm(`确定要${action}该检验方案吗？`)) {
        // TODO: 调用后端API更新状态
        console.log(`更新方案 ${id} 的状态为 ${newStatus}`);
        // 刷新列表
        loadSchemeList();
    }
}

// 添加检验项目
function addInspectionItem() {
    showModal('itemSelectorModal');
    loadInspectionItems();
}

// 加载检验项目列表
function loadInspectionItems() {
    // 模拟数据
    const items = [
        {
            id: 'JX001',
            name: '外观',
            type: '感官指标',
            method: '目测',
            standard: '色泽鲜艳'
        },
        {
            id: 'JX002',
            name: '水分',
            type: '理化指标',
            method: '烘干法',
            standard: '≤6.5%'
        },
        {
            id: 'JX003',
            name: '杂质',
            type: '感官指标',
            method: '目测',
            standard: '≤0.1%'
        },
        {
            id: 'JX004',
            name: '香气',
            type: '感官指标',
            method: '嗅觉',
            standard: '清香纯正'
        },
        {
            id: 'JX005',
            name: '农残',
            type: '理化指标',
            method: '农残速测',
            standard: '≤0.1mg/kg'
        }
    ];

    const tbody = document.getElementById('itemList');
    if (tbody) {
        tbody.innerHTML = items.map(item => `
            <tr>
                <td><input type="checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.method}</td>
                <td>${item.standard}</td>
            </tr>
        `).join('');
    }
}

// 确认选择检验项目
function confirmSelectItems() {
    const selectedItems = [];
    const itemCheckboxes = document.querySelectorAll('#itemList input[type="checkbox"]:checked');
    
    itemCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const item = {
            id: checkbox.value,
            name: row.cells[2].textContent,
            method: row.cells[4].textContent,
            standard: row.cells[5].textContent
        };
        selectedItems.push(item);
    });

    // 添加选中的项目到检验方案
    const itemTable = document.getElementById('itemTable');
    if (itemTable) {
        selectedItems.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${itemTable.rows.length + 1}</td>
                <td>${item.name}</td>
                <td>${item.method}</td>
                <td>${item.standard}</td>
                <td><input type="text" class="standard-input" style="width: 80px;"></td>
                <td><input type="text" class="standard-input" style="width: 80px;"></td>
                <td><input type="checkbox" checked></td>
                <td>
                    <button class="standard-button small danger" onclick="removeItem(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            itemTable.appendChild(newRow);
        });
    }

    hideModal('itemSelectorModal');
}

// 移除检验项目
function removeInspectionItem(button) {
    if (confirm('确定要移除该检验项目吗？')) {
        const tr = button.closest('tr');
        tr.remove();
        // 重新编号
        const tbody = document.getElementById('inspectionItems');
        Array.from(tbody.children).forEach((tr, index) => {
            tr.cells[0].textContent = index + 1;
        });
    }
}

// 保存检验方案
function saveScheme() {
    const form = document.getElementById('schemeForm');
    const items = [];
    
    // 收集检验项目数据
    document.querySelectorAll('#inspectionItems tr').forEach(tr => {
        items.push({
            name: tr.cells[1].textContent,
            method: tr.cells[2].textContent,
            standard: tr.cells[3].textContent,
            upperLimit: tr.cells[4].querySelector('input').value,
            lowerLimit: tr.cells[5].querySelector('input').value,
            required: tr.cells[6].querySelector('input').checked
        });
    });

    const data = {
        name: form.name.value,
        type: form.type.value,
        materialType: form.materialType.value,
        status: form.status.value,
        remark: form.remark.value,
        items: items
    };

    // TODO: 调用后端API保存数据
    console.log('保存检验方案：', data);
    
    hideModal('schemeModal');
    loadSchemeList(); // 刷新列表
}

// 搜索检验方案
function searchScheme() {
    // TODO: 实现搜索功能
    loadSchemeList();
}

// 导出检验方案
function exportScheme() {
    // TODO: 实现导出功能
    console.log('导出检验方案');
}

// 搜索检验项目
function searchItems() {
    const keyword = document.querySelector('#itemSelectorModal input[type="text"]').value;
    const type = document.querySelector('#itemSelectorModal select').value;
    console.log('搜索检验项目:', { keyword, type });
    // TODO: 实现搜索逻辑
}

// 显示模态框
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// 隐藏模态框
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 显示检验项目选择弹窗
function showItemSelector() {
    const modal = document.getElementById('itemSelectorModal');
    if (modal) {
        // 加载检验项目列表
        loadInspectionItems();
        modal.style.display = 'flex';
    }
}

// 隐藏检验项目选择弹窗
function hideItemSelectorModal() {
    const modal = document.getElementById('itemSelectorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 切换全选/取消全选
function toggleAllItems(checkbox) {
    const itemCheckboxes = document.querySelectorAll('#itemList input[type="checkbox"]');
    itemCheckboxes.forEach(item => {
        item.checked = checkbox.checked;
    });
}

// 移除检验项目
function removeItem(button) {
    const row = button.closest('tr');
    if (row) {
        row.remove();
        // 重新编号
        const rows = document.querySelectorAll('#itemTable tr');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }
}

// 在页面加载完成后绑定事件
document.addEventListener('DOMContentLoaded', function() {
    // 绑定添加检验项目按钮的点击事件
    const addItemBtn = document.querySelector('button[onclick="showItemSelectorModal()"]');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', showItemSelectorModal);
    }

    // 绑定模态框背景点击关闭事件
    const modals = document.querySelectorAll('.standard-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}); 