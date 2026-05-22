import {StatusType} from './StatusType.enum';

export const StatusTypeLabel: Record<StatusType, string> = {
  [StatusType.NEW]: 'Nuevo',
  [StatusType.SEMI_NEW]: 'Semi Nuevo',
  [StatusType.TO_REFORM]: 'A Reformar',
}
