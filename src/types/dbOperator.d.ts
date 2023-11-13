declare global {
    interface Alumno{
        ci: string,
        nombre: string,
        grupo: string,
        hora: Date
    }

    interface Grupo{
        nombre: string,
    }

    interface Registro{
        alumno: Alumno,
        entrada: Date,
        salida: Date,
    }
}

export {};