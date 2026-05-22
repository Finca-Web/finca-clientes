import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseEntity} from './base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';

/**
 * Base class for API endpoint operations with generic CRUD functionality.
 *
 * @template TEntity - The entity type, which must extend BaseEntity.
 * @template TResource - The resource type, must extend BaseResource.
 * @template TResponse - The response type, must extend BaseResponse.
 * @template TAssembler - The assembler type implementing BaseAssembler with matching generics.
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {}

  /**
   * Retrieves all entities from the API, handling both response objects and arrays.
   * @returns An Observable for an array of entities.
   */
  getAll(params?: HttpParams): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl, { params }).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response.map(resource => this.assembler.toEntityFromResource(resource));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /**
   * Retrieves a single entity by ID.
   * @param id - The ID of the entity.
   * @returns An Observable of the entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  /**
   * Creates a new entity.
   * @param entity - The entity to create.
   * @returns An Observable of the created entity.
   */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  /**
   * Updates an existing entity.
   * @param entity - The entity to update.
   * @param id - The ID of the entity.
   * @returns An Observable of the updated entity.
   */
  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  /**
   * Deletes an entity by ID.
   * @param id - The ID of the entity to delete.
   * @returns An Observable of void.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }

  /**
   * Handles HTTP errors and returns a user-friendly error message.
   * @param operation - The operation that failed.
   * @returns A function that transforms an error into an Observable.
   */
  protected handleError(operation: string) {
    return (error: unknown): Observable<never> => {
      if (error instanceof Error && !(error instanceof HttpErrorResponse)) {
        return throwError(() => new Error(`${operation}: ${error.message}`));
      }

      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => new Error(`${operation}: Unexpected error`));
      }

      let errorMessage = operation;
      if (error.status === 0) {
        const sizeHint = /upload/i.test(operation)
          ? ' Verifica que el backend este activo y que el tamano de archivo/request no exceda el limite configurado.'
          : '';
        errorMessage = `${operation}: Unable to connect to API (${error.url ?? this.endpointUrl}).${sizeHint}`;
      } else if (error.status === 404) {
        errorMessage = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        const validationDetails =
          (Array.isArray(error.error?.errors) && error.error.errors.join(', ')) ||
          (error.error?.errors && typeof error.error.errors === 'object'
            ? Object.entries(error.error.errors)
                .map(([field, message]) => `${field}: ${String(message)}`)
                .join(', ')
            : null);

        const backendMessage =
          (typeof error.error === 'string' && error.error) ||
          validationDetails ||
          error.error?.message ||
          error.error?.error;
        errorMessage = `${operation}: ${backendMessage || error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    };
  }
}
