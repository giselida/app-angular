import { Observable } from 'rxjs';
import { ApiResponse } from './shared.interfaces';

export interface CrudApiService<T> {
  getItems(entity: Entity<T>): Observable<ApiResponse<T[]>>;
  getOne(id: number): Observable<ApiResponse<T>>;

  create(entity: Partial<Entity<T>>): Observable<ApiResponse<T>>;
  update(entity: Entity<T>): Observable<ApiResponse<T>>;
  remove(id: number): Observable<ApiResponse<T>>;
}
export type Entity<T> = {
  id: number;
} & {
  [key in keyof T]: T[key];
};
