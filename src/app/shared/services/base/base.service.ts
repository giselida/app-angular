import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CrudApiService, Entity } from '../../interfaces/crud.interfaces';
import { ApiResponse } from '../../interfaces/shared.interfaces';

function fakeApiResponse<T>(statusCode: number, message: string, data: T) {
  return {
    statusCode,
    message,
    data,
  };
}

@Injectable({
  providedIn: 'root',
})
export class BaseServiceApi<T> implements CrudApiService<T> {
  items: Entity<T>[];

  id: number = 0;

  getOne(id: number): Observable<ApiResponse<T>> {
    return of(
      fakeApiResponse(
        200,
        'Resposta enviada com sucesso!',
        this.items.find((item) => item.id == id) as T
      )
    );
  }

  getItems(): Observable<ApiResponse<T[]>> {
    return of(
      fakeApiResponse(200, 'Resposta enviada com sucesso!', this.items as T[])
    );
  }

  create(entity: Partial<Entity<T>>): Observable<ApiResponse<T>> {
    const newEntity = { ...entity, id: ++this.id } as Entity<T>;

    this.items.push(newEntity);

    return of(
      fakeApiResponse(200, 'Resposta enviada com sucesso!', newEntity as T)
    );
  }

  update(entity: Entity<T>): Observable<ApiResponse<T>> {
    const index = this.items.findIndex((item) => item.id);

    this.items[index] = entity;
    return of(
      fakeApiResponse(200, 'Resposta enviada com sucesso!', entity as T)
    );
  }

  remove(id: number): Observable<ApiResponse<Entity<T>>> {
    const item = this.items.find((item) => item.id === id);
    this.items.filter((item) => item.id != id);

    return of(fakeApiResponse(200, 'Resposta enviada com sucesso!', item!));
  }
}
