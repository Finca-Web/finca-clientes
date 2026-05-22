import {PropertyType} from './PropertyType.enum';

export const PropertyTypeLabel : Record<PropertyType, string> = {
  [PropertyType.APARTMENT]: 'Departamento',
  [PropertyType.MINI_APARTMENT]: 'Mini Departamento',
  [PropertyType.HOUSE]: 'Casa',
  [PropertyType.LAND]: 'Terreno',
  [PropertyType.COMMERCIAL]: 'Local Comercial',
  [PropertyType.OFFICE]: 'Oficina',
  [PropertyType.INDUSTRIAL]: 'Industrial',
}
