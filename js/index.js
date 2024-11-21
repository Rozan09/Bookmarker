var siteName = document.getElementById("exampleFormControlInput1")
var url = document.getElementById("exampleFormControlInput2")
var siteList;
if (localStorage.getItem("list") == null) {
    siteList = []
} else {
    siteList = JSON.parse(localStorage.getItem("list"))
    displayList()
}


function submitSite() {
    var site = {
        title: siteName.value,
        link: url.value
    }
    siteList.push(site)
    localStorage.setItem("list", JSON.stringify(siteList))

    displayList()
}
function displayList() {
    var data = ""
    for (var i = 1; i < siteList.length; i++) {
        data +=
            `<tr>
                <th>`+ i + `</th>
                <th>`+ siteList[i].title + `</th>
                <th><a href=`+ siteList[i].link + `><button class="visit rounded-2 border-0 text-white"><i class="fa-solid fa-eye"></i> Visit</button></a></th> 
                <th><button onclick="deleteList(`+ i + `)" class="delete rounded-2 border-0 text-white"><i class="fa-solid fa-trash-can"></i> Delete</button></th>
            </tr>`
    }
    document.getElementById("info").innerHTML = data
}
function deleteList(x) {
    siteList.splice(x, 1)
    localStorage.setItem("list", JSON.stringify(siteList))
    displayList()
}

function validate() {
    var pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    var url = document.getElementById("exampleFormControlInput2").value
    var siteName = document.getElementById("exampleFormControlInput1").value
    if (siteName.length >= 3 && pattern.test(url)) {
        submitSite();
    } else {
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show()
    }
}

function validatesiteName() {
    if (siteName.value.length >= 3) {
        siteName.classList.add("valid");
        siteName.classList.remove("invalid");
    } else {
        siteName.classList.add("invalid");
        siteName.classList.remove("valid");
    }
}
siteName.addEventListener("keyup", validatesiteName);

function validateurl() {
    var pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if (pattern.test(url.value)) {
        url.classList.add("valid");
        url.classList.remove("invalid");
    } else {
        url.classList.add("invalid");
        url.classList.remove("valid");
    }
}
url.addEventListener("keyup", validateurl);