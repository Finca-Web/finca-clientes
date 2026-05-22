import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export interface PropertyImageEntityProps {
  id?: number;
  fileName: string;
  filePath: string;
  displayOrder: number;
  cover: boolean;
}

export class PropertyImageEntity implements BaseEntity {
  id: number;
  fileName: string;
  filePath: string;
  displayOrder: number;
  cover: boolean;

  constructor(props: PropertyImageEntityProps) {
    this.id = props.id ?? 0;
    this.fileName = props.fileName;
    this.filePath = props.filePath;
    this.displayOrder = props.displayOrder;
    this.cover = props.cover;

    this.validate();
  }

  update(fileName: string, filePath: string, displayOrder: number, cover: boolean): void {
    this.fileName = fileName;
    this.filePath = filePath;
    this.displayOrder = displayOrder;
    this.cover = cover;

    this.validate();
  }

  unsetCover(): void {
    this.cover = false;
  }

  private validate(): void {
    if (!this.fileName?.trim()) throw new Error('File name cannot be blank');
    if (!this.filePath?.trim()) throw new Error('File path cannot be blank');
    if (this.displayOrder <= 0) throw new Error('Display order must be greater than 0');
  }
}

