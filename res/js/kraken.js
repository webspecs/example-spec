(function () {
    // don't try to support useless browsers
    if (!document.querySelectorAll) return;
    
    
    // handle contributors' list
    var contributorsEl;
    function showContributors () {
        var parent = document.getElementById("meta")
        ,   el = document.createElement("div")
        ;
        el.id = "meta-contributors";
        el.innerHTML = "<h2>Contributors</h2><ul class='contributors'><li><img src='res/img/loading.gif' width='32' height='32'></li></ul>";
        parent.appendChild(el);
        contributorsEl = el;
    }
    function updateContributors (data) {
        if (!contributorsEl) return;
        var ul = contributorsEl.querySelector("ul.contributors");
        if (!ul) return;
        ul.innerHTML = "";
        data.forEach(function (person) {
            var li = document.createElement("li");
            li.className = "person";
            var a = document.createElement("a");
            a.href = person.url;
            li.appendChild(a);
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
            ul.appendChild(li);
        });
    }
    function errorContributors (err) {
        if (!contributorsEl) return;
        var ul = contributorsEl.querySelector("ul.contributors");
        if (!ul) return;
        ul.innerHTML = "";
        var li = document.createElement("li");
        li.className = "error";
        li.textContent = err;
        ul.appendChild(li);
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
