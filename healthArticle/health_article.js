// 创建一个 XMLHttpRequest 对象，用于发送 HTTP 请求
var xhr = new XMLHttpRequest();

// 指定要获取的 JSON 文件的 URL
var url = './health.json'; 

// 初始化一个 GET 请求，请求 url 指定的资源，异步执行 (true)
xhr.open('GET', url, true);

// 设置响应类型为 JSON，以便 xhr.response 返回一个 JavaScript 对象
xhr.responseType = 'json';

// 当请求成功完成时，执行以下函数
xhr.onload = function () {
    // 获取响应数据中的 articles 数组
    var articles = xhr.response.articles; 

    // 获取 id 为 "articles" 的 HTML 元素，用于存放文章列表
    var articlesDiv = document.getElementById('articles');

    // 遍历 articles 数组，为每个文章对象创建一个 HTML 元素
    articles.forEach(function (article) {
        // 创建一个 div 元素，表示一篇文章
        var articleDiv = document.createElement('div');
        // 为 articleDiv 添加 "article" 类名，方便样式设置
        articleDiv.classList.add('article');

        // 创建一个 h2 元素，表示文章标题
        var title = document.createElement('h2');
        // 设置标题内容
        title.textContent = article.title;

        // 创建一个 p 元素，表示文章描述
        var description = document.createElement('p');
        // 设置描述内容
        description.textContent = article.description;

        // 创建一个 h3 元素，表示 "Ways to Achieve:" 标题
        var waysHeader = document.createElement('h3');
        // 设置标题内容
        waysHeader.textContent = 'Ways to Achieve:';

        // 创建一个 ul 元素，表示实现方法列表
        var waysList = document.createElement('ul');
        // 遍历 article.ways_to_achieve 数组，为每个方法创建一个列表项
        article.ways_to_achieve.forEach(function (way) {
            // 创建一个 li 元素，表示一个方法
            var listItem = document.createElement('li');
            // 设置方法内容
            listItem.textContent = way;
            // 将方法列表项添加到方法列表中
            waysList.appendChild(listItem);
        });

        // 创建一个 h3 元素，表示 "Benefits:" 标题
        var benefitsHeader = document.createElement('h3');
        // 设置标题内容
        benefitsHeader.textContent = 'Benefits:';

        // 创建一个 ul 元素，表示益处列表
        var benefitsList = document.createElement('ul');
        // 遍历 article.benefits 数组，为每个益处创建一个列表项
        article.benefits.forEach(function (benefit) {
            // 创建一个 li 元素，表示一个益处
            var listItem = document.createElement('li');
            // 设置益处内容
            listItem.textContent = benefit;
            // 将益处列表项添加到益处列表中
            benefitsList.appendChild(listItem);
        });

        // 将标题、描述、实现方法、益处等元素添加到文章元素中
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(waysHeader);
        articleDiv.appendChild(waysList);
        articleDiv.appendChild(benefitsHeader);
        articleDiv.appendChild(benefitsList);

        // 将文章元素添加到文章列表中
        articlesDiv.appendChild(articleDiv);
    });
}

// 发送 HTTP 请求
xhr.send();