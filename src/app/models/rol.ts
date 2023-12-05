export interface Rol {
    _id: string
    nombre: string
    descripcion: string
    state: boolean
    createdAt: Date
    updatedAt: Date

  }
  

  export interface CrearRol {
    nombre: string
    descripcion: string
}
  
