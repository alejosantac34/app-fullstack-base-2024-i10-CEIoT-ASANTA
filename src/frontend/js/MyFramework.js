/*
 * Autor: Alejandro Santa Calderón basado en el proyecto de
   Agustin Bassi, Brian Ducca and Santiago Germino.
 * Fecha: October 2024
 * Trabajo Práctico Final - Desarrollo Aplicaciones Web - CEIoT
*/
class MyFramework {
    getElementById(id) {
        let e;
        e = document.getElementById(id);
        return e;
    }
    getElementByEvent(evt) {
        return evt.target;
    }
    // Soporte del request HTTP del tipo GET.
    requestGET(url, listener) {
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    listener.handleGETResponse(xhr.status, xhr.responseText);
                }
                else {
                    listener.handleGETResponse(xhr.status, null);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }
    // Soporte del request HTTP del tipo POST.
    requestPOST(url, data, listener) {
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    listener.handlePOSTResponse(xhr.status, xhr.responseText);
                }
                else {
                    listener.handlePOSTResponse(xhr.status, null);
                }
            }
        };
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
    // Soporte del request HTTP del tipo DELETE.
    requestDELETE(url, data, listener) {
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    listener.handlePOSTResponse(xhr.status, xhr.responseText);
                }
                else {
                    listener.handlePOSTResponse(xhr.status, null);
                }
            }
        };
        xhr.open('DELETE', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
}
