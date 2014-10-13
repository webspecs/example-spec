(function () {
    // don't try to support useless browsers
    if (!document.querySelectorAll) return;
    
    
    // handle contributors' list
    var contributorsEl;
    function showContributors () {
        var header = document.getElementById("meta").parentNode
        ,   el = document.createElement("div")
        ;
        el.className = "contributors";
        el.innerHTML = "<img src='res/img/loading.gif' width='32' height='32'> Loading contributors…";
        header.parentNode.insertBefore(el, header.nextSibling);
        contributorsEl = el;
    }
    function updateContributors (data) {
        if (!contributorsEl) return;
        contributorsEl.innerHTML = "";
        data.forEach(function (person) {
            var a = document.createElement("a");
            a.className = "person";
            a.href = person.html_url;
            var img = document.createElement("img");
            img.src = person.avatar_url;
            img.width = 50;
            img.height = 50;
            img.alt = person.login;
            a.appendChild(img);
            a.appendChild(document.createElement("br"));
            var strong = document.createElement("strong");
            strong.textContent = person.login;
            a.appendChild(strong);
            a.appendChild(document.createElement("br"));
            var span = document.createElement("span");
            span.textContent = "(" + person.contributions + ")";
            span.className = "contributions";
            a.appendChild(span);
            contributorsEl.appendChild(a);
        });
        var button = document.createElement("button");
        button.className = "linkalike tool";
        button.textContent = "Hide those pretty faces";
        button.style.fontSize = "0.8em";
        button.style.marginTop = "1em";
        button.onclick = removeContributors;
        contributorsEl.appendChild(document.createElement("br"));
        contributorsEl.appendChild(button);
    }
    function errorContributors (err) {
        if (!contributorsEl) return;
        contributorsEl.innerHTML = "";
        var span = document.createElement("span");
        span.className = "error";
        span.textContent = err;
        contributorsEl.appendChild(span);
    }
    function removeContributors () {
        if (!contributorsEl) return;
        contributorsEl.parentNode.removeChild(contributorsEl);
        contributorsEl = null;
    }
    document.querySelector("button.contributors")
            .addEventListener("click"
                        ,   function (ev) {
                                var repo = ev.currentTarget.getAttribute("data-repository")
                                ,   xhr = new XMLHttpRequest()
                                ;
                                removeContributors();
                                showContributors();
                                if (!repo) return errorContributors("Repository not defined");
                                xhr.open("GET", "https://api.github.com/repos/" + repo + "/contributors");
                                xhr.send();
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState !== 4) return;
                                    if (xhr.status === 200) {
                                        updateContributors(JSON.parse(xhr.responseText));
                                    }
                                    else {
                                        errorContributors(xhr.responseText ? JSON.parse(xhr.responseText).message : "No response");
                                    }
                                };
                            }
                        ,   false
    );
}());
