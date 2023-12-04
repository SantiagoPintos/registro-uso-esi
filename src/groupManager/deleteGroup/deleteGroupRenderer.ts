window.addEventListener("load", load);

function load(){
    populateSelect();
    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") {
            sendToMain(captureGroupName());
        }
    });

    const btn = document.querySelector("#btnEliminar") as HTMLButtonElement;
    btn.addEventListener("click", () => {
        sendToMain(captureGroupName());
    });
}

async function populateSelect(): Promise<void> {
    const list: string[]|undefined = await window.createGroup.getAllGroups();
    const container = document.querySelector("#container") as HTMLDivElement;
    if(list != undefined && list.length > 0){
        const select = document.querySelector("#list") as HTMLSelectElement;
        list.forEach((element: string) => {
            const option = document.createElement("option");
            option.value = element;
            option.text = element;
            select.appendChild(option);
        });
        container.style.display = "block";
    } else {
        const p = document.querySelector("#msg") as HTMLParagraphElement;
        p.innerHTML = "No hay grupos en la base de datos";
        container.style.display = "none";
    }
}

function captureGroupName(): string{
    const input = document.querySelector("#list") as HTMLInputElement;
    return input.value.trim().toUpperCase();
}

async function sendToMain(name: string): Promise<void>{
    if(name.trim() != "" && name != null){
        const res: string = await window.createGroup.deleteGroup(name);
        renderResponseFromMain(res);
    }
}

function renderResponseFromMain(res: string){
    const p = document.querySelector("#msg") as HTMLParagraphElement;
    p.innerHTML = res;
    //wait 3 secs and refresh the page
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}