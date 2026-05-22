import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {PropertyEntity} from '../domain/model/Property.entity';
import {
  CreatePropertyRequest,
  ImageUploadResource,
  PropertyResource,
  PropertiesResponse,
  PropertySearchParams,
  UpdatePropertyRequest
} from './properties-response';
import {PropertiesAssembler} from './properties-assembler';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StatusType} from '../domain/model/enums/StatusType.enum';

export interface PropertiesPage {
  data: PropertyEntity[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  sort: string;
}

@Injectable({ providedIn: 'root' })
export class PropertiesApiEndpoint extends BaseApiEndpoint<PropertyEntity, PropertyResource, PropertiesResponse, PropertiesAssembler>{

  constructor(http: HttpClient) {
    super(http, `${environment.serverBasePath}${environment.propertiesEndpointPath}`,
      new PropertiesAssembler());
  }

  getAllPaged(page = 0, size = 20, sort = 'id,desc'): Observable<PropertiesPage> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('sort', sort);

    return this.http.get<PropertiesResponse>(this.endpointUrl, { params }).pipe(
      map((response) => ({
        data: this.assembler.toEntitiesFromResponse(response),
        page: response.page,
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        first: response.first,
        last: response.last,
        hasNext: response.hasNext,
        hasPrevious: response.hasPrevious,
        sort: response.sort
      })),
      catchError(this.handleError('Failed to fetch paged properties'))
    );
  }

  getFeatured(): Observable<PropertyEntity[]> {
    return this.http.get<PropertyResource[]>(`${this.endpointUrl}/featured`).pipe(
      map((resources) => resources.map((resource) => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to fetch featured properties'))
    );
  }

  search(params: PropertySearchParams): Observable<PropertyEntity[]> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return;
      }

      if (key === 'statusType') {
        const mappedStatus = this.toBackendStatusType(value as StatusType);
        httpParams = httpParams.set(key, mappedStatus);
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          httpParams = httpParams.append(key, String(item));
        });
        return;
      }

      httpParams = httpParams.set(key, String(value));
    });

    return this.http.get<PropertyResource[]>(`${this.endpointUrl}/search`, { params: httpParams }).pipe(
      map((resources) => resources.map((resource) => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to search properties'))
    );
  }

  uploadImages(files: File[]): Observable<ImageUploadResource[]> {
    if (!files.length) {
      return of([]);
    }

    const uploadRequests = files.map((file) => {
      const formData = new FormData();
      formData.append('files', file, file.name);

      return this.http.post<ImageUploadResource[]>(`${environment.serverBasePath}/uploads/images`, formData).pipe(
        map((response) => response[0]),
        catchError(this.handleError(`Failed to upload image ${file.name}`))
      );
    });

    return forkJoin(uploadRequests).pipe(
      map((uploaded) => uploaded.filter((item): item is ImageUploadResource => !!item))
    );
  }

  createProperty(request: CreatePropertyRequest): Observable<PropertyEntity> {
    const payload = {
      ...request,
      statusType: this.toBackendStatusType(request.statusType)
    };

    return this.http.post<PropertyResource>(this.endpointUrl, payload).pipe(
      map((resource) => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to create property'))
    );
  }

  updateProperty(id: number, request: UpdatePropertyRequest): Observable<PropertyEntity> {
    const payload = {
      ...request,
      statusType: this.toBackendStatusType(request.statusType)
    };

    return this.http.put<PropertyResource>(`${this.endpointUrl}/${id}`, payload).pipe(
      map((resource) => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to update property'))
    );
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete property'))
    );
  }

  private toBackendStatusType(statusType: StatusType): 'A' | 'B' | 'C' {
    if (statusType === StatusType.NEW) {
      return 'A';
    }

    if (statusType === StatusType.SEMI_NEW) {
      return 'B';
    }

    return 'C';
  }

}
