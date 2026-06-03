// MBTI 结果页渲染（纯浏览器端）
document.addEventListener('DOMContentLoaded', function() {
    var resultDiv = document.getElementById('result-content');

    // 从 URL 参数读取 MBTI 类型
    var params = new URLSearchParams(window.location.search);
    var mbtiType = params.get('type');

    if (!mbtiType) {
        resultDiv.innerHTML = '<p style="text-align:center;">未找到测试结果，请先<a href="test.html">完成测试</a>。</p>';
        return;
    }

    // 查找描述数据
    var desc = mbtiDescriptions[mbtiType];

    if (!desc) {
        resultDiv.innerHTML = ''
            + '<p>你的性格类型是：<strong>' + mbtiType + '</strong></p>'
            + '<p>抱歉，暂无此类型的详细描述。请<a href="test.html">重新测试</a>。</p>';
        return;
    }

    // ===== 动态渲染结果页 =====
    var html = '';

    // 类型头部
    html += '<div class="mbti-type-header">';
    html += '  <p>你的性格类型是：</p>';
    html += '  <h2><strong>' + desc.name + '</strong></h2>';
    html += '</div>';

    // 基本特点
    html += '<div class="section">';
    html += '  <h3>基本特点</h3>';
    html += '  <p>' + desc.basic_features + '</p>';
    html += '</div>';

    // 优缺点
    html += '<div class="section">';
    html += '  <h3>性格优缺点</h3>';
    html += '  <div class="pros-cons-list">';
    html += '    <div class="pros">';
    html += '      <h4>优点:</h4>';
    html += '      <ul>';
    for (var i = 0; i < desc.pros_cons.pros.length; i++) {
        html += '        <li>' + desc.pros_cons.pros[i] + '</li>';
    }
    html += '      </ul>';
    html += '    </div>';
    html += '    <div class="cons">';
    html += '      <h4>缺点:</h4>';
    html += '      <ul>';
    for (var j = 0; j < desc.pros_cons.cons.length; j++) {
        html += '        <li>' + desc.pros_cons.cons[j] + '</li>';
    }
    html += '      </ul>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    // 核心价值观
    html += '<div class="section">';
    html += '  <h3>核心驱动力与价值观</h3>';
    html += '  <ul>';
    for (var k = 0; k < desc.core_drives_values.length; k++) {
        html += '    <li>' + desc.core_drives_values[k] + '</li>';
    }
    html += '  </ul>';
    html += '</div>';

    // 职业方向
    html += '<div class="section">';
    html += '  <h3>适合发展路线 (职业方向)</h3>';
    html += '  <ul>';
    for (var m = 0; m < desc.career_paths.length; m++) {
        html += '    <li>' + desc.career_paths[m] + '</li>';
    }
    html += '  </ul>';
    html += '</div>';

    // 人际关系
    html += '<div class="section">';
    html += '  <h3>人际关系</h3>';
    html += '  <p><strong>友谊：</strong> ' + desc.relationships.friendship + '</p>';
    html += '  <p><strong>爱情：</strong> ' + desc.relationships.love + '</p>';
    html += '</div>';

    // 沟通风格
    html += '<div class="section">';
    html += '  <h3>沟通风格</h3>';
    html += '  <p>' + desc.communication_style + '</p>';
    html += '</div>';

    // 压力下表现
    html += '<div class="section">';
    html += '  <h3>压力下的表现</h3>';
    html += '  <p>' + desc.under_pressure + '</p>';
    html += '</div>';

    // 成长建议
    html += '<div class="section">';
    html += '  <h3>成长建议与注意事项</h3>';
    html += '  <ul>';
    for (var n = 0; n < desc.growth_advice.length; n++) {
        html += '    <li>' + desc.growth_advice[n] + '</li>';
    }
    html += '  </ul>';
    html += '</div>';

    resultDiv.innerHTML = html;
});
