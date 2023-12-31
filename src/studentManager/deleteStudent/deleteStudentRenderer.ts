window.addEventListener("load", setup);
let globalCI: string = "";

function setup():void {
    /* show searchContainer, hide msg and confirm container by default*/
    const searchContainer = document.querySelector("#searchContainer") as HTMLDivElement;
    searchContainer.style.display = "block";

    const msgDiv = document.querySelector("#msgContainer") as HTMLDivElement;
    msgDiv.style.display = "none";

    const confirmContainer = document.querySelector("#confirm") as HTMLDivElement;
    confirmContainer.style.display = "none";
    
    window.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") processAlumnoData();
    });

    const btnSearch = document.querySelector("#btnBuscar") as HTMLButtonElement;
    btnSearch.addEventListener("click", () => {
        processAlumnoData();
    });

    const btnCancel = document.querySelector("#btnCancelar") as HTMLButtonElement;
    btnCancel.addEventListener("click", () => window.groupManager.returnToMain());

    const btnCancelConfirm = document.querySelector("#btnCancelarConfirm") as HTMLButtonElement;
    btnCancelConfirm.addEventListener("click", () => window.groupManager.returnToMain());

    const btnEliminar = document.querySelector("#btnEliminar") as HTMLButtonElement;
    btnEliminar.addEventListener("click", () => deleteStudent());

    /* render the error message from main process */
    window.studentManager.onGetStudentFromCiError((msg: string) => {
        renderErrorMsg(msg);
    });
}

function getCiFromInput():string {
    const ci = document.querySelector("#ci") as HTMLInputElement;
    return ci.value.trim();
}

function renderAlumnoData(alumno: Alumno):void {
    const container = document.querySelector("#confirm") as HTMLDivElement;
    container.style.display = "block";
    globalCI=alumno.ci;
    const name = document.querySelector("#name") as HTMLInputElement;
    name.value = alumno.nombre;
    const ap = document.querySelector("#ap") as HTMLInputElement;
    ap.value = alumno.apellido;
    const ci = document.querySelector("#ciConfirm") as HTMLInputElement;
    ci.value = alumno.ci;
    const group = document.querySelector("#group") as HTMLInputElement;
    group.value = alumno.grupo;
}

function renderErrorMsg(msg: string):void{
    const div = document.querySelector("#msgContainer") as HTMLDivElement;
    div.style.display = "block";

    const errorMsg = document.querySelector("#msg") as HTMLLabelElement;
    errorMsg.innerHTML = msg;

    refreshPage();
}

async function getAlumnoData(ci: string):Promise<Alumno|undefined>{
    return window.studentManager.getStudentFromCi(ci);
}

async function processAlumnoData():Promise<void>{
    //hide search form
    const searchContainer = document.querySelector("#searchContainer") as HTMLDivElement;
    searchContainer.style.display = "none";

    const ci = getCiFromInput();
    const alumno = await getAlumnoData(ci);
    if(alumno) renderAlumnoData(alumno);  
}

function renderConfirmationMsg(msg: string):void{
    const divContainer = document.querySelector("#confirm") as HTMLDivElement;
    divContainer.style.display = "none";
    const div = document.querySelector("#msgContainer") as HTMLDivElement;
    div.style.display = "block";

    const errorMsg = document.querySelector("#msg") as HTMLLabelElement;
    errorMsg.innerHTML = msg;

    refreshPage();
}

async function deleteStudent():Promise<void>{
    if(!globalCI){
        renderErrorMsg('No se pudo obtener el alumno');
        return;
    }

    const ci = globalCI;
    try{
        const res:string|undefined = await window.studentManager.deleteStudentFromDatabase(ci);
        if(res) renderConfirmationMsg(res);
    }catch(e:any){
        renderErrorMsg(e.message);
    }
}

function refreshPage(): void {
    setTimeout(() => {
        location.reload();
    }, 1000);
}