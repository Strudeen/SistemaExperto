export interface Pedido {
  _id: string
  estado: string
  fechaPedido: string
  medicamentos: Medicamentos[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Medicamentos {
  codigoMedicamento: string
  cantidadSolicitada: number
} 

export interface CrearPedido {
  medicamentos: Medicamentos[]
}

export interface ActualizarPedido {
  nuevoEstado: string
}

