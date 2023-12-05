export interface Almacen {
    _id: string
    codigoMedicamento: string
    cantidad: number
    state: boolean
    datos: string[]
    createdAt: string
    updatedAt: string
}

export interface CrearAlmacen {
  codigoMedicamento: string
  cantidad: number
}
export interface CrearAlmacenDatos {
  fechaCaducidad: string
  codigoLaboratorio: string
  cantidad: string
  nroLote: string
}

export interface AlmacenDatos {
  _id: string
  fechaCaducidad: string
  codigoLaboratorio: string
  cantidad: number
  nroLote: string
  state: boolean
  almacenes: string
  createdAt: string
  updatedAt: string
}

export interface AlmacenEntity {
  _id: string
  codigoMedicamento: string
  cantidad: number
  state: boolean
  datos: AlmacenDatos[]
  createdAt: string
  updatedAt: string
}
  

