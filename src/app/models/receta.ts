export interface Receta {
  _id: string
  tipoReceta: string
  fechaReceta: string
  ciPaciente: string
  diagnostico: Diagnostico[]
  diagnosticoMedicamentos: DiagnosticoMedicamento[]
  fotoURL: string
  state: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Diagnostico {
  tipoCancer: string
  _id: string
}

export interface DiagnosticoMedicamento {
  medicamentosEntregados: MedicamentosEntregado[]
  codigoMedicamento: string
  cantidadSolicitada: number
  cantidadEntregada: number
  _id: string
}

export interface MedicamentosEntregado {
  inventarioMedicamentoId: string
  cantidadMedicamentoEntregada: number
  _id: string
}

export interface RecetaForm {
  tipoReceta: string
  fechaReceta: string
  ciPaciente: string
  diagnostico: Diagnostico[]
  diagnosticoMedicamentos: DiagnosticoMedicamentoForm[]
  fotoURL: string
}

export interface DiagnosticoForm {
  tipoCancer: string
}

export interface DiagnosticoMedicamentoForm {
  medicamentosEntregados: any[]
  codigoMedicamento: string
  cantidadSolicitada: number
  cantidadEntregada: number
}


