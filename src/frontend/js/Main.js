/*
 * Autor: Alejandro Santa Calderón basado en el proyecto de
   Agustin Bassi, Brian Ducca and Santiago Germino.
 * Fecha: October 2024
 * Trabajo Final - DAW - CEIoT
 * Profesor: Martin Ramos.
*/
class Main {
    constructor() {
        this._delDevice = 0;
        this._ediDevice = 0;
    }
    main() {
        // Inicializamos  "Modal" provisto por Materialize.
        let modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, { opacity: 0.7 });
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        this.myf.requestGET("http://localhost:8000/devices", this);
    }
    handleEvent(evt) {
        // Se almacena la accion sobre un elemento
        let b = this.myf.getElementByEvent(evt);
        //  Actualización del registro en el backend a travez del ID del elemento.
        let elementId = Number(b.id.substr(b.id.indexOf("_") + 1, b.id.length - 4));
        // Recuperacion de información por elemento usando el ID (primeros 4 caracteres de ID).
        let elemToggled = b.id.substring(0, 4);
        // Switch.
        switch (elemToggled) {
            // Se accionó el slider.
            case ("sli_"):
                {
                    // Leemos el slider.
                    let sliderValue = this.view.getRangeValueById(b.id);
                    // Construcción de paquete de datos que se envia al POST
                    let sliderData = { "id": elementId, "percent": sliderValue };
                    // Vinculamos POST con el backend
                    this.myf.requestPOST("http://localhost:8000/devices", sliderData, this);
                    break;
                }
            // Inicio del switch.
            case ("dev_"):
                {
                    // Lectura de valos en switch
                    let switchState = this.view.getSwitchStateById(b.id);
                    // Construcción de paquete de datos que ira al POST
                    let switchData = { "id": elementId, "state": switchState };
                    // POST - Backend
                    this.myf.requestPOST("http://localhost:8000/devices", switchData, this);
                    break;
                }
            // Boton Eliminar
            case ("del_"):
                {
                    // Almacenamiento del ID de elemento a borrar, para luego ser usado por el boton de Borrado (Variable privada)
                    this._delDevice = elementId;
                    break;
                }
            // Se accionó el botón de editar.
            case ("edi_"):
                {
                    // Creamos una variable privada para almacenar el ID del dispositivo, para que sea usada por el boton Modal de edisión
                    this._ediDevice = elementId;
                    // Utilizando los datos del dispositivo se reestructura el formulario de Modal
                    this.myf.getElementById('mod_name').value = this.myf.getElementById(`nameDev_${elementId}`).innerText;
                    this.myf.getElementById('mod_description').value = this.myf.getElementById(`descriptionDev_${elementId}`).innerText;
                    // Función del dispositivos, capturada a travez de un switch
                    let deviceFeature = this.myf.getElementById(`dev_${elementId}`);
                    // Se asigna un valor de cero (0) que representa un (on/of) si se encuentra en la lista.
                    if (deviceFeature) {
                        this.myf.getElementById('mod_feature').value = "0";
                    }
                    // En caso contrario se asigna un valor de uno (1)  que representa a un Dimer
                    else {
                        this.myf.getElementById('mod_feature').value = "1";
                    }
                    break;
                }
            // Activación de botón para agregar dispositivos.
            case ("add_"):
                {
                    // Captura de datos ingresados en el formulario
                    let addName = this.myf.getElementById("add_name");
                    let addNoSpacesName = addName.value.replace(/ /g, ' ');
                    let addDescription = this.myf.getElementById("add_description");
                    let addNoSpacesDescription = addDescription.value.replace(/ /g, ' ');
                    let addFeature = this.myf.getElementById("add_feature");
                    let addAppliance = this.myf.getElementById("add_appliance");
                    // Paquete a trasmitir desde POST.
                    let addData = { "name": addNoSpacesName, "description": addNoSpacesDescription, "state": 0, "type": Number(addFeature.value), "percent": 0, "appliance": Number(addAppliance.value) };
                    // POST - Backend
                    this.myf.requestPOST("http://localhost:8000/devices", addData, this);
                    // Se presenta el dispositivo agregado en la pagina
                    window.location.reload();
                    break;
                }
            // Activamos botón para eliminar dispositivos.
            case ("eli_"):
                {
                    // Armamos el paquete de datos para enviar en el DELETE.
                    let delData = { "id": this._delDevice };
                    // Reiniciamos la variable a su estado inicial.
                    this._delDevice = 0;
                    // Enviamos el POST al backend.
                    this.myf.requestDELETE("http://localhost:8000/devices", delData, this);
                    // Se actualiza la página para que se muestre el estado actual de los dispositivos.
                    window.location.reload();
                    break;
                }
            // Se accionó el botón para editar dispositivos.
            case ("mod_"):
                {
                    // Se recuperan todos los datos que se ingresaron en el formulario.
                    let modName = this.myf.getElementById("mod_name");
                    let modNoSpacesName = modName.value.replace(/ /g, ' ');
                    let modDescription = this.myf.getElementById("mod_description");
                    let modNoSpacesDescription = modDescription.value.replace(/ /g, ' ');
                    let modFeature = this.myf.getElementById("mod_feature");
                    let modAppliance = this.myf.getElementById("mod_appliance");
                    // Se arma el paquete para enviarlo a través de POST.
                    let modData = { "id": this._ediDevice, "name": modNoSpacesName, "description": modNoSpacesDescription, "type": Number(modFeature.value), "appliance": Number(modAppliance.value) };
                    // Enviamos el POST al backend.
                    this.myf.requestPOST("http://localhost:8000/devices", modData, this);
                    // Se actualiza la página para que se muestre el dispositivo recientemente agregado.
                    window.location.reload();
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    handleGETResponse(status, response) {
        // Se hace un parsing de la respuesta enviada por el servidor.
        let data = JSON.parse(response);
        // Objeto para asociar todos los eventos.
        let a;
        // Asociamos el botón del modal para agregar nuevos dispositivos a un evento del tipo "click".
        a = this.myf.getElementById(`add_dev`);
        a.addEventListener("click", this);
        // Asociamos el botón del modal para eliminar dispositivos existentes a un evento del tipo "click".
        a = this.myf.getElementById(`eli_dev`);
        a.addEventListener("click", this);
        // Asociamos el botón del modal para editar dispositivos existentes a un evento del tipo "click".
        a = this.myf.getElementById(`mod_dev`);
        a.addEventListener("click", this);
        // Se procesa el contenido de la base de datos para mostrarlo en el frontend.
        this.view.showDevices(data);
        // Evaluamos los distintos botones y actuadores para asignarles un evento.
        for (let i of data) {
            // Primero el botón de eliminar.
            a = this.myf.getElementById(`del_${i.id}`);
            // Y le asociamos el evento.
            a.addEventListener("click", this);
            // Luego el botón de editar.
            a = this.myf.getElementById(`edi_${i.id}`);
            // Y le asociamos el evento.
            a.addEventListener("click", this);
            // Y por último el actuador. En base al tipo de equipo, busco distintos elementos.
            if (i.type == 0) {
                // Si type = 0, busco el switch asociado.
                a = this.myf.getElementById(`dev_${i.id}`);
            }
            else {
                // Si type = 1, busco el slider asociado.
                a = this.myf.getElementById(`sli_${i.id}`);
            }
            // Cualquiera haya sido, los asocio al evento "click".
            a.addEventListener("click", this);
        }
    }
    handlePOSTResponse(status, response) {
        console.log(status);
        console.log(response);
    }
}
//=======[ Main module code ]==================================================
window.onload = function () {
    let m = new Main();
    m.main();
};
//=======[ End of file ]=======================================================
