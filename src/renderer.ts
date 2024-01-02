window.addEventListener("load", main);

function main(): void {
    setInterval(setDate, 1000);
    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") {
            processData(captureData());
        }
    });
}

async function processData(ci: string): Promise<void> {
    try{
        const res: string = await window.ciTransfer.sendToMain(ci);
        document.querySelector("#msg")!.innerHTML = res;
        //wait 3 seconds and clear the message
        setTimeout(() => {
            document.querySelector("#msg")!.innerHTML = "";
        }, 3000);
    }
    catch(exception: any){
        document.querySelector("#msg")!.innerHTML = exception.message;
        //wait 3 seconds and clear the message
        setTimeout(() => {
            document.querySelector("#msg")!.innerHTML = "";
        }, 3000);
    }
}

function setDate(): void {
    const date: Date = new Date();
    const minutes: string = date.getMinutes().toString().padStart(2, '0');
    const hour: string = `${date.getHours().toString().padStart(2, '0')}:${minutes}`;
    const day: string = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    (document.querySelector("#hour") as HTMLElement).innerHTML = hour;
    (document.querySelector("#date") as HTMLElement).innerHTML = day;
}

function captureData(): string {
    const e: HTMLInputElement | null = document.querySelector("#ci");
    if(e != null){
        const value: string = e!.value;
        if(value.trim() !== "") return value;
    }
    throw new Error("No se pudo obtener el valor ingresado");
}


