export interface Paciente {
    nombre: string
    apellido: string
    ci: string
    edad: string
    state: boolean
    _id: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface CrearPaciente {
    nombre: string
    apellido: string
    ci: string
    edad: string
}
  
