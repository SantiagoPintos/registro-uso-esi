window.addEventListener("load", main);

function main(): void {
    setInterval(setDate, 1000);
}

function setDate(): void {
    const date: Date = new Date();
    const hour: string = `${date.getHours()}:${date.getMinutes()}`;
    const day: string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    document.querySelector("#hour")!.innerHTML = hour;
    document.querySelector("#date")!.innerHTML = day;
}
