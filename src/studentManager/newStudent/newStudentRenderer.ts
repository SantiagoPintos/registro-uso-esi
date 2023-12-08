window.addEventListener("load", mainFunction);

function mainFunction(): void{
    populateGroupSelect();

    const btnBack = document.querySelector("#btnCancelar") as HTMLButtonElement;
    btnBack.addEventListener("click", () => {
        window.groupManager.returnToMain();
    });

    const btnSave = document.querySelector("#btnGuardar") as HTMLButtonElement;
    btnSave.addEventListener("click", () => {
        sendDataToDB(getDataFromForm());
    });

    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") {
            sendDataToDB(getDataFromForm());
        }
    });

}

async function populateGroupSelect(): Promise<void>{
    const groups: string[]|undefined = await window.groupManager.getAllGroups();
    const select = document.querySelector("#group") as HTMLSelectElement;
    const container = document.querySelector("#formContainer") as HTMLDivElement;
    const p = document.querySelector("#msg") as HTMLParagraphElement;

    if(groups != undefined && groups.length > 0){
        container.style.display = "block";
        p.innerHTML = "";
        groups.forEach((group: string) => {
            const option = document.createElement("option");
            option.value = group;
            option.text = group;
            select.appendChild(option);
        });
    } else {
        p.innerHTML = "No hay grupos en la base de datos";
        console.log("No hay grupos en la base de datos");
        container.style.display = "none";
    }
}

function getDataFromForm(): {name: string, ap: string, ci: string, group: string}{
    const name = document.querySelector("#name") as HTMLInputElement;
    const ap = document.querySelector("#ap") as HTMLInputElement;
    const ci = document.querySelector("#ci") as HTMLInputElement;
    const group = document.querySelector("#group") as HTMLSelectElement;

    return {name: name.value, ap: ap.value, ci: ci.value, group: group.value};
}

function validateData(data: {name: string, ap: string, ci: string, group: string}): boolean {
    return data.name.trim() !== "" && data.ap.trim() !== "" && data.ci.trim() !== "" && data.group.trim() !== "";
}

async function sendDataToDB(data: {name: string, ap: string, ci: string, group: string}) {
    if(!validateData(data)){
        renderRes("Datos invalidos");
        return;
    } else {
        const res = await window.studentManager.sendStudentToMain(data);
        renderRes(res);
    }
}

function renderRes(res: string): void{
    const p = document.querySelector("#msg") as HTMLParagraphElement;
    /* If res contains the text "SQLITE_CONSTRAINT: UNIQUE" we should render that the alumno already exists in database */
    if(res.includes("SQLITE_CONSTRAINT: UNIQUE")) res = "El alumno ya existe en la base de datos";
    p.innerHTML = res;
}

