window.addEventListener("load", initial);

function initial(): void{
    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") {
            sendData(captureDataFromHTML());
        }
    });
    const btn = document.querySelector("#btn") as HTMLButtonElement;
    const btnCancelar = document.querySelector("#btnCancelar") as HTMLButtonElement;
    btn.addEventListener("click", () => {
        sendData(captureDataFromHTML());
    })
    btnCancelar.addEventListener("click", () => {
        window.groupManager.returnToMain();
    })
}

function captureDataFromHTML(): string{
    const input = document.querySelector("#name") as HTMLInputElement;
    return input.value.toUpperCase();
}

async function sendData(name: string): Promise<void>{
    if(name.trim().toUpperCase() != "" && name != null){
        const res = await window.groupManager.sendGroupToMain(name.toUpperCase());
        if(res === name.trim().toUpperCase()){
            renderResponse(`Grupo ${name} guardado con éxito`);
        } else {
            renderResponse(res);
        }
    }
}

function renderResponse(response: string): void{
    const p = document.querySelector("#msg") as HTMLParagraphElement;
    p.innerHTML = response;
}