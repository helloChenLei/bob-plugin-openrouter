const supportLanguages = [
    ["auto", "auto"],
    ["zh-Hans", "zh-CN"],
    ["zh-Hant", "zh-TW"],
    ["en", "en"],
    ["ja", "ja"],
    ["ko", "ko"],
    ["fr", "fr"],
    ["de", "de"],
    ["es", "es"],
    ["it", "it"],
    ["ru", "ru"],
    ["pt", "pt"],
    ["nl", "nl"],
    ["pl", "pl"],
    ["ar", "ar"],
    ["af", "af"],
    ["hi", "hi"],
    ["th", "th"],
    ["vi", "vi"]
];

// 使用 Map 来存储语言映射关系
exports.supportLanguages = supportLanguages;
exports.langMap = new Map(supportLanguages.map(([key, value]) => [key, value]));
exports.langMapReverse = new Map(
    supportLanguages.map(([standardLang, lang]) => [lang, standardLang])
);

// 修改 isSupported 函数以支持所有语言组合
exports.isSupported = function(from, to) {
    // 允许 auto 作为源语言或目标语言
    if (from === "auto" || to === "auto") {
        return true;
    }
    // 检查是否在支持的语言映射中
    return exports.langMap.has(from) && exports.langMap.has(to);
}; 