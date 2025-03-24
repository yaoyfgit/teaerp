// 全局变量
let currentStandardCode = '';
let isEditing = false;
let uploadedFiles = [];
let standardsData = {};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化文件上传事件监听
    const fileInput = document.getElementById('standardFile');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // 检查页面元素是否存在
    const standardTable = document.getElementById('standardTable');
    if (standardTable) {
        // 初始化表格数据
        initStandardsData();
    } else {
        console.error('找不到标准表格元素');
    }
    
    // 检查查看模态框是否存在
    const viewModal = document.getElementById('viewStandardModal');
    if (!viewModal) {
        console.error('找不到查看标准模态框');
    }
    
    // 添加搜索按钮事件监听
    const searchBtn = document.querySelector('.standard-button[onclick="searchStandards()"]');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchStandards);
    }
});

// 初始化标准数据
function initStandardsData() {
    // 这里应该是从后端获取数据，现在先用示例数据
    standardsData = {
        'GB/T 23776-2009': {
            code: 'GB/T 23776-2009',
            name: '茶叶感官审评方法',
            type: 'national',
            typeName: '国家标准',
            status: 'active',
            statusName: '生效中',
            publishDate: '2009-05-18',
            implementDate: '2009-11-01',
            summary: '本标准规定了茶叶感官审评的方法和程序。',
            scope: '适用于各类茶叶的感官品质评定。',
            keyPoints: '包括外形、色泽、香气、滋味、汤色、叶底等感官特征的评定方法。',
            files: []
        },
        'GB/T 14456-2008': {
            code: 'GB/T 14456-2008',
            name: '茶叶加工术语',
            type: 'national',
            typeName: '国家标准',
            status: 'active',
            statusName: '生效中',
            publishDate: '2008-07-21',
            implementDate: '2009-01-01',
            summary: '本标准规定了茶叶加工过程中使用的术语和定义。',
            scope: '适用于茶叶加工领域的术语规范。',
            keyPoints: '包括茶叶分类、加工工艺、品质特征等方面的术语定义。',
            files: []
        },
        'QB/T 4067-2010': {
            code: 'QB/T 4067-2010',
            name: '茶叶加工工艺通用技术条件',
            type: 'industry',
            typeName: '行业标准',
            status: 'active',
            statusName: '生效中',
            publishDate: '2010-09-15',
            implementDate: '2011-01-01',
            summary: '本标准规定了茶叶加工的通用技术要求和工艺流程。',
            scope: '适用于各类茶叶的加工生产。',
            keyPoints: '包括原料要求、工艺参数、质量控制等方面的规定。',
            files: []
        },
        'DB33/T 696-2008': {
            code: 'DB33/T 696-2008',
            name: '浙江省茶叶加工技术规范',
            type: 'local',
            typeName: '地方标准',
            status: 'active',
            statusName: '生效中',
            publishDate: '2008-11-10',
            implementDate: '2009-01-01',
            summary: '本标准规定了浙江省茶叶加工的技术要求和规范。',
            scope: '适用于浙江省内茶叶的加工生产。',
            keyPoints: '包括原料采摘、杀青、揉捻、干燥等工艺环节的技术参数和要求。',
            files: []
        },
        'TS-2023-001': {
            code: 'TS-2023-001',
            name: '龙井茶制作工艺标准',
            type: 'internal',
            typeName: '内部工艺标准',
            status: 'active',
            statusName: '生效中',
            publishDate: '2023-03-15',
            implementDate: '2023-04-01',
            summary: '本标准规定了龙井茶的制作工艺流程和质量要求。',
            scope: '适用于公司内部龙井茶的生产加工。',
            keyPoints: '包括原料选择、杀青温度、炒制手法、干燥要求等关键工艺参数。',
            files: []
        },
        'TS-2023-002': {
            code: 'TS-2023-002',
            name: '碧螺春制作工艺标准',
            type: 'internal',
            typeName: '内部工艺标准',
            status: 'draft',
            statusName: '草稿',
            publishDate: '2023-03-20',
            implementDate: '2023-04-01',
            summary: '本标准规定了碧螺春的制作工艺流程和质量要求。',
            scope: '适用于公司内部碧螺春的生产加工。',
            keyPoints: '包括原料选择、杀青温度、揉捻方法、干燥要求等关键工艺参数。',
            files: []
        }
    };
    
    refreshStandardTable();
}

// 显示新增标准模态框
function showAddStandardModal() {
    isEditing = false;
    currentStandardCode = '';
    document.getElementById('modalTitle').textContent = '新增标准';
    document.getElementById('standardForm').reset();
    document.getElementById('fileList').innerHTML = '';
    uploadedFiles = [];
    
    // 设置默认日期为当天
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('publishDate').value = today;
    document.getElementById('implementDate').value = today;
    
    // 显示模态框
    document.getElementById('standardModal').style.display = 'flex';
}

// 显示编辑标准模态框
function editStandard(code) {
    isEditing = true;
    currentStandardCode = code;
    document.getElementById('modalTitle').textContent = '编辑标准';
    
    // 获取标准数据
    const standard = standardsData[code];
    if (!standard) {
        alert('未找到标准数据');
        return;
    }
    
    // 填充表单数据
    document.getElementById('standardCode').value = standard.code;
    document.getElementById('standardName').value = standard.name;
    document.getElementById('standardTypeSelect').value = standard.type;
    document.getElementById('standardStatusSelect').value = standard.status;
    document.getElementById('publishDate').value = standard.publishDate;
    document.getElementById('implementDate').value = standard.implementDate;
    document.getElementById('standardSummary').value = standard.summary || '';
    document.getElementById('standardScope').value = standard.scope || '';
    document.getElementById('standardKeyPoints').value = standard.keyPoints || '';
    
    // 填充文件列表
    uploadedFiles = [...(standard.files || [])];
    renderFileList();
    
    // 显示模态框
    document.getElementById('standardModal').style.display = 'flex';
}

// 关闭标准模态框
function closeStandardModal() {
    document.getElementById('standardModal').style.display = 'none';
    document.getElementById('standardForm').reset();
    document.getElementById('fileList').innerHTML = '';
    uploadedFiles = [];
}

// 保存标准
function saveStandard() {
    // 表单验证
    const form = document.getElementById('standardForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // 获取表单数据
    const code = document.getElementById('standardCode').value;
    const name = document.getElementById('standardName').value;
    const type = document.getElementById('standardTypeSelect').value;
    const status = document.getElementById('standardStatusSelect').value;
    const publishDate = document.getElementById('publishDate').value;
    const implementDate = document.getElementById('implementDate').value;
    const summary = document.getElementById('standardSummary').value;
    const scope = document.getElementById('standardScope').value;
    const keyPoints = document.getElementById('standardKeyPoints').value;
    
    // 获取类型和状态的显示名称
    const typeNames = {
        'national': '国家标准',
        'industry': '行业标准',
        'local': '地方标准',
        'internal': '内部工艺标准'
    };
    
    const statusNames = {
        'active': '生效中',
        'inactive': '已失效',
        'draft': '草稿'
    };
    
    // 构建标准数据
    const standardData = {
        code,
        name,
        type,
        typeName: typeNames[type],
        status,
        statusName: statusNames[status],
        publishDate,
        implementDate,
        summary,
        scope,
        keyPoints,
        files: uploadedFiles
    };
    
    // 保存数据
    standardsData[code] = standardData;
    
    // 在实际应用中，这里应该是发送请求到后端保存数据
    console.log('保存标准数据:', standardData);
    
    // 关闭模态框
    closeStandardModal();
    
    // 刷新表格数据
    alert(isEditing ? '标准更新成功' : '标准添加成功');
    
    // 在实际应用中，这里应该重新加载表格数据
    refreshStandardTable();
}

// 查看标准
function viewStandard(code) {
    currentStandardCode = code;
    
    // 获取标准数据
    const standard = standardsData[code];
    if (!standard) {
        alert('未找到标准数据');
        return;
    }
    
    // 检查查看模态框是否存在
    const viewModal = document.getElementById('viewStandardModal');
    if (!viewModal) {
        console.error('找不到查看标准模态框');
        return;
    }
    
    // 检查模态框内容元素是否存在
    const modalBody = viewModal.querySelector('.modal-body');
    if (!modalBody) {
        console.error('找不到模态框内容元素');
        return;
    }
    
    // 填充查看模态框内容
    modalBody.innerHTML = `
        <div class="view-section">
            <div class="view-section-title">基本信息</div>
            <div class="view-row">
                <div class="view-group">
                    <label>标准编号:</label>
                    <div class="view-field">${standard.code}</div>
                </div>
                <div class="view-group">
                    <label>标准名称:</label>
                    <div class="view-field">${standard.name}</div>
                </div>
            </div>
            <div class="view-row">
                <div class="view-group">
                    <label>标准类型:</label>
                    <div class="view-field">
                        <span class="standard-type ${standard.type}">${standard.typeName}</span>
                    </div>
                </div>
                <div class="view-group">
                    <label>标准状态:</label>
                    <div class="view-field">
                        <span class="standard-status ${standard.status}">${standard.statusName}</span>
                    </div>
                </div>
            </div>
            <div class="view-row">
                <div class="view-group">
                    <label>发布日期:</label>
                    <div class="view-field">${standard.publishDate}</div>
                </div>
                <div class="view-group">
                    <label>实施日期:</label>
                    <div class="view-field">${standard.implementDate}</div>
                </div>
            </div>
        </div>
        
        <div class="view-section">
            <div class="view-section-title">标准内容</div>
            <div class="view-group">
                <label>标准概述:</label>
                <div class="view-field">${standard.summary || '无'}</div>
            </div>
            <div class="view-group">
                <label>适用范围:</label>
                <div class="view-field">${standard.scope || '无'}</div>
            </div>
            <div class="view-group">
                <label>关键要点:</label>
                <div class="view-field">${standard.keyPoints ? standard.keyPoints.replace(/\n/g, '<br>') : '无'}</div>
            </div>
        </div>
        
        <div class="view-section">
            <div class="view-section-title">附件</div>
            <div class="view-field" id="view_standardFile">
                ${standard.files && standard.files.length > 0 
                    ? standard.files.map(file => `<a href="#" class="file-link"><i class="fas fa-file"></i> ${file.name}</a>`).join('') 
                    : '无附件'}
            </div>
        </div>
    `;
    
    // 显示模态框
    viewModal.style.display = 'block';
}

// 编辑标准
function editStandard(code) {
    isEditing = true;
    currentStandardCode = code;
    
    // 获取标准数据
    const standard = standardsData[code];
    if (!standard) {
        alert('未找到标准数据');
        return;
    }
    
    // 检查编辑模态框是否存在
    const editModal = document.getElementById('standardModal');
    if (!editModal) {
        console.error('找不到编辑标准模态框');
        return;
    }
    
    // 设置模态框标题
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.textContent = '编辑标准';
    }
    
    // 填充表单数据
    const codeInput = document.getElementById('standardCode');
    const nameInput = document.getElementById('standardName');
    const typeSelect = document.getElementById('standardTypeSelect');
    const statusSelect = document.getElementById('standardStatusSelect');
    const publishDateInput = document.getElementById('publishDate');
    const implementDateInput = document.getElementById('implementDate');
    const summaryTextarea = document.getElementById('standardSummary');
    const scopeTextarea = document.getElementById('standardScope');
    const keyPointsTextarea = document.getElementById('standardKeyPoints');
    
    if (codeInput) codeInput.value = standard.code;
    if (nameInput) nameInput.value = standard.name;
    if (typeSelect) typeSelect.value = standard.type;
    if (statusSelect) statusSelect.value = standard.status;
    if (publishDateInput) publishDateInput.value = standard.publishDate;
    if (implementDateInput) implementDateInput.value = standard.implementDate;
    if (summaryTextarea) summaryTextarea.value = standard.summary || '';
    if (scopeTextarea) scopeTextarea.value = standard.scope || '';
    if (keyPointsTextarea) keyPointsTextarea.value = standard.keyPoints || '';
    
    // 填充文件列表
    uploadedFiles = [...(standard.files || [])];
    renderFileList();
    
    // 显示模态框
    editModal.style.display = 'block';
}

// 其余函数保持不变...