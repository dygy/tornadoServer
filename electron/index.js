var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

xhr.open('GET', 'http://127.0.0.1:8888/', true);

xhr.onload = function() {
    const arr = xhr.responseText.split(" ");
    const obj={};
    let endLine=0;
    for (let x=0 ;x<arr.length;x++){
        if (arr[x]===";"){
            endLine++;
        }
        else {
            if (!obj["a"+endLine]) {
                obj["a"+endLine] = [];
                console.log(1)
            }
            obj["a"+endLine].push(`<td>${arr[x]}</td>`)
        }
    }
    let aHTML = `<table>`;
    for (let x =0;x<endLine;x++){
        aHTML+=`<tr>${obj["a"+x].join(" ")}</tr>`
    }
    document.getElementById("fetchTornado").innerHTML = aHTML
}

xhr.onerror = function() {
    alert( 'Ошибка ' + this.status );
}

xhr.send();