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

function captureData(): string {
    const e: HTMLInputElement | null = document.querySelector("#ci");
    if(e != null){
        const value: string = e!.value;
        if(value.trim() !== "") {
            return value;
        }
    }
    throw new Error("No se pudo obtener el valor ingresado");
}

function validateData(ci: string): void {
    //validate if ci is a valid uruguayan ci
    if(!validateDigitoVerificadorCI(ci)) throw new Error("Cédula inválida");
}

/* 
* Logic stolen from: https://ciuy.readthedocs.io/es/latest/about.html#calculating-the-validation-number
*/
function validateDigitoVerificadorCI(ci: string){
    let multi: Array<number> = [8,1,2,3,4,7,6];
    let acum: number = 0;
    let isValid: boolean = false;

    if(ci.length>6 && ci.length<10){
        for(let i = 0; i< ci.length; i++){
            const nro = ci.charAt(i);
            //check if nro is a number, if not, return false
            if(isNaN(parseInt(nro))) return isValid;
        }

        //we can assume that ci is a number, so we save it as one
        const digitoVerificador: number = parseInt(ci.charAt(ci.length-1));
        if (ci.length<8) {
            multi=multi.slice(1,multi.length);
        }
        
        for (let i = 0; i<(ci.length-1); i++) {
            const nro: number =parseInt(ci.charAt(i));
            acum+=nro*multi[i];
        }
        acum=acum%10;
        if (acum==digitoVerificador) {
            isValid=true;
        }
    }
        
    return isValid;
}