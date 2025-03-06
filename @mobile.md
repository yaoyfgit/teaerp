# 移动端设计规范

## 1. 颜色规范

```css
:root {
  /* 主题色 */
  --primary-color: #8fd4d2;
  --primary-color-light: #a8e0de;
  --primary-color-dark: #7abfbd;
  
  /* 功能色 */
  --success: #34c759;
  --success-light: #e8f5e9;
  --warning: #ff9500;
  --warning-light: #fff3e0;
  --danger: #ff3b30;
  
  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  
  /* 文字颜色 */
  --text-primary: #000000;
  --text-regular: #48484a;
  --text-secondary: #8e8e93;
}
```

## 2. 间距规范

```css
:root {
  --spacing-xs: 4px;   /* 极小间距 */
  --spacing-sm: 8px;   /* 小间距 */
  --spacing-md: 16px;  /* 中等间距 */
  --spacing-lg: 24px;  /* 大间距 */
}
```

## 3. 字体规范

```css
:root {
  --font-size-sm: 13px;  /* 小字号 */
  --font-size-md: 15px;  /* 中等字号 */
  --font-size-lg: 17px;  /* 大字号 */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 
    'Microsoft Yahei', sans-serif;
}
```

## 4. 布局组件

### 4.1 顶部导航栏

```html
<div class="nav-bar">
  <a href="javascript:history.back()" class="back">
    <i class="fas fa-chevron-left"></i>
  </a>
  <div class="title">页面标题</div>
</div>
```

- 固定在顶部
- 高度 44px
- 包含返回按钮和标题
- 背景色为白色，带轻微阴影
- 支持毛玻璃效果

### 4.2 底部工具栏

```html
<div class="bottom-bar">
  <button class="btn btn-outline">取消</button>
  <button class="btn btn-primary">确认</button>
</div>
```

- 固定在底部
- 高度 44px + 安全区域
- 支持多个按钮布局
- 背景色为白色，带上阴影
- 支持毛玻璃效果

## 5. 表单组件

### 5.1 表单分组

```html
<div class="form-section">
  <div class="form-section-title">分组标题</div>
  <div class="form-group">
    <!-- 表单项 -->
  </div>
</div>
```

- 使用卡片式布局
- 白色背景，圆角 12px
- 分组之间间距 16px

### 5.2 表单项

```html
<div class="form-group">
  <label class="form-label">
    <span class="required">*</span>标签文本
  </label>
  <input class="form-control" />
  <i class="form-right-icon"></i>
</div>
```

- 标签宽度 90px
- 必填项显示红色星号
- 右侧图标用于提示可点击或状态
- 支持错误状态显示

## 6. 选择器组件

### 6.1 底部弹出选择器

```html
<div class="picker-modal">
  <div class="picker-header">
    <button class="cancel">取消</button>
    <div class="title">选择器标题</div>
    <button class="confirm">确定</button>
  </div>
  <div class="picker-search">
    <!-- 搜索框 -->
  </div>
  <div class="picker-content">
    <!-- 选择项列表 -->
  </div>
</div>
```

- 从底部滑出，最大高度 90vh
- 圆角顶部 16px
- 包含标题栏、搜索框和内容区
- 支持单选和多选模式
- 支持实时搜索过滤

### 6.2 选择项

```html
<div class="list-item">
  <div class="radio"></div>
  <div class="content">
    <div class="title">主要文本</div>
    <div class="subtitle">次要文本</div>
  </div>
</div>
```

- 支持选中状态样式
- 支持点击反馈
- 文本溢出省略处理

## 7. 交互反馈

### 7.1 Toast 提示

```html
<div class="toast">
  <i class="fas fa-check-circle"></i>
  <span class="toast-message">提示文本</span>
</div>
```

- 居中显示，带图标
- 支持成功和错误两种状态
- 显示 2 秒后自动消失
- 半透明黑色背景

### 7.2 按钮交互

- 点击时缩放效果
- 支持禁用状态
- 支持涟漪效果
- 主要按钮和次要按钮样式区分

## 8. 示例：应收单页面

### 8.1 页面结构

```html
<div class="page">
  <!-- 顶部导航 -->
  <div class="nav-bar">...</div>
  
  <!-- 表单内容 -->
  <div class="form-content">
    <!-- 基本信息 -->
    <div class="form-section">...</div>
    
    <!-- 金额信息 -->
    <div class="form-section">...</div>
    
    <!-- 关联单据 -->
    <div class="form-section">...</div>
  </div>
  
  <!-- 底部按钮 -->
  <div class="bottom-bar">...</div>
</div>
```

### 8.2 交互规范

1. 表单验证
   - 必填项实时验证
   - 错误提示显示在表单项下方
   - 提交时统一验证并提示

2. 选择器交互
   - 点击表单项弹出选择器
   - 支持搜索过滤
   - 选择后自动填充表单
   - 支持取消和确认操作

3. 关联单据
   - 支持多选关联
   - 可随时删除已关联单据
   - 自动计算关联金额
   - 实时更新应收金额

4. 保存操作
   - 验证通过后显示成功提示
   - 延迟 1.5 秒后返回列表
   - 取消操作直接返回

### 8.3 样式规范

1. 表单布局
   - 标签宽度统一
   - 必填项标记显眼
   - 分组之间留有间距
   - 内容右对齐

2. 选择器样式
   - 圆角和阴影统一
   - 选中状态明显
   - 搜索框样式突出
   - 列表项高度适中

3. 按钮样式
   - 主次按钮区分明显
   - 点击反馈统一
   - 图标和文字搭配
   - 禁用状态明显

4. 视觉层次
   - 重要信息突出显示
   - 辅助信息颜色淡化
   - 分割线统一使用
   - 间距层次分明 