window.addEventListener("load", main);

function main(): void {
    setInterval(setDate, 1000);
    document.addEventListener("keydown", (event: KeyboardEvent):void => {
        if (event.key === "Enter") captureData();
    });
}

function setDate(): void {
    const date: Date = new Date();
    const hour: string = `${date.getHours()}:${date.getMinutes()}`;
    const day: string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    document.querySelector("#hour")!.innerHTML = hour;
    document.querySelector("#date")!.innerHTML = day;
}

function captureData(): void {
    const e: HTMLInputElement | null = document.querySelector("#ci");
    const value: string = e!.value;
    if(value.trim() != "") console.log(value);
}


