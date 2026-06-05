import {Injectable} from '@angular/core';
import {Observable} from  'rxjs';
import {PropertyEntity} from '../domain/model/Property.entity';
import {
  CreatePropertyRequest,
  ImageUploadResource,
  PropertySearchParams,
  UpdatePropertyRequest
} from '../infrastructure/properties-response';
import {PropertiesApiEndpoint, PropertiesPage} from '../infrastructure/properties-api-endpoint';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  constructor(private readonly propertiesApiEndpoint: PropertiesApiEndpoint) {}

  getPaged(page = 0, size = 20, sort = 'id,desc'): Observable<PropertiesPage> {
    return this.propertiesApiEndpoint.getAllPaged(page, size, sort);
  }

  getById(id: number): Observable<PropertyEntity> {
    return this.propertiesApiEndpoint.getById(id);
  }

  getFeatured(): Observable<PropertyEntity[]> {
    return this.propertiesApiEndpoint.getFeatured();
  }

  search(filters: PropertySearchParams): Observable<PropertyEntity[]> {
    return this.propertiesApiEndpoint.search(filters);
  }

  uploadImages(files: File[]): Observable<ImageUploadResource[]> {
    return this.propertiesApiEndpoint.uploadImages(files);
  }

  create(request: CreatePropertyRequest): Observable<PropertyEntity> {
    return this.propertiesApiEndpoint.createProperty(request);
  }

  update(id: number, request: UpdatePropertyRequest): Observable<PropertyEntity> {
    return (this.propertiesApiEndpoint as any).updateProperty(id, request);
  }

  deleteById(id: number): Observable<void> {
    return this.propertiesApiEndpoint.deleteProperty(id);
  }
}

