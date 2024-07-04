const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

// 将条件名称存储在一个数组中，方便维护
const conditions = ["Diabetes", "Thyroid", "High Blood Pressure"];

function addPatient() {
    const name = document.getElementById("name").value;
    const genderElement = document.querySelector('input[name="gender"]:checked');
    // 检查是否选择了性别
    const gender = genderElement ? genderElement.value : "";
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
        patients.push({ name, gender, age, condition });
        resetForm();
        generateReport();
    } else {
        // 如果信息不完整，提示用户
        alert("请填写所有信息！");
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}

function generateReport() {
    const numPatients = patients.length;

    // 使用循环初始化 conditionsCount 和 genderConditionsCount
    const conditionsCount = {};
    const genderConditionsCount = {
        Male: {},
        Female: {},
    };

    for (const condition of conditions) {
        conditionsCount[condition] = 0;
        genderConditionsCount.Male[condition] = 0;
        genderConditionsCount.Female[condition] = 0;
    }

    for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }

    // 使用模板字符串拼接 HTML
    let reportHTML = `Number of patients: ${numPatients}<br><br>`;
    reportHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
        reportHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    reportHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
        reportHTML += `${gender}:<br>`;
        for (const condition in genderConditionsCount[gender]) {
            reportHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }

    // 一次性更新 report.innerHTML
    report.innerHTML = reportHTML;
}

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
            const condition = data.conditions.find(item => item.name.toLowerCase() === input);

            if (condition) {
                // 添加图片文件扩展名
                const symptoms = condition.symptoms.join(', ');
                const prevention = condition.prevention.join(', ');
                const treatment = condition.treatment;

                resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                // 假设图片文件扩展名是 .jpg
                resultDiv.innerHTML += `<img src="${condition.imagesrc}.jpg" alt="${condition.name}">`;
                resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

addPatientButton.addEventListener("click", addPatient);
btnSearch.addEventListener('click', searchCondition);