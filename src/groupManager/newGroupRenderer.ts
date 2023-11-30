window.addEventListener("load", initial);

function initial(): void{
    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") {
            sendData(captureDataFromHTML());
        }
    });
    const btn = document.querySelector("#btn") as HTMLButtonElement;
    btn.addEventListener("click", () => {
        sendData(captureDataFromHTML());
    })
}

function captureDataFromHTML(): string{
    const input = document.querySelector("#name") as HTMLInputElement;
    return input.value.toUpperCase();
}

async function sendData(name: string): Promise<void>{
    if(name != "" && name != null){
        const res = await window.createGroup.sendGroupToMain(name);
        renderResponse(res);
    }
}

function renderResponse(response: string): void{
    const p = document.querySelector("#msg") as HTMLParagraphElement;
    p.innerHTML = response;
}