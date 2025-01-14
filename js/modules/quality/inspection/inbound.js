// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单
    initMenu();
    // 加载待检验列表
    loadInspectionList();
});

// 加载待检验列表
function loadInspectionList() {
    // 模拟数据
    const inspections = [
        {
            inboundNo: 'RK202403001',
            inspectionNo: 'JY202403001',
            supplier: '供应商A',
            warehouse: '原料仓',
            scheme: '茶叶原料入库检验',
            itemCount: 5,
            createTime: '2024-03-20 10:00:00',
            status: '1' // 1:待检验 2:检验中 3:已完成
        },
        {
            inboundNo: 'RK202403002',
            inspectionNo: 'JY202403002',
            supplier: '供应商B',
            warehouse: '成品仓',
            scheme: '成品入库检验',
            itemCount: 8,
            createTime: '2024-03-20 14:30:00',
            status: '2'
        }
    ];

    const tbody = document.getElementById('inspectionTable');
    tbody.innerHTML = inspections.map(inspection => `
        <tr>
            <td>${inspection.inboundNo}</td>
            <td>${inspection.inspectionNo}</td>
            <td>${inspection.supplier}</td>
            <td>${inspection.warehouse}</td>
            <td>${inspection.scheme}</td>
            <td>${inspection.itemCount}</td>
            <td>${inspection.createTime}</td>
            <td>
                <span class="status-badge ${getStatusClass(inspection.status)}">
                    ${getStatusName(inspection.status)}
                </span>
            </td>
            <td>
                ${getOperationButtons(inspection)}
            </td>
        </tr>
    `).join('');
}

// 获取状态样式类
function getStatusClass(status) {
    const classes = {
        '1': 'warning',  // 待检验
        '2': 'primary',  // 检验中
        '3': 'success'   // 已完成
    };
    return classes[status] || '';
}

// 获取状态名称
function getStatusName(status) {
    const names = {
        '1': '待检验',
        '2': '检验中',
        '3': '已完成'
    };
    return names[status] || status;
}

// 获取操作按钮
function getOperationButtons(inspection) {
    if (inspection.status === '1') {
        return `
            <button class="button-link" onclick="startInspection('${inspection.inspectionNo}')">开始检验</button>
            <button class="button-link" onclick="selectScheme('${inspection.inspectionNo}')">选择方案</button>
        `;
    } else if (inspection.status === '2') {
        return `
            <button class="button-link" onclick="continueInspection('${inspection.inspectionNo}')">继续检验</button>
            <button class="button-link" onclick="viewInspection('${inspection.inspectionNo}')">查看</button>
        `;
    } else {
        return `
            <button class="button-link" onclick="viewInspection('${inspection.inspectionNo}')">查看</button>
        `;
    }
}

// 开始检验
function startInspection(inspectionNo) {
    // 检查是否已选择检验方案
    const inspection = getInspectionData(inspectionNo);
    if (!inspection.scheme) {
        alert('请先选择检验方案');
        selectScheme(inspectionNo);
        return;
    }

    showInspectionModal(inspectionNo);
}

// 继续检验
function continueInspection(inspectionNo) {
    showInspectionModal(inspectionNo);
}

// 查看检验
function viewInspection(inspectionNo) {
    showInspectionModal(inspectionNo, true);
}

// 选择检验方案
function selectScheme(inspectionNo) {
    // 保存当前检验单号，用于确认选择时使用
    document.getElementById('schemeSelectorModal').dataset.inspectionNo = inspectionNo;
    showModal('schemeSelectorModal');
    loadSchemeList();
}

// 加载检验方案列表
function loadSchemeList() {
    // 模拟数据
    const schemes = [
        {
            id: 'JY202403001',
            name: '茶叶原料入库检验',
            materialType: '原料',
            itemCount: 5,
            status: '1'
        },
        {
            id: 'JY202403002',
            name: '成品入库检验',
            materialType: '成品',
            itemCount: 8,
            status: '1'
        }
    ];

    const tbody = document.getElementById('schemeList');
    tbody.innerHTML = schemes.map(scheme => `
        <tr>
            <td>
                <input type="radio" name="scheme" value="${scheme.id}">
            </td>
            <td>${scheme.id}</td>
            <td>${scheme.name}</td>
            <td>${scheme.materialType}</td>
            <td>${scheme.itemCount}</td>
            <td>
                <span class="status-badge ${scheme.status === '1' ? 'success' : 'warning'}">
                    ${scheme.status === '1' ? '启用' : '停用'}
                </span>
            </td>
        </tr>
    `).join('');
}

// 确认选择检验方案
function confirmSelectScheme() {
    const selectedScheme = document.querySelector('#schemeList input[type="radio"]:checked');
    if (!selectedScheme) {
        alert('请选择检验方案');
        return;
    }

    const inspectionNo = document.getElementById('schemeSelectorModal').dataset.inspectionNo;
    // TODO: 调用后端API保存选择的方案
    console.log(`为检验单 ${inspectionNo} 选择方案 ${selectedScheme.value}`);
    
    hideModal('schemeSelectorModal');
    loadInspectionList(); // 刷新列表
}

// 显示检验操作弹窗
function showInspectionModal(inspectionNo, readonly = false) {
    const inspection = getInspectionData(inspectionNo);
    
    // 填充基本信息
    document.getElementById('inboundNo').textContent = inspection.inboundNo;
    document.getElementById('inspectionNo').textContent = inspection.inspectionNo;
    document.getElementById('supplier').textContent = inspection.supplier;
    document.getElementById('warehouse').textContent = inspection.warehouse;
    document.getElementById('scheme').textContent = inspection.scheme;
    document.getElementById('inspector').textContent = inspection.inspector;

    // 填充商品信息
    document.getElementById('productInfo').innerHTML = inspection.products.map(product => `
        <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.specification}</td>
            <td>${product.batchNo}</td>
            <td>${product.quantity}</td>
            <td>
                ${readonly ? product.sampleQty : `
                    <input type="number" class="standard-input small" value="${product.sampleQty || ''}"
                           onchange="updateSampleQty(this)" min="1" max="${product.quantity}">
                `}
            </td>
            <td>${product.unit}</td>
        </tr>
    `).join('');

    // 填充检验项目
    document.getElementById('inspectionItems').innerHTML = inspection.items.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.method}</td>
            <td>${item.standard}</td>
            <td>${item.upperLimit || '-'}</td>
            <td>${item.lowerLimit || '-'}</td>
            <td>
                ${readonly ? item.result : `
                    <input type="text" class="standard-input small" value="${item.result || ''}"
                           onchange="checkResult(this)">
                `}
            </td>
            <td>
                ${readonly ? getQualifiedName(item.qualified) : `
                    <select class="standard-select small" onchange="updateQualified(this)">
                        <option value="">请选择</option>
                        <option value="1" ${item.qualified === '1' ? 'selected' : ''}>合格</option>
                        <option value="0" ${item.qualified === '0' ? 'selected' : ''}>不合格</option>
                    </select>
                `}
            </td>
            <td>
                ${readonly ? (item.remark || '-') : `
                    <input type="text" class="standard-input small" value="${item.remark || ''}"
                           placeholder="请输入备注">
                `}
            </td>
        </tr>
    `).join('');

    // 填充检验结论
    if (inspection.conclusion) {
        document.getElementById('inspectionResult').value = inspection.conclusion.result;
        document.getElementById('handleSuggestion').value = inspection.conclusion.suggestion;
        document.getElementById('inspectionRemark').value = inspection.conclusion.remark;
    }

    // 设置只读状态
    if (readonly) {
        document.querySelectorAll('#inspectionModal input, #inspectionModal select, #inspectionModal textarea')
            .forEach(el => el.disabled = true);
        document.querySelector('#inspectionModal .modal-footer').style.display = 'none';
    } else {
        document.querySelectorAll('#inspectionModal input, #inspectionModal select, #inspectionModal textarea')
            .forEach(el => el.disabled = false);
        document.querySelector('#inspectionModal .modal-footer').style.display = 'flex';
    }

    showModal('inspectionModal');
}

// 获取检验单数据
function getInspectionData(inspectionNo) {
    // 模拟数据
    return {
        inboundNo: 'RK202403001',
        inspectionNo: 'JY202403001',
        supplier: '供应商A',
        warehouse: '原料仓',
        scheme: '茶叶原料入库检验',
        inspector: '张三',
        products: [
            {
                code: 'P001',
                name: '特级铁观音',
                specification: '250g/盒',
                batchNo: 'B202403001',
                quantity: 100,
                sampleQty: 10,
                unit: '盒'
            }
        ],
        items: [
            {
                name: '外观',
                method: '目测',
                standard: '色泽鲜艳',
                upperLimit: '',
                lowerLimit: '',
                result: '',
                qualified: '',
                remark: ''
            },
            {
                name: '水分',
                method: '烘干法',
                standard: '5%',
                upperLimit: '6%',
                lowerLimit: '4%',
                result: '',
                qualified: '',
                remark: ''
            }
        ],
        conclusion: {
            result: '',
            suggestion: '',
            remark: ''
        }
    };
}

// 更新抽样数量
function updateSampleQty(input) {
    const tr = input.closest('tr');
    const maxQty = parseInt(tr.cells[4].textContent);
    const qty = parseInt(input.value);
    
    if (isNaN(qty) || qty < 1) {
        input.value = 1;
    } else if (qty > maxQty) {
        input.value = maxQty;
    }
}

// 检查检验结果
function checkResult(input) {
    const tr = input.closest('tr');
    const upperLimit = tr.cells[4].textContent;
    const lowerLimit = tr.cells[5].textContent;
    const result = input.value;

    // 如果有上下限，则进行范围检查
    if (upperLimit !== '-' && lowerLimit !== '-') {
        const value = parseFloat(result);
        const upper = parseFloat(upperLimit);
        const lower = parseFloat(lowerLimit);
        
        if (!isNaN(value) && !isNaN(upper) && !isNaN(lower)) {
            const qualified = value >= lower && value <= upper ? '1' : '0';
            tr.querySelector('select').value = qualified;
        }
    }
}

// 更新合格状态
function updateQualified(select) {
    // 可以在这里添加一些联动逻辑
}

// 获取合格状态名称
function getQualifiedName(qualified) {
    const names = {
        '1': '<span class="status-badge success">合格</span>',
        '0': '<span class="status-badge danger">不合格</span>'
    };
    return names[qualified] || '-';
}

// 保存草稿
function saveAsDraft() {
    const data = collectInspectionData();
    // TODO: 调用后端API保存草稿
    console.log('保存检验草稿：', data);
    
    hideModal('inspectionModal');
    loadInspectionList(); // 刷新列表
}

// 提交检验
function submitInspection() {
    const data = collectInspectionData();
    
    // 验证数据
    if (!validateInspectionData(data)) {
        return;
    }

    // TODO: 调用后端API提交检验
    console.log('提交检验数据：', data);
    
    hideModal('inspectionModal');
    loadInspectionList(); // 刷新列表
}

// 收集检验数据
function collectInspectionData() {
    const products = [];
    document.querySelectorAll('#productInfo tr').forEach(tr => {
        products.push({
            code: tr.cells[0].textContent,
            name: tr.cells[1].textContent,
            specification: tr.cells[2].textContent,
            batchNo: tr.cells[3].textContent,
            quantity: parseInt(tr.cells[4].textContent),
            sampleQty: parseInt(tr.cells[5].querySelector('input').value),
            unit: tr.cells[6].textContent
        });
    });

    const items = [];
    document.querySelectorAll('#inspectionItems tr').forEach(tr => {
        items.push({
            name: tr.cells[1].textContent,
            method: tr.cells[2].textContent,
            standard: tr.cells[3].textContent,
            upperLimit: tr.cells[4].textContent,
            lowerLimit: tr.cells[5].textContent,
            result: tr.cells[6].querySelector('input').value,
            qualified: tr.cells[7].querySelector('select').value,
            remark: tr.cells[8].querySelector('input').value
        });
    });

    return {
        inboundNo: document.getElementById('inboundNo').textContent,
        inspectionNo: document.getElementById('inspectionNo').textContent,
        products: products,
        items: items,
        conclusion: {
            result: document.getElementById('inspectionResult').value,
            suggestion: document.getElementById('handleSuggestion').value,
            remark: document.getElementById('inspectionRemark').value
        }
    };
}

// 验证检验数据
function validateInspectionData(data) {
    // 验证抽样数量
    for (const product of data.products) {
        if (!product.sampleQty) {
            alert('请输入抽样数量');
            return false;
        }
    }

    // 验证检验项目
    for (const item of data.items) {
        if (!item.result) {
            alert('请输入检验结果');
            return false;
        }
        if (!item.qualified) {
            alert('请选择是否合格');
            return false;
        }
    }

    // 验证检验结论
    if (!data.conclusion.result) {
        alert('请选择检验结果');
        return false;
    }
    if (!data.conclusion.suggestion) {
        alert('请选择处理意见');
        return false;
    }

    return true;
}

// 搜索检验单
function searchInspection() {
    // TODO: 实现搜索功能
    loadInspectionList();
}

// 导出检验单
function exportInspection() {
    // TODO: 实现导出功能
    console.log('导出检验单');
}

// 搜索检验方案
function searchSchemes() {
    // TODO: 实现检验方案搜索
    loadSchemeList();
}

// 显示模态框
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// 隐藏模态框
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
} 