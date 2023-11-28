window.addEventListener("load", main);

function main(): void {
    setInterval(setDate, 1000);
    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") {
            try{
                const ci: string = captureData();
                // we send the data to the main process
                window.ciTransfer.sendToMain(ci);
            } 
            catch(exception: any){
                document.querySelector("#msg")!.innerHTML = exception.message;
                //wait 3 seconds and clear the message
                setTimeout(() => {
                    document.querySelector("#msg")!.innerHTML = "";
                }, 3000);
            }
        }
    });
}

function setDate(): void {
    const date: Date = new Date();
    const hour: string = `${date.getHours()}:${date.getMinutes()}`;
    const day: string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    document.querySelector("#hour")!.innerHTML = hour;
    document.querySelector("#date")!.innerHTML = day;
}

function captureData(): string {
    const e: HTMLInputElement | null = document.querySelector("#ci");
    if(e != null){
        const value: string = e!.value;
        if(value.trim() !== "") return value;
    }
    throw new Error("No se pudo obtener el valor ingresado");
}


