import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from '../../../shared/components/modais/modal-alert/modal-alert.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  dialog = inject(MatDialog);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }

        let errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

        switch (error.status) {
          case 400:
            errorMessage = 'Requisição inválida. Verifique os dados enviados.';
            break;
          case 403:
            errorMessage = 'Você não tem permissão para acessar este recurso.';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
            break;
          default:
            errorMessage = `Erro inesperado: ${error.message}`;
            break;
        }

        this.dialog.closeAll();
        this.dialog.open(ModalAlertComponent, {
          data: { message: errorMessage, found: false }
        });

        return throwError(error);
      })
    );
  }
}