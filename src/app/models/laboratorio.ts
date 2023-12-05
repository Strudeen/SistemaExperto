export interface Laboratorio {
    _id: string
    codigo: string
    nombre: string
    nit: string
    telefono: string
    celular: string
    email: string
    direccion: string
    state: boolean
    createdAt: Date
    updatedAt: Date
    
  }
export interface CrearLaboratorio {
    codigo: string,
    nombre: string,
    nit: string,
    telefono: string,
    celular: string,
    email: string,
    direccion: string,
}
  

