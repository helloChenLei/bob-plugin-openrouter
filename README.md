# Bob OpenRouter 翻译插件

这是一个基于 [OpenRouter](https://openrouter.ai/) API 的 [Bob](https://bobtranslate.com/) 翻译插件，支持使用多种大语言模型进行翻译。

## 功能特点

- 支持多种顶级 AI 模型翻译
- 支持自定义模型选择
- 支持自定义 API Base URL
- 自动检查更新

## 支持的模型

- GPT-3.5 Turbo (openai/gpt-3.5-turbo)
- GPT-4 (openai/gpt-4)
- Claude 2.1 (anthropic/claude-2.1)
- Claude 3 Opus (anthropic/claude-3-opus)
- Claude 3 Sonnet (anthropic/claude-3-sonnet)
- Gemini Pro (google/gemini-pro)
- Mixtral 8x7B (mistralai/mixtral-8x7b)
- Llama 2 70B (meta-llama/llama-2-70b-chat)
- Code Llama 34B (codellama/codellama-34b-instruct)
- Qwen 72B (qwen/qwen-72b-chat)
- 支持自定义其他 OpenRouter 模型

## 安装

### 方法一：手动安装（推荐）
1. 下载插件：[点击下载](https://github.com/helloChenLei/bob-plugin-openrouter/releases/latest/download/bob-plugin-openrouter.bobplugin)
2. 双击下载的 `.bobplugin` 文件进行安装

### 方法二：手动安装
1. 从 [Releases](https://github.com/username/bob-plugin-openrouter/releases) 页面下载最新版本的 `.bobplugin` 文件
2. 双击安装

## 配置说明

### 1. 获取 OpenRouter API Key
1. 注册/登录 [OpenRouter](https://openrouter.ai/)
2. 进入 [API Keys](https://openrouter.ai/keys) 页面
3. 创建新的 API Key

### 2. 插件配置
1. 打开 Bob 偏好设置
2. 选择「服务」页面
3. 找到「OpenRouter」服务
4. 填写配置:
   - API Key: 填入你的 OpenRouter API Key
   - API Base URL: 默认为 `https://openrouter.ai/api/v1`
   - AI Model: 选择想要使用的模型
   - 如果选择「自定义模型」，需要在下方填写完整的模型 ID

## 支持的语言

- 中文简体 (zh-Hans)
- 中文繁体 (zh-Hant)
- 英语 (en)
- 日语 (ja)
- 韩语 (ko)
- 法语 (fr)
- 德语 (de)
- 西班牙语 (es)
- 意大利语 (it)
- 俄语 (ru)
- 葡萄牙语 (pt)
- 荷兰语 (nl)
- 波兰语 (pl)
- 阿拉伯语 (ar)
- 南非语 (af)
- 印地语 (hi)
- 泰语 (th)
- 越南语 (vi)

## 常见问题

1. **翻译失败，提示 API Key 错误**
   - 检查 API Key 是否正确填写
   - 确认 API Key 是否有效
   - 检查账户余额是否充足

2. **自定义模型无法使用**
   - 确认填写了正确的模型 ID
   - 检查该模型是否在你的 OpenRouter 账户中可用
   - 确认账户有足够的额度使用该模型

3. **翻译结果不准确**
   - 尝试使用其他 AI 模型
   - 确保源文本清晰完整
   - 考虑使用更高级的模型（如 GPT-4 或 Claude 3）

## 更新日志

### v0.1.0
- 初始版本发布
- 支持多种 AI 模型翻译
- 支持自定义模型和 API URL
- 支持自动更新

 
## 许可证

[MIT License](LICENSE)

## 致谢

- [Bob](https://bobtranslate.com/)
- [OpenRouter](https://openrouter.ai/) 