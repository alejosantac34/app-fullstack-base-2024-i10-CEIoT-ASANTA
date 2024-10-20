/*
 * Autor: Alejandro Santa Calderón basado en el proyecto de
   Agustin Bassi, Brian Ducca and Santiago Germino.
 * Fecha: October 2024
 * Trabajo Práctico Final - DAW - CEIoT
*/

class ViewMainPage
{
    private myf: MyFramework;
    
    constructor(myf: MyFramework)
    {
        this.myf = myf;
    }
    
    // Función que muestra los dispositivos de forma dinámica con base en la información 
    // almacenda en la base de datos.
    showDevices(list: DeviceInt[]):void
    {
        let e: HTMLElement = this.myf.getElementById("devicesList");
        for (let dev of list)
        {
            // Si el tipo de dispositivo es igual a 0, entonces utiliza un switch (funcionalidad On/Off).
            if (dev.type == 0)
            {
                // Se consulta el estado del switch en la base de datos.
                let state = "";
                if(dev.state == 1)
                {
                    state = "checked";
                }
                
                e.innerHTML += `<div class="col s6">
                                    <div class="card green darken-3">
                                        <div class="card-content white-text">
                                            <span id="nameDev_${dev.id}" class="card-title"><b><b>${dev.name}</b></b></span>
                                            <p id="descriptionDev_${dev.id}">${dev.description}</p>
                                            <br>
                                            <div class="switch">
                                            <label>
                                                <input id="dev_${dev.id}" type="checkbox" ${state}>
                                                <span class="lever" style="margin-left: 0px;"></span>
                                            </label>
                                            <div class="card-action">
                                                <a class="modal-trigger" href="#modal3" id="edi_${dev.id}">Editar</a>
                                                <a class="modal-trigger" href="#modal2" id="del_${dev.id}">Eliminar</a>
                                          </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>`;
            }
            // En otro caso es un dispositivo dimerizable y se presenta en el slider.
            else
            {            
                e.innerHTML += `<div class="col s6">
                                    <div class="card green darken-3">
                                        <div class="card-content white-text">
                                            <span id="nameDev_${dev.id}" class="card-title"><b><b>${dev.name}</b></b></span>
                                            <p id="descriptionDev_${dev.id}">${dev.description}</p>
                                            <br>
                                            <form action="#">
                                                <p class="range-field">
                                                    <input type="range" id="sli_${dev.id}" min="0" max="100" value="${dev.percent}"/>
                                                </p>
                                            </form>
                                            <div class="card-action">
                                                <a class="modal-trigger" href="#modal3" id="edi_${dev.id}">Editar</a>
                                                <a class="modal-trigger" href="#modal2" id="del_${dev.id}">Eliminar</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            }
        }
    }

    // Recuperar el estado del switch.
    getSwitchStateById(id:string):number
    {
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement> e;
        if(i.checked == true)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    
    // Recuperar el estado del slider.
    getRangeValueById(id:string):number
    {
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement =  <HTMLInputElement> e;
        return Number(i.value);
    }
}

//=======[ End of file ]=======================================================