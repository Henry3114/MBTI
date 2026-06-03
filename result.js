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

// ===== 一键保存为图片（纯 Canvas 2D 手绘，不依赖 DOM 截图） =====
function saveAsImage() {
    var btn = document.getElementById('btn-save-img');

    // 从 DOM / URL 读取数据
    var mbtiType  = document.getElementById('share-badge').textContent.trim();
    var typeName  = document.getElementById('share-name').textContent.trim();
    var taglineRaw = document.getElementById('share-tagline').textContent.trim();

    var params = new URLSearchParams(window.location.search);
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

    function pct(a, b) {
        var total = a + b;
        if (total === 0) return 50;
        return Math.round((a / total) * 100);
    }

    var dims = [
        { left: 'E', right: 'I', p: pct(scores.E, scores.I) },
        { left: 'S', right: 'N', p: pct(scores.S, scores.N) },
        { left: 'T', right: 'F', p: pct(scores.T, scores.F) },
        { left: 'J', right: 'P', p: pct(scores.J, scores.P) }
    ];

    btn.textContent = '⏳ 生成中...';
    btn.disabled = true;

    try {
        // 卡片尺寸（设计稿 420，2x 输出 840）
        var W = 840;
        var padX = 56;   // 28px*2
        var padTop = 72; // 36px*2
        var padBot = 48; // 24px*2
        var radius = 48; // 24px*2

        // 预估高度：badge+name+dims+tagline+watermark
        var y = padTop;
        var badgeH = 72;
        y += badgeH + 16;          // badge
        y += 30 + 36;              // name + gap
        y += 4 * (28 + 20);        // 4 dim rows
        y += 36;                   // gap before tagline

        // tagline 文本换行测量
        var taglineMaxW = W - padX * 2 - 20;
        var taglineLines = wrapText(ctxTagline, taglineRaw, taglineMaxW, 18, '700');
        var lineH = 28;
        var taglineAreaH = taglineLines.length * lineH + 24 + 12 + 20;
        y += taglineAreaH + 24;    // tagline area + gap
        y += 18 + 28;              // watermark
        var H = y + padBot;

        // ========== Canvas ==========
        var canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        var ctx = canvas.getContext('2d');

        // 背景
        ctx.fillStyle = '#fafbff';
        roundRect(ctx, 0, 0, W, H, radius);
        ctx.fill();

        // 装饰圆
        ctx.save();
        ctx.beginPath();
        ctx.arc(W + 60, -40, 180, 0, Math.PI * 2);
        ctx.fillStyle = '#e8eaff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-40, H + 40, 140, 0, Math.PI * 2);
        ctx.fillStyle = '#ece5f5';
        ctx.fill();
        ctx.restore();

        // 裁剪圆角
        ctx.save();
        roundRect(ctx, 0, 0, W, H, radius);
        ctx.clip();

        // 边框
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 6;
        roundRect(ctx, 3, 3, W - 6, H - 6, radius);
        ctx.stroke();

        // ---- 绘图 ----
        var cy = padTop;

        // Badge
        var badgeText = mbtiType;
        ctx.font = '900 56px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
        var badgeW = ctx.measureText(badgeText).width + 60;
        var badgeH2 = 72;
        var badgeX = (W - badgeW) / 2;
        var badgeR = 36;
        roundRect(ctx, badgeX, cy, badgeW, badgeH2, badgeR);
        var grad = ctx.createLinearGradient(badgeX, cy, badgeX + badgeW, cy + badgeH2);
        grad.addColorStop(0, '#667eea');
        grad.addColorStop(1, '#764ba2');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '900 56px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
        ctx.fillText(badgeText, W / 2, cy + badgeH2 / 2);
        cy += badgeH2 + 16;

        // Name
        ctx.fillStyle = '#555555';
        ctx.font = '600 23px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
        ctx.fillText(typeName, W / 2, cy);
        cy += 30 + 36;

        // 维度条
        for (var d = 0; d < dims.length; d++) {
            var dim = dims[d];
            var barW = W - padX * 2;
            var barH = 28;
            var barX = padX;
            var barY = cy;
            var barR = 14;
            var leftW = Math.round(barW * dim.p / 100);

            // 标签
            ctx.fillStyle = '#667eea';
            ctx.font = '700 17px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(dim.left, barX - 4, barY + barH / 2);

            ctx.fillStyle = '#764ba2';
            ctx.textAlign = 'right';
            ctx.fillText(dim.right, barX + barW + 4, barY + barH / 2);

            // 背景轨
            ctx.fillStyle = '#e0e0e0';
            roundRect(ctx, barX + 20, barY, barW - 40, barH, barR);
            ctx.fill();

            // 填充条
            if (leftW > 33) {
                var fillGrad = ctx.createLinearGradient(barX + 20, barY, barX + 20 + (barW - 40), barY + barH);
                fillGrad.addColorStop(0, '#667eea');
                fillGrad.addColorStop(1, '#764ba2');
                ctx.fillStyle = fillGrad;
                var actualW = leftW - 40;
                if (actualW > barW - 40) actualW = barW - 40;
                if (actualW > 0) {
                    roundRect(ctx, barX + 20, barY, actualW, barH, barR);
                    ctx.fill();
                }
            }

            cy += barH + 20;
        }

        cy += 12;

        // 分隔线
        ctx.strokeStyle = '#d5d8f0';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(padX + 10, cy);
        ctx.lineTo(W - padX - 10, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        cy += 20;

        // Tagline
        ctx.fillStyle = '#777777';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (var t = 0; t < taglineLines.length; t++) {
            ctx.font = '400 17px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
            ctx.fillText(taglineLines[t], W / 2, cy);
            cy += lineH;
        }

        cy += 24;

        // Watermark
        ctx.fillStyle = '#bbbbbb';
        ctx.font = '400 14px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
        ctx.fillText('MBTI 性格测试', W / 2, cy);

        ctx.restore(); // 结束裁剪

        // ========== 下载 ==========
        var link = document.createElement('a');
        link.download = 'MBTI测试结果_' + mbtiType + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.textContent = '📸 保存为图片';
        btn.disabled = false;

    } catch (err) {
        btn.textContent = '📸 保存为图片';
        btn.disabled = false;
        console.error('Canvas draw error:', err);
        alert('图片生成失败，请重试。\n\n错误: ' + (err.message || '未知错误'));
    }
}

// 辅助：圆角矩形
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

// 辅助：文本换行测量（用离屏 canvas）
var ctxTagline = (function() {
    var c = document.createElement('canvas');
    return c.getContext('2d');
})();
function wrapText(ctx, text, maxW, fontSize, fontWeight) {
    ctx.font = fontWeight + ' ' + fontSize + 'px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
    if (ctx.measureText(text).width <= maxW) return [text];

    var lines = [];
    var chars = text.split('');
    var current = '';
    for (var i = 0; i < chars.length; i++) {
        var test = current + chars[i];
        if (ctx.measureText(test).width > maxW && current.length > 0) {
            lines.push(current);
            current = chars[i];
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}
