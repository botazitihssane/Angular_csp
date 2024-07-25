import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {lastValueFrom} from 'rxjs';

export function useApi() {
  const http = inject(HttpClient);

  async function get<T>(url: string): Promise<T> {
    return lastValueFrom(http.get<T>(url));
  }

  return {get};

}
