/* 
* Logic stolen from: https://ciuy.readthedocs.io/es/latest/about.html#calculating-the-validation-number
*/
export function ciValidator(ci: string){
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
        const lastDigit: number = parseInt(ci.charAt(ci.length-1));
        if (ci.length<8) {
            multi=multi.slice(1,multi.length);
        }
        
        for (let i = 0; i<(ci.length-1); i++) {
            const nro: number =parseInt(ci.charAt(i));
            acum+=nro*multi[i];
        }
        acum=acum%10;
        if (acum==lastDigit) {
            isValid=true;
        }
    }
        
    return isValid;
}