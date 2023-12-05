export interface Inventario {
    _id: string
    codigoMedicamento: string
    cantidad: number
    state: boolean
    datos: string[]
    createdAt: string
    updatedAt: string
}

export interface CrearInventario {
  codigoMedicamento: string
  cantidad: number
}
export interface CrearInventarioDatos {
  fechaCaducidad: string
  codigoLaboratorio: string
  cantidad: string
  nroLote: string
}

export interface InventarioDatos {
  _id: string
  fechaCaducidad: string
  codigoLaboratorio: string
  cantidad: number
  nroLote: string
  state: boolean
  inventarios: string
  createdAt: string
  updatedAt: string
}

export interface InventarioEntity {
  _id: string
  codigoMedicamento: string
  cantidad: number
  state: boolean
  datos: InventarioDatos[]
  createdAt: string
  updatedAt: string
}
  

