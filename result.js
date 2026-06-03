// MBTI 结果页渲染（美化版）
document.addEventListener('DOMContentLoaded', function() {
    var resultDiv = document.getElementById('result-content');

    var params = new URLSearchParams(window.location.search);
    var mbtiType = params.get('type');
    var scores = {
        E: parseInt(params.get('E')) || 0,
        I: parseInt(params.get('I')) || 0,
        S: parseInt(params.get('S')) || 0,
        N: parseInt(params.get('N')) || 0,
        T: parseInt(params.get('T')) || 0,
        F: parseInt(params.get('F')) || 0,
        J: parseInt(params.get('J')) || 0,
        P: parseInt(params.get('P')) || 0
    };

    if (!mbtiType || !mbtiDescriptions[mbtiType]) {
        resultDiv.innerHTML = ''
            + '<div style="text-align:center;padding:40px;">'
            + '<p style="font-size:1.2em;color:#999;">未找到测试结果</p>'
            + '<a href="test.html" class="button" style="margin-top:20px;">重新测试</a>'
            + '</div>';
        return;
    }

    var desc = mbtiDescriptions[mbtiType];

    // 计算维度百分比
    function pct(a, b) {
        var total = a + b;
        if (total === 0) return 50;
        return Math.round((a / total) * 100);
    }

    var dims = [
        { left: 'E-外向', right: 'I-内向', a: scores.E, b: scores.I, code: mbtiType[0] },
        { left: 'S-实感', right: 'N-直觉', a: scores.S, b: scores.N, code: mbtiType[1] },
        { left: 'T-思考', right: 'F-情感', a: scores.T, b: scores.F, code: mbtiType[2] },
        { left: 'J-判断', right: 'P-感知', a: scores.J, b: scores.P, code: mbtiType[3] }
    ];

    var html = '';

    // ===== 类型徽章 =====
    html += '<div class="mbti-badge">';
    html += '  <div class="mbti-type-code">' + mbtiType + '</div>';
    html += '  <div class="mbti-type-name">' + desc.name + '</div>';
    html += '</div>';

    // ===== 维度条 =====
    html += '<div class="dimension-bars">';
    for (var d = 0; d < dims.length; d++) {
        var dim = dims[d];
        var leftPct = pct(dim.a, dim.b);
        html += '<div class="dim-item">';
        html += '  <div class="dim-label">';
        html += '    <span class="left">' + dim.left + ' (' + dim.a + ')</span>';
        html += '    <span class="right">' + dim.right + ' (' + dim.b + ')</span>';
        html += '  </div>';
        html += '  <div class="dim-track">';
        html += '    <div class="dim-fill" style="width:' + leftPct + '%;" data-pct="' + leftPct + '%"></div>';
        html += '  </div>';
        html += '</div>';
    }
    html += '</div>';

    // ===== 基本特点 =====
    html += '<div class="section">';
    html += '  <h3>✨ 基本特点</h3>';
    html += '  <p>' + desc.basic_features + '</p>';
    html += '</div>';

    // ===== 优缺点 =====
    html += '<div class="section">';
    html += '  <h3>⚖️ 性格优缺点</h3>';
    html += '  <div class="pros-cons-grid">';
    html += '    <div class="pros-box"><h4>✅ 优点</h4><ul>';
    for (var i = 0; i < desc.pros_cons.pros.length; i++) {
        html += '<li>' + desc.pros_cons.pros[i] + '</li>';
    }
    html += '    </ul></div>';
    html += '    <div class="cons-box"><h4>⚠️ 缺点</h4><ul>';
    for (var j = 0; j < desc.pros_cons.cons.length; j++) {
        html += '<li>' + desc.pros_cons.cons[j] + '</li>';
    }
    html += '    </ul></div>';
    html += '  </div>';
    html += '</div>';

    // ===== 核心价值观 =====
    html += '<div class="section">';
    html += '  <h3>🎯 核心驱动力与价值观</h3>';
    html += '  <ul>';
    for (var k = 0; k < desc.core_drives_values.length; k++) {
        html += '<li>' + desc.core_drives_values[k] + '</li>';
    }
    html += '  </ul>';
    html += '</div>';

    // ===== 职业方向 =====
    html += '<div class="section">';
    html += '  <h3>💼 适合发展路线（职业方向）</h3>';
    html += '  <ul>';
    for (var m = 0; m < desc.career_paths.length; m++) {
        html += '<li>' + desc.career_paths[m] + '</li>';
    }
    html += '  </ul>';
    html += '</div>';

    // ===== 人际关系 =====
    html += '<div class="section">';
    html += '  <h3>💬 人际关系</h3>';
    html += '  <div class="relation-cards">';
    html += '    <div class="relation-card friendship">';
    html += '      <div class="rel-icon">🤝</div>';
    html += '      <h4>友谊</h4>';
    html += '      <p>' + desc.relationships.friendship + '</p>';
    html += '    </div>';
    html += '    <div class="relation-card love">';
    html += '      <div class="rel-icon">💕</div>';
    html += '      <h4>爱情</h4>';
    html += '      <p>' + desc.relationships.love + '</p>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    // ===== 沟通风格 =====
    html += '<div class="section">';
    html += '  <h3>🗣️ 沟通风格</h3>';
    html += '  <p>' + desc.communication_style + '</p>';
    html += '</div>';

    // ===== 压力下表现 =====
    html += '<div class="section">';
    html += '  <h3>😰 压力下的表现</h3>';
    html += '  <p>' + desc.under_pressure + '</p>';
    html += '</div>';

    // ===== 成长建议 =====
    html += '<div class="section">';
    html += '  <h3>🌱 成长建议与注意事项</h3>';
    html += '  <ul>';
    for (var n = 0; n < desc.growth_advice.length; n++) {
        html += '<li>' + desc.growth_advice[n] + '</li>';
    }
    html += '  </ul>';
    html += '</div>';

    resultDiv.innerHTML = html;

    // ===== 填充分享卡片 =====
    document.getElementById('share-badge').textContent = mbtiType;
    document.getElementById('share-name').textContent = desc.name;
    document.getElementById('share-tagline').textContent = desc.basic_features;

    var shareDims = document.getElementById('share-dims');
    var dimsHtml = '';
    for (var d = 0; d < dims.length; d++) {
        var dim = dims[d];
        var lp = pct(dim.a, dim.b);
        var rp = 100 - lp;
        dimsHtml += '<div class="share-dim-row">';
        dimsHtml += '  <span class="share-dim-label">' + dim.left.charAt(0) + '</span>';
        dimsHtml += '  <span class="share-dim-bar-wrap"><span class="share-dim-bar" style="width:' + lp + '%;"></span></span>';
        dimsHtml += '  <span class="share-dim-label">' + dim.right.charAt(0) + '</span>';
        dimsHtml += '</div>';
    }
    shareDims.innerHTML = dimsHtml;
});

// ===== 一键保存为图片 =====
function saveAsImage() {
    var btn = document.getElementById('btn-save-img');
    var card = document.getElementById('share-card');

    // 检查 html2canvas 是否加载
    if (typeof html2canvas === 'undefined') {
        alert('截图库加载失败，请刷新页面后重试');
        return;
    }

    btn.textContent = '⏳ 生成中...';
    btn.disabled = true;

    // 卡片使用 position:fixed; left:-9999px（屏幕外但已渲染），html2canvas 可直接捕获
    html2canvas(card, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fafbff',
        logging: false
    }).then(function(canvas) {
        btn.textContent = '📸 保存为图片';
        btn.disabled = false;

        // 触发下载
        var link = document.createElement('a');
        link.download = 'MBTI测试结果_' + (document.getElementById('share-badge').textContent || 'result') + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(function(err) {
        btn.textContent = '📸 保存为图片';
        btn.disabled = false;
        console.error('html2canvas error:', err);
        alert('图片生成失败，请重试。\n错误: ' + (err.message || '未知错误'));
    });
}
