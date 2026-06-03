// MBTI 测试页面前端逻辑（纯浏览器端，无需服务器）
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mbti-form');
    const questionArea = document.getElementById('question-area');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const progressDisplay = document.getElementById('progress-display');

    let currentQuestionIndex = 0;
    let userAnswers = {};
    const totalQuestions = questionsData.length;

    // 渲染当前题目
    function renderQuestion() {
        questionArea.innerHTML = '';

        if (currentQuestionIndex < 0 || currentQuestionIndex >= totalQuestions) {
            return;
        }

        const question = questionsData[currentQuestionIndex];
        let questionHtml = ''
            + '<div class="question-card" data-question-index="' + currentQuestionIndex + '">'
            + '  <h2>' + (currentQuestionIndex + 1) + '. ' + question.question + '</h2>'
            + '  <div class="options">'
            + '    <label>'
            + '      <input type="radio" name="current_q" value="0" required>'
            + '      <span>' + question.options[0] + '</span>'
            + '    </label>'
            + '    <label>'
            + '      <input type="radio" name="current_q" value="1" required>'
            + '      <span>' + question.options[1] + '</span>'
            + '    </label>'
            + '  </div>'
            + '</div>';
        questionArea.innerHTML = questionHtml;

        // 恢复之前选择的答案
        const previouslySelected = userAnswers[currentQuestionIndex];
        if (previouslySelected !== undefined) {
            const radio = questionArea.querySelector('input[name="current_q"][value="' + previouslySelected + '"]');
            if (radio) {
                radio.checked = true;
            }
        }

        // 选项变更事件：自动跳下一题
        const radios = questionArea.querySelectorAll('input[name="current_q"]');
        radios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                userAnswers[currentQuestionIndex] = parseInt(this.value);
                updateProgressDisplay();
                updateNavigationButtons();

                // 自动跳转到下一题
                if (currentQuestionIndex < totalQuestions - 1) {
                    setTimeout(function() {
                        currentQuestionIndex++;
                        renderQuestion();
                    }, 200);
                } else {
                    updateNavigationButtons();
                }
            });
        });

        updateNavigationButtons();
        updateProgressDisplay();
    }

    // 更新按钮状态
    function updateNavigationButtons() {
        prevButton.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';

        // 下一题按钮：自动跳转模式下始终隐藏
        nextButton.style.display = 'none';

        // 提交按钮：最后一题且全部回答完成
        const allAnswered = Object.keys(userAnswers).length === totalQuestions;
        if (currentQuestionIndex === totalQuestions - 1 && allAnswered) {
            submitButton.style.display = 'inline-block';
        } else {
            submitButton.style.display = 'none';
        }
    }

    // 更新进度
    function updateProgressDisplay() {
        const answeredCount = Object.keys(userAnswers).length;
        var pct = Math.round((answeredCount / totalQuestions) * 100);
        progressDisplay.innerHTML = ''
            + '已完成 <strong>' + answeredCount + '</strong> / ' + totalQuestions + ' 题'
            + '<div class="progress-bar-outer">'
            + '  <div class="progress-bar-inner" style="width:' + pct + '%;"></div>'
            + '</div>';
    }

    // 上一题按钮
    prevButton.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    });

    // ===== 核心改造：浏览器端计算 MBTI 得分 =====
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (Object.keys(userAnswers).length < totalQuestions) {
            alert('请回答所有问题才能查看结果！');
            return;
        }

        // 初始化得分
        var scores = { "E": 0, "I": 0, "S": 0, "N": 0, "T": 0, "F": 0, "J": 0, "P": 0 };

        // 遍历所有题目，计算各维度得分
        for (var i = 0; i < questionsData.length; i++) {
            var q = questionsData[i];
            var answer = userAnswers[i];
            var dimType = q.type;  // "EI", "SN", "TF", "JP"

            if (answer === 0) {
                scores[dimType[0]] += 1;  // 选A → 维度第一个字母
            } else {
                scores[dimType[1]] += 1;  // 选B → 维度第二个字母
            }
        }

        // 组合 MBTI 类型（使用严格 > 避免平分时永远偏向 E/S/T/J）
        var mbtiType = '';
        mbtiType += scores["E"] > scores["I"] ? "E" : "I";
        mbtiType += scores["S"] > scores["N"] ? "S" : "N";
        mbtiType += scores["T"] > scores["F"] ? "T" : "F";
        mbtiType += scores["J"] > scores["P"] ? "J" : "P";

        // 跳转到结果页，通过 URL 参数传递类型 + 各维度分数
        var url = 'result.html?type=' + mbtiType
            + '&E=' + scores['E'] + '&I=' + scores['I']
            + '&S=' + scores['S'] + '&N=' + scores['N']
            + '&T=' + scores['T'] + '&F=' + scores['F']
            + '&J=' + scores['J'] + '&P=' + scores['P'];
        window.location.href = url;
    });

    // 初始化
    renderQuestion();
});
