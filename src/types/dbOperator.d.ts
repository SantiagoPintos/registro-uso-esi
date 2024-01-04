declare global {
    interface Alumno{
        ci: string,
        nombre: string,
        apellido: string,
        grupo: string
    }

    interface Grupo{
        nombre: string,
    }

    interface Registro{
        alumno: Alumno,
        hora: Date,
    }
}

export {};