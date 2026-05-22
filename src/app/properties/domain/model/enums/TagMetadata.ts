import { Tag} from './Tag.enum';
import { TagCategory} from './TagCategory.enum';

export interface TagMeta {
  label: string;
  category: TagCategory;
}

export const TagMetadata: Record<Tag, TagMeta> = {
  // MAS AMBIENTES
  [Tag.COMEDOR_DIARIO]: { label: 'Comedor diario', category: TagCategory.MAS_AMBIENTES },
  [Tag.DORMITORIO_PRINCIPAL]: { label: 'Dormitorio principal', category: TagCategory.MAS_AMBIENTES },
  [Tag.INGRESO_INDEPENDIENTE]: { label: 'Ingreso independiente', category: TagCategory.MAS_AMBIENTES },
  [Tag.PATIO]: { label: 'Patio', category: TagCategory.MAS_AMBIENTES },
  [Tag.SALA_DE_ESTAR]: { label: 'Sala de estar', category: TagCategory.MAS_AMBIENTES },
  [Tag.AREA_DE_BBQ]: { label: 'Área de BBQ', category: TagCategory.MAS_AMBIENTES },

  // SERVICIOS
  [Tag.AREA_DE_LAVANDERIA]: { label: 'Área de lavandería', category: TagCategory.SERVICIOS },
  [Tag.AREAS_VERDES]: { label: 'Áreas verdes', category: TagCategory.SERVICIOS },
  [Tag.GUARDIANIA]: { label: 'Guardianía', category: TagCategory.SERVICIOS },
  [Tag.PARRILLA]: { label: 'Parrilla', category: TagCategory.SERVICIOS },
  [Tag.SERVICIOS_BASICOS]: { label: 'Servicios básicos', category: TagCategory.SERVICIOS },
  [Tag.TELEVISION_POR_CABLE]: { label: 'Televisión por cable', category: TagCategory.SERVICIOS },
  [Tag.GIMNASIO]: { label: 'Gimnasio', category: TagCategory.SERVICIOS },
  [Tag.INTERNET]: { label: 'Internet', category: TagCategory.SERVICIOS },
  [Tag.LINEA_BLANCA]: { label: 'Línea blanca', category: TagCategory.SERVICIOS },
  [Tag.ILUMINARIAS]: { label: 'Iluminarias', category: TagCategory.SERVICIOS },
  [Tag.SALA_Y_COMEDOR]: { label: 'Sala y comedor', category: TagCategory.SERVICIOS },
  [Tag.JUEGOS_INFANTILES]: { label: 'Juegos infantiles', category: TagCategory.SERVICIOS },
  [Tag.SERVICIO_DE_LIMPIEZA]: { label: 'Servicio de limpieza', category: TagCategory.SERVICIOS },
  [Tag.SISTEMA_DE_ALARMA]: { label: 'Sistema de alarma', category: TagCategory.SERVICIOS },
  [Tag.USO_COMERCIAL]: { label: 'Uso comercial', category: TagCategory.SERVICIOS },
  [Tag.USO_PROFESIONAL]: { label: 'Uso profesional', category: TagCategory.SERVICIOS },
  [Tag.VIDEO_VIGILANCIA]: { label: 'Video vigilancia', category: TagCategory.SERVICIOS },

  // EXTRAS
  [Tag.COCINA]: { label: 'Cocina', category: TagCategory.EXTRAS },
  [Tag.CUARTO_DE_SERVICIO]: { label: 'Cuarto de servicio', category: TagCategory.EXTRAS },
  [Tag.ESCUELAS_CERCANAS]: { label: 'Escuelas cercanas', category: TagCategory.EXTRAS },
  [Tag.JARDIN]: { label: 'Jardín', category: TagCategory.EXTRAS },
  [Tag.PET_FRIENDLY]: { label: 'Pet friendly', category: TagCategory.EXTRAS },
  [Tag.TERRAZA]: { label: 'Terraza', category: TagCategory.EXTRAS },
  [Tag.ACABADOS_DE_LUJO]: { label: 'Acabados de lujo', category: TagCategory.EXTRAS },
  [Tag.AMOBLADO]: { label: 'Amoblado', category: TagCategory.EXTRAS },
  [Tag.CASETA_DE_GUARDIA]: { label: 'Caseta de guardia', category: TagCategory.EXTRAS },
  [Tag.CENTROS_COMERCIALES_CERCANOS]: { label: 'Centros comerciales cercanos', category: TagCategory.EXTRAS },
  [Tag.CHIMENEA]: { label: 'Chimenea', category: TagCategory.EXTRAS },
  [Tag.CLOSET]: { label: 'Clóset', category: TagCategory.EXTRAS },
  [Tag.COCINA_INTEGRAL]: { label: 'Cocina integral', category: TagCategory.EXTRAS },
  [Tag.EN_CONDOMINIO]: { label: 'En condominio', category: TagCategory.EXTRAS },
  [Tag.FRENTE_AL_MAR]: { label: 'Frente al mar', category: TagCategory.EXTRAS },
  [Tag.FRENTE_AL_PARQUE]: { label: 'Frente al parque', category: TagCategory.EXTRAS },
  [Tag.INTERCOMUNICADOR]: { label: 'Intercomunicador', category: TagCategory.EXTRAS },
  [Tag.JACUZZI]: { label: 'Jacuzzi', category: TagCategory.EXTRAS },
  [Tag.PARQUES_CERCANOS]: { label: 'Parques cercanos', category: TagCategory.EXTRAS },
  [Tag.PISCINA]: { label: 'Piscina', category: TagCategory.EXTRAS },
  [Tag.SEGURIDAD]: { label: 'Seguridad', category: TagCategory.EXTRAS },
  [Tag.VISTA_A_LA_CIUDAD]: { label: 'Vista a la ciudad', category: TagCategory.EXTRAS },
  [Tag.VISTA_AL_MAR]: { label: 'Vista al mar', category: TagCategory.EXTRAS },
  [Tag.VISTA_AL_PARQUE]: { label: 'Vista al parque', category: TagCategory.EXTRAS },
  [Tag.WALK_IN_CLOSET]: { label: 'Walk-in closet', category: TagCategory.EXTRAS },
  [Tag.ZONA_INDUSTRIAL]: { label: 'Zona industrial', category: TagCategory.EXTRAS }
};
