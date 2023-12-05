export interface Usuario {
    _id: string
    nombre: string
    apellido: string
    email: string
    password: string
    rol: string
    sexo: string
    ci: string
    state: boolean
    createdAt: Date
    updatedAt: Date
  }

  export interface CrearUsuario {
    nombre: string
    apellido: string
    email: string
    password: string
    rol: string
    sexo: string
    ci: string

  }
  