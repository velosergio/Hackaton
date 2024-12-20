export interface BusinessData {
  ID: number;
  DEPARTAMENTO: string;
  MUNICIPIO: string;
  EMPRESA: string;
  FECHA_REGISTRO: number;
  FECHA_RENOVACION: number;
  VALOR_ACTIVOS: number;
  CODIGO_ACTIVIDAD_PRINCIPAL: string;
  CODIGO_ACTIVIDAD_SECUNDARIA: string;
  TIPO_EMPRESA: string;
  TIPO_ORGANIZACION: string;
  SECTOR_PERTENECE: string;
}

export interface ChartData {
  name: string;
  value: number;
}