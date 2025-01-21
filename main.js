var lang = require("./lang.js");

function supportLanguages() {
    return lang.supportLanguages.map(([standardLang, lang]) => standardLang);
}

var config = {
    apiKey: "YOUR_API_KEY", // 在 Bob 偏好设置中配置
    baseURL: "https://openrouter.ai/api/v1/chat/completions"
};

function translate(query, completion) {
    // 输入验证
    if (!query || typeof query !== 'object') {
        completion({
            error: {
                type: 'param',
                message: 'Invalid query object',
                addition: 'Query must be a valid object'
            }
        });
        return;
    }

    if (!query.text || typeof query.text !== 'string' || query.text.trim() === '') {
        completion({
            error: {
                type: 'param',
                message: 'Invalid input text',
                addition: 'Input text must be a non-empty string'
            }
        });
        return;
    }

    if (!lang.isSupported(query.detectFrom, query.detectTo)) {
        completion({
            error: {
                type: 'unsupportedLanguage',
                message: `不支持从 ${query.detectFrom} 翻译到 ${query.detectTo}`
            }
        });
        return;
    }

    const apiKey = $option.apiKey;
    const apiBase = $option.apiBase || "https://api.anthropic.com";
    const urlPath = "/v1/messages";
    const modelId = $option.model === "custom" ? $option.customModel : $option.model;

    if (!modelId) {
        completion({
            error: {
                type: "param",
                message: "请选择模型或输入自定义模型ID"
            }
        });
        return;
    }

    const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/bob-plugin",
        "X-Title": "Bob-OpenRouter-Plugin"
    };

    // 修改提示方式
    const prompt = lang.langMap[query.detectTo] || query.detectTo;

    const body = {
        model: modelId,
        messages: [
            {
                role: "system",
                content: "你是一个专业的翻译助手。请准确翻译用户的文本，保持原文的意思和语气。只返回翻译结果，不要解释或添加其他内容。如果看到 HTML 或代码片段，保持其格式不变。"
            },
            {
                role: "user",
                content: `将下面的文本翻译成${prompt}:\n\n${query.text}`
            }
        ]
    };

    $http.request({
        method: "POST",
        url: `${apiBase}/chat/completions`,
        header: headers,
        body: body,
        handler: function(resp) {
            if (resp.error || resp.response.statusCode >= 400) {
                $log.error(`请求错误: ${JSON.stringify(resp.error)}`);
                completion({
                    error: {
                        type: resp.error.type || 'api',
                        message: resp.error.message || '接口响应错误'
                    }
                });
                return;
            }

            try {
                const translation = resp.data.choices[0].message.content.trim();
                $log.info(`翻译结果: ${translation}`);
                completion({
                    result: {
                        from: query.detectFrom,
                        to: query.detectTo,
                        toParagraphs: [translation]
                    }
                });
            } catch (e) {
                $log.error(`解析错误: ${e.message}`);
                completion({
                    error: {
                        type: "unknown",
                        message: "Failed to parse translation result"
                    }
                });
            }
        }
    });
}

function pluginValidate(completion) {
    const apiKey = $option.apiKey;
    
    if (!apiKey) {
        completion({
            result: false,
            error: {
                type: "secretKey",
                message: "请先配置 OpenRouter API Key",
                troubleshootingLink: "https://openrouter.ai/docs#quick-start"
            }
        });
        return;
    }

    // 调用 OpenRouter 的模型列表 API 进行验证
    $http.request({
        method: "GET",
        url: "https://openrouter.ai/api/v1/models",
        header: {
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "https://github.com/bob-plugin",
            "X-Title": "Bob-OpenRouter-Plugin"
        },
        handler: function(resp) {
            if (resp.error || !resp.data || resp.data.error) {
                completion({
                    result: false,
                    error: {
                        type: "api",
                        message: "API Key 验证失败，请检查是否正确",
                        troubleshootingLink: "https://openrouter.ai/docs#quick-start"
                    }
                });
                return;
            }
            
            // 验证成功
            completion({
                result: true
            });
        }
    });
}

// 自定义超时时间为 30 秒
function pluginTimeoutInterval() {
    return 30;
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;
exports.pluginValidate = pluginValidate;
exports.pluginTimeoutInterval = pluginTimeoutInterval; 