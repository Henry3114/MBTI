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
});

// ===== 一键保存完整结果长图（纯 Canvas 2D 手绘） =====
function saveAsImage() {
    var btn = document.getElementById('btn-save-img');

    // 从 URL 读取数据
    var params = new URLSearchParams(window.location.search);
    var mbtiType = params.get('type');
    if (!mbtiType || !mbtiDescriptions[mbtiType]) { alert('未找到结果数据'); return; }
    var desc = mbtiDescriptions[mbtiType];

    var scores = {
        E: parseInt(params.get('E')) || 0, I: parseInt(params.get('I')) || 0,
        S: parseInt(params.get('S')) || 0, N: parseInt(params.get('N')) || 0,
        T: parseInt(params.get('T')) || 0, F: parseInt(params.get('F')) || 0,
        J: parseInt(params.get('J')) || 0, P: parseInt(params.get('P')) || 0
    };
    function pct(a, b) { var t = a + b; return t === 0 ? 50 : Math.round((a / t) * 100); }
    var dims = [
        { left: 'E', right: 'I', p: pct(scores.E, scores.I) },
        { left: 'S', right: 'N', p: pct(scores.S, scores.N) },
        { left: 'T', right: 'F', p: pct(scores.T, scores.F) },
        { left: 'J', right: 'P', p: pct(scores.J, scores.P) }
    ];

    btn.textContent = '⏳ 生成中...';
    btn.disabled = true;

    // ============ 布局常量（2x 高清） ============
    var W = 840;
    var padX = 56;
    var padTop = 60;
    var padBot = 60;
    var borderW = 6;
    var contentW = W - padX * 2 - 20; // 正文可用宽度
    var sectionGap = 40;              // 各 section 间距
    var titleH = 44;                  // section 标题行高
    var bodyLineH = 30;              // 正文行高
    var listLineH = 32;              // 列表行高
    var innerPad = 16;               // 卡片内边距

    // ============ 预备：离屏 canvas 用于文本测量 ============
    var mc = document.createElement('canvas').getContext('2d');

    function measureLines(text, sizePx, weight, maxW) {
        mc.font = weight + ' ' + sizePx + 'px "PingFang SC","Microsoft YaHei","SimHei",sans-serif';
        if (mc.measureText(text).width <= maxW) return [text];
        var lines = [], cur = '';
        for (var i = 0; i < text.length; i++) {
            var test = cur + text[i];
            if (mc.measureText(test).width > maxW && cur.length > 0) { lines.push(cur); cur = text[i]; }
            else { cur = test; }
        }
        if (cur) lines.push(cur);
        return lines;
    }

    // ============ 第一遍：计算总高度 ============
    var cy = padTop;

    // 头部：badge (76) + gap (24) + name (28) + gap (36) + dims
    cy += 76 + 24 + 28 + 36;
    cy += 4 * (30 + 22);  // dim bars
    cy += 16;

    // 分隔线
    cy += 30;

    // ---- 遍历所有 section 累计高度 ----
    var sections = [];

    // 1. 基本特点
    sections.push({ title: '✨ 基本特点', bodyLines: measureLines(desc.basic_features, 17, '400', contentW) });

    // 2. 优缺点
    var prosLines = []; for (var i = 0; i < desc.pros_cons.pros.length; i++) prosLines.push(desc.pros_cons.pros[i]);
    var consLines = []; for (var j = 0; j < desc.pros_cons.cons.length; j++) consLines.push(desc.pros_cons.cons[j]);
    sections.push({ title: '⚖️ 性格优缺点', type: 'proscons', pros: prosLines, cons: consLines });

    // 3. 核心价值观
    sections.push({ title: '🎯 核心驱动力与价值观', type: 'bullets', items: desc.core_drives_values });

    // 4. 职业方向
    sections.push({ title: '💼 适合发展路线', type: 'bullets', items: desc.career_paths });

    // 5. 人际关系
    sections.push({
        title: '💬 人际关系', type: 'relations',
        friendshipLines: measureLines('🤝 友谊：' + desc.relationships.friendship, 16, '400', contentW - innerPad * 2),
        loveLines: measureLines('💕 爱情：' + desc.relationships.love, 16, '400', contentW - innerPad * 2)
    });

    // 6. 沟通风格
    sections.push({ title: '🗣️ 沟通风格', bodyLines: measureLines(desc.communication_style, 17, '400', contentW) });

    // 7. 压力下表现
    sections.push({ title: '😰 压力下的表现', bodyLines: measureLines(desc.under_pressure, 17, '400', contentW) });

    // 8. 成长建议
    sections.push({ title: '🌱 成长建议与注意事项', type: 'bullets', items: desc.growth_advice });

    // 累计每个 section 的高度
    for (var s = 0; s < sections.length; s++) {
        var sec = sections[s];
        cy += titleH + 14; // 标题

        if (sec.type === 'proscons') {
            // 左右两列取最大值
            var colW = (contentW - 20) / 2;
            var ph = 20 + innerPad * 2 + sec.pros.length * 26;
            var ch = 20 + innerPad * 2 + sec.cons.length * 26;
            cy += Math.max(ph, ch);
        } else if (sec.type === 'bullets') {
            cy += sec.items.length * listLineH;
        } else if (sec.type === 'relations') {
            var rH = innerPad * 2 + 22 + Math.max(sec.friendshipLines.length, 1) * 24 + 16 + 22 + Math.max(sec.loveLines.length, 1) * 24;
            cy += rH;
        } else {
            cy += sec.bodyLines.length * bodyLineH;
        }
        cy += sectionGap;
    }
    cy -= sectionGap;

    // 底部水印
    cy += 36 + 20;
    var H = cy + padBot;

    // ============ 第二遍：绘制 ============
    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    var FONT = '"PingFang SC","Microsoft YaHei","SimHei",sans-serif';

    // 背景渐变
    var bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#fafbff');
    bgGrad.addColorStop(0.5, '#f5f3ff');
    bgGrad.addColorStop(1, '#fafbff');
    ctx.fillStyle = bgGrad;
    roundFill(ctx, 0, 0, W, H, 48);

    // 装饰圆
    ctx.save();
    ctx.beginPath(); ctx.arc(W + 40, -30, 160, 0, Math.PI * 2); ctx.fillStyle = 'rgba(232,234,255,0.5)'; ctx.fill();
    ctx.beginPath(); ctx.arc(-40, H - 80, 120, 0, Math.PI * 2); ctx.fillStyle = 'rgba(236,229,245,0.4)'; ctx.fill();
    ctx.restore();

    // 圆角裁剪
    ctx.save();
    roundClip(ctx, 0, 0, W, H, 48);

    // 外边框
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = borderW;
    roundStroke(ctx, 3, 3, W - 6, H - 6, 48);

    cy = padTop;

    // ---- 头部：Badge ----
    var badgeText = mbtiType;
    ctx.font = '900 52px ' + FONT;
    var badgeW = ctx.measureText(badgeText).width + 64;
    var badgeX = (W - badgeW) / 2;
    var grad = ctx.createLinearGradient(badgeX, cy, badgeX + badgeW, cy + 76);
    grad.addColorStop(0, '#667eea'); grad.addColorStop(1, '#764ba2');
    roundFill(ctx, badgeX, cy, badgeW, 76, 38);
    ctx.fillStyle = grad; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, W / 2, cy + 38);
    cy += 76 + 24;

    // ---- 头部：名称 ----
    ctx.fillStyle = '#555'; ctx.font = '600 21px ' + FONT;
    ctx.fillText(desc.name, W / 2, cy);
    cy += 28 + 36;

    // ---- 维度条 ----
    var barAreaX = padX + 10;
    var barAreaW = W - (padX + 10) * 2;
    for (var d = 0; d < dims.length; d++) {
        var dim = dims[d];
        var barH = 30, barR = 15, barY = cy;
        var leftPx = Math.round((barAreaW - 48) * dim.p / 100);

        ctx.fillStyle = '#667eea'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.font = '700 16px ' + FONT;
        ctx.fillText(dim.left, barAreaX - 4, barY + barH / 2);

        ctx.fillStyle = '#764ba2'; ctx.textAlign = 'right';
        ctx.fillText(dim.right, barAreaX + barAreaW + 4, barY + barH / 2);

        // 轨
        ctx.fillStyle = '#e0e0e0';
        roundFill(ctx, barAreaX + 22, barY, barAreaW - 44, barH, barR); ctx.fill();

        // 填充
        if (leftPx > 0) {
            var fgGrad = ctx.createLinearGradient(barAreaX + 22, barY, barAreaX + 22 + (barAreaW - 44), barY + barH);
            fgGrad.addColorStop(0, '#667eea'); fgGrad.addColorStop(1, '#764ba2');
            ctx.fillStyle = fgGrad;
            var fw = Math.max(leftPx, barR * 2);
            if (fw > barAreaW - 44) fw = barAreaW - 44;
            roundFill(ctx, barAreaX + 22, barY, fw, barH, barR); ctx.fill();
        }
        cy += barH + 22;
    }
    cy += 16;

    // ---- 分隔线 ----
    ctx.strokeStyle = '#d5d8f0'; ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(padX + 20, cy); ctx.lineTo(W - padX - 20, cy); ctx.stroke();
    ctx.setLineDash([]);
    cy += 30;

    // ---- 逐 section 绘制 ----
    function drawSectionTitle(text) {
        ctx.fillStyle = '#333'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.font = '700 22px ' + FONT;
        ctx.fillText(text, padX + 10, cy);
        // 左侧强调线
        var lineY = cy + 32;
        ctx.strokeStyle = '#667eea'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(padX + 10, lineY); ctx.lineTo(padX + 50, lineY); ctx.stroke();
        cy += titleH + 14;
    }

    function drawBodyText(lines) {
        ctx.fillStyle = '#555'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.font = '400 17px ' + FONT;
        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], padX + 10, cy);
            cy += bodyLineH;
        }
    }

    function drawBullets(items) {
        for (var i = 0; i < items.length; i++) {
            // 圆点
            ctx.fillStyle = '#667eea';
            ctx.beginPath(); ctx.arc(padX + 18, cy + 13, 4, 0, Math.PI * 2); ctx.fill();
            // 文字
            ctx.fillStyle = '#555'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
            ctx.font = '400 16px ' + FONT;
            ctx.fillText(items[i], padX + 30, cy);
            cy += listLineH;
        }
    }

    function drawProCon(pros, cons) {
        var colW = (contentW - 20) / 2;
        var colH_pro = 20 + innerPad * 2 + pros.length * 26;
        var colH_con = 20 + innerPad * 2 + cons.length * 26;
        var colMax = Math.max(colH_pro, colH_con);
        var x1 = padX + 10;
        var x2 = x1 + colW + 20;
        var baseY = cy;

        // 优点框
        roundFill(ctx, x1, baseY, colW, colMax, 12);
        ctx.fillStyle = 'rgba(0,180,100,0.08)'; ctx.fill();
        roundStroke(ctx, x1, baseY, colW, colMax, 12);
        ctx.strokeStyle = '#b8d4c1'; ctx.lineWidth = 1.5; ctx.stroke();

        ctx.fillStyle = '#2c7a47'; ctx.font = '700 16px ' + FONT;
        ctx.fillText('✅ 优点', x1 + innerPad, baseY + innerPad + 5);
        ctx.fillStyle = '#555'; ctx.font = '400 14px ' + FONT;
        for (var i = 0; i < pros.length; i++) {
            ctx.fillText('· ' + pros[i], x1 + innerPad, baseY + innerPad + 26 + i * 26);
        }

        // 缺点框
        roundFill(ctx, x2, baseY, colW, colMax, 12);
        ctx.fillStyle = 'rgba(220,80,80,0.07)'; ctx.fill();
        roundStroke(ctx, x2, baseY, colW, colMax, 12);
        ctx.strokeStyle = '#e0c0c0'; ctx.lineWidth = 1.5; ctx.stroke();

        ctx.fillStyle = '#c0392b'; ctx.font = '700 16px ' + FONT;
        ctx.fillText('⚠️ 缺点', x2 + innerPad, baseY + innerPad + 5);
        ctx.fillStyle = '#555'; ctx.font = '400 14px ' + FONT;
        for (var j = 0; j < cons.length; j++) {
            ctx.fillText('· ' + cons[j], x2 + innerPad, baseY + innerPad + 26 + j * 26);
        }

        cy += colMax;
    }

    function drawRelations(fLines, lLines) {
        var rW = contentW - 20;
        var rH = innerPad * 2 + 22 + Math.max(fLines.length, 1) * 24 + 16 + 22 + Math.max(lLines.length, 1) * 24;
        var rx = padX + 10;

        roundFill(ctx, rx, cy, rW, rH, 12);
        ctx.fillStyle = 'rgba(102,126,234,0.05)'; ctx.fill();
        roundStroke(ctx, rx, cy, rW, rH, 12);
        ctx.strokeStyle = '#d5d8f0'; ctx.lineWidth = 1.5; ctx.stroke();

        var ry = cy + innerPad;
        ctx.fillStyle = '#667eea'; ctx.font = '700 16px ' + FONT; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText('🤝 友谊', rx + innerPad, ry); ry += 24;
        ctx.fillStyle = '#555'; ctx.font = '400 15px ' + FONT;
        for (var f = 0; f < fLines.length; f++) { ctx.fillText(fLines[f], rx + innerPad + 8, ry); ry += 24; }

        ry += 8;
        ctx.fillStyle = '#764ba2'; ctx.font = '700 16px ' + FONT;
        ctx.fillText('💕 爱情', rx + innerPad, ry); ry += 24;
        ctx.fillStyle = '#555'; ctx.font = '400 15px ' + FONT;
        for (var l = 0; l < lLines.length; l++) { ctx.fillText(lLines[l], rx + innerPad + 8, ry); ry += 24; }

        cy += rH;
    }

    // 遍历绘制
    for (var s = 0; s < sections.length; s++) {
        var sec = sections[s];
        drawSectionTitle(sec.title);
        if (sec.type === 'proscons') {
            drawProCon(sec.pros, sec.cons);
        } else if (sec.type === 'bullets') {
            drawBullets(sec.items);
        } else if (sec.type === 'relations') {
            drawRelations(sec.friendshipLines, sec.loveLines);
        } else {
            drawBodyText(sec.bodyLines);
        }
        cy += sectionGap;
    }

    // ---- 底部水印 ----
    cy -= sectionGap;
    cy += 46;
    ctx.fillStyle = '#bbb'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.font = '400 14px ' + FONT;
    ctx.fillText('MBTI 性格测试 · ' + mbtiType + ' · 结果仅供参考', W / 2, cy);

    ctx.restore(); // 结束裁剪

    // ============ 下载 ============
    var link = document.createElement('a');
    link.download = 'MBTI测试结果_' + mbtiType + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    btn.textContent = '📸 保存为图片';
    btn.disabled = false;
}

// 辅助：圆角矩形（填充路径）
function roundFill(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
}

// 辅助：圆角矩形（描边路径）
function roundStroke(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
}

// 辅助：圆角裁剪区域
function roundClip(ctx, x, y, w, h, r) {
    roundFill(ctx, x, y, w, h, r);
    ctx.clip();
}
