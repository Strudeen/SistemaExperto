export interface Medicamento {
  _id: string
  codigo: string
  nombre: string
  descripcion: string
  tipo: string
  exclusividad: boolean
  state: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CrearMedicamento {
    codigo: string
    nombre: string
    descripcion: string
    tipo: string
    exclusividad: boolean
}
  
