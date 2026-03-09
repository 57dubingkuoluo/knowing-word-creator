// 主逻辑 - 儿童识字小报生成器

// DOM 元素
let elements = {};

// 状态
let state = {
  apiKey: '',
  selectedPreset: null,
  customTheme: '',
  customTitle: '',
  isCustomMode: false,
  isGenerating: false,
  currentImageUrl: null
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initElements();
  loadApiKey();
  renderPresets();
  bindEvents();
});

// 初始化 DOM 元素引用
function initElements() {
  elements = {
    apiKeyInput: document.getElementById('apiKey'),
    apiKeySaveBtn: document.getElementById('saveApiKey'),
    apiKeyDisplay: document.getElementById('apiKeyDisplay'),
    themeOptions: document.getElementById('themeOptions'),
    customThemeInput: document.getElementById('customTheme'),
    customTitleInput: document.getElementById('customTitle'),
    customModeCheckbox: document.getElementById('customMode'),
    generateBtn: document.getElementById('generateBtn'),
    statusText: document.getElementById('statusText'),
    resultContainer: document.getElementById('resultContainer'),
    resultImage: document.getElementById('resultImage'),
    resetBtn: document.getElementById('resetBtn')
  };
}

// 从 localStorage 加载 API Key
function loadApiKey() {
  const savedKey = localStorage.getItem('nano_banana_api_key');
  if (savedKey) {
    state.apiKey = savedKey;
    elements.apiKeyInput.value = savedKey;
    elements.apiKeyDisplay.textContent = savedKey.substring(0, 8) + '****';
    elements.apiKeyDisplay.style.display = 'inline';
  }
}

// 保存 API Key 到 localStorage
function saveApiKey() {
  const key = elements.apiKeyInput.value.trim();
  if (!key) {
    alert('请输入 API Key');
    return;
  }

  state.apiKey = key;
  localStorage.setItem('nano_banana_api_key', key);
  elements.apiKeyDisplay.textContent = key.substring(0, 8) + '****';
  elements.apiKeyDisplay.style.display = 'inline';
  alert('API Key 已保存');
}

// 渲染预置主题
function renderPresets() {
  const container = elements.themeOptions;
  container.innerHTML = presets.map(preset => `
    <div class="preset-card" data-id="${preset.id}">
      <div class="preset-theme">${preset.theme}</div>
      <div class="preset-title">${preset.title}</div>
      <div class="preset-pinyin">${preset.pinyin}</div>
    </div>
  `).join('');

  // 默认选中第一个
  selectPreset(presets[0].id);
}

// 选择预置主题
function selectPreset(id) {
  state.selectedPreset = presets.find(p => p.id === id);

  // 更新 UI
  document.querySelectorAll('.preset-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.dataset.id) === id);
  });

  // 清空自定义输入
  elements.customThemeInput.value = '';
  elements.customTitleInput.value = '';
}

// 切换自定义模式
function toggleCustomMode() {
  state.isCustomMode = elements.customModeCheckbox.checked;

  if (state.isCustomMode) {
    elements.themeOptions.style.display = 'none';
    elements.customThemeInput.style.display = 'block';
    elements.customTitleInput.style.display = 'block';
    elements.customThemeInput.focus();
  } else {
    elements.themeOptions.style.display = 'grid';
    elements.customThemeInput.style.display = 'none';
    elements.customTitleInput.style.display = 'none';

    // 恢复选中预设
    if (state.selectedPreset) {
      selectPreset(state.selectedPreset.id);
    }
  }
}

// 生成提示词
function generatePrompt(theme, title, vocabulary) {
  // 构建词汇列表
  const coreWords = vocabulary.core.map(w => `${w.pinyin} ${w.hanzi}`).join(', ');
  const itemsWords = vocabulary.items.map(w => `${w.pinyin} ${w.hanzi}`).join(', ');
  const envWords = vocabulary.environment.map(w => `${w.pinyin} ${w.hanzi}`).join(', ');

  // 填充模板
  return `请生成一张儿童识字小报《${theme}》，竖版 A4，学习小报版式，适合 5–9 岁孩子 认字与看图识物。

# 一、小报标题区（顶部）

**顶部居中大标题**：《${title}》
* **风格**：十字小报 / 儿童学习报感
* **文本要求**：大字、醒目、卡通手写体、彩色描边
* **装饰**：周围添加与 ${theme} 相关的贴纸风装饰，颜色鲜艳

# 二、小报主体（中间主画面）

画面中心是一幅 **卡通插画风的「${theme}」场景**：
* **整体气氛**：明亮、温暖、积极
* **构图**：物体边界清晰，方便对应文字，不要过于拥挤。

**场景分区与核心内容**
1.  **核心区域 A（主要对象）**：表现 ${theme} 的核心活动。
2.  **核心区域 B（配套设施）**：展示相关的工具或物品。
3.  **核心区域 C（环境背景）**：体现环境特征（如墙面、指示牌等）。

**主题人物**
* **角色**：1 位可爱卡通人物（职业/身份：与 ${theme} 匹配）。
* **动作**：正在进行与场景相关的自然互动。

# 三、必画物体与识字清单（Generated Content）

**请务必在画面中清晰绘制以下物体，并为其预留贴标签的位置：**

**1. 核心角色与设施：**
${coreWords}

**2. 常见物品/工具：**
${itemsWords}

**3. 环境与装饰：**
${envWords}

*(注意：画面中的物体数量不限于此，但以上列表必须作为重点描绘对象)*

# 四、识字标注规则

对上述清单中的物体，贴上中文识字标签：
* **格式**：两行制（第一行拼音带声调，第二行简体汉字）。
* **样式**：彩色小贴纸风格，白底黑字或深色字，清晰可读。
* **排版**：标签靠近对应的物体，不遮挡主体。

# 五、画风参数
* **风格**：儿童绘本风 + 识字小报风
* **色彩**：高饱和、明快、温暖 (High Saturation, Warm Tone)
* **质量**：8k resolution, high detail, vector illustration style, clean lines.`;
}

// 开始生成
async function startGenerate() {
  // 验证 API Key
  if (!state.apiKey) {
    alert('请先输入并保存 API Key');
    elements.apiKeyInput.focus();
    return;
  }

  // 获取主题和标题
  let theme, title, vocabulary;

  if (state.isCustomMode) {
    theme = elements.customThemeInput.value.trim();
    title = elements.customTitleInput.value.trim();

    if (!theme || !title) {
      alert('请输入主题和标题');
      return;
    }

    // 自定义模式使用通用词汇
    vocabulary = getDefaultVocabulary(theme);
  } else {
    if (!state.selectedPreset) {
      alert('请选择一个主题');
      return;
    }
    theme = state.selectedPreset.theme;
    title = state.selectedPreset.title;
    vocabulary = state.selectedPreset.vocabulary;
  }

  // 生成提示词
  const prompt = generatePrompt(theme, title, vocabulary);

  // 开始生成
  state.isGenerating = true;
  updateUIState();

  try {
    const result = await generateImage(
      state.apiKey,
      prompt,
      { aspectRatio: '3:4', resolution: '2K' },
      (status) => {
        updateStatus(status);
      }
    );

    if (result.success) {
      state.currentImageUrl = result.urls[0];
      showResult(result.urls[0]);
    } else {
      alert(`生成失败: ${result.failMsg}`);
    }
  } catch (error) {
    alert(`错误: ${error.message}`);
  } finally {
    state.isGenerating = false;
    updateUIState();
  }
}

// 获取默认词汇（用于自定义主题）
function getDefaultVocabulary(theme) {
  return {
    core: [
      { pinyin: "rén wù", hanzi: "人物" },
      { pinyin: "chǎng dì", hanzi: "场地" },
      { pinyin: "shè shī", hanzi: "设施" },
      { pinyin: "gōng jù", hanzi: "工具" },
      { pinyin: "dōng xi", hanzi: "东西" }
    ],
    items: [
      { pinyin: "wù pǐn", hanzi: "物品" },
      { pinyin: "dōng xi", hanzi: "东西" },
      { pinyin: "道 jù", hanzi: "道具" },
      { pinyin: "yòng pǐn", hanzi: "用品" },
      { pinyin: "wán jù", hanzi: "玩具" },
      { pinyin: "shū jí", hanzi: "书籍" },
      { pinyin: "shí wù", hanzi: "食物" },
      { pinyin: "yǐn liào", hanzi: "饮料" }
    ],
    environment: [
      { pinyin: "fáng jiān", hanzi: "房间" },
      { pinyin: "kōng jiān", hanzi: "空间" },
      { pinyin: "huán jìng", hanzi: "环境" },
      { pinyin: "bù jìng", hanzi: "布景" },
      { pinyin: "zhuāng shì", hanzi: "装饰" }
    ]
  };
}

// 更新状态显示
function updateStatus(status) {
  const statusMap = {
    'waiting': '等待中...',
    'processing': '生成中...',
    'success': '完成！'
  };
  elements.statusText.textContent = statusMap[status] || status;
}

// 更新 UI 状态
function updateUIState() {
  elements.generateBtn.disabled = state.isGenerating;
  elements.generateBtn.textContent = state.isGenerating ? '生成中...' : '生成图片';

  if (state.isGenerating) {
    elements.statusText.textContent = '开始生成...';
    elements.resultContainer.style.display = 'none';
  }
}

// 显示结果
function showResult(url) {
  elements.resultImage.src = url;
  elements.resultContainer.style.display = 'block';
  elements.statusText.textContent = '生成完成！';
}

// 重置
function reset() {
  state.currentImageUrl = null;
  state.isGenerating = false;
  elements.resultContainer.style.display = 'none';
  elements.statusText.textContent = '';
  updateUIState();
}

// 绑定事件
function bindEvents() {
  elements.apiKeySaveBtn.addEventListener('click', saveApiKey);

  elements.themeOptions.addEventListener('click', (e) => {
    const card = e.target.closest('.preset-card');
    if (card) {
      selectPreset(parseInt(card.dataset.id));
    }
  });

  elements.customModeCheckbox.addEventListener('change', toggleCustomMode);

  elements.generateBtn.addEventListener('click', startGenerate);

  elements.resetBtn.addEventListener('click', reset);
}
