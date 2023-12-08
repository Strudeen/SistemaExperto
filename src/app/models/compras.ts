
export interface Compra {
  tipo: string
  fecha: string
  precioTotal: string
  nombreEmpresa: string
  documentos: Documento[]
  medicamento: Medicamento[]
  state: boolean
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Documento {
  fotoURL: string
  state: boolean
  _id: string
}

export interface Medicamento {
  codigoMedicamento: string
  fechaCaducidad: string
  codigoLaboratorio: string
  cantidad: number
  precioUnitario: number
  nroLote: string
  idMedicamentoAlmacen: string
  _id: string
}


export interface CompraForm {
  tipo: string
  fecha: string
  nombreEmpresa: string
  documentos: DocumentoForm[]
  medicamento: MedicamentoForm[]
}

export interface DocumentoForm {
  fotoURL: string
}

export interface MedicamentoForm {
  codigoMedicamento: string
  cantidad: number
  nroLote: string
  codigoLaboratorio: string
  fechaCaducidad: string
  precioUnitario: number
}
