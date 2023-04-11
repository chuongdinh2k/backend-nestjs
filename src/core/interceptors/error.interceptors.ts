import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

import * as Errors from '../errors';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private getErrorMessage(error?: any): string {
    return error?.message || JSON.stringify(error) || String(error);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      catchError((error) => {
        console.error(
          `${request?.method}: ${request?.url} - Failure: `,
          this.getErrorMessage(error),
        );
        switch (error.constructor) {
          case Errors.ConflictError:
            throw new ConflictException(error.message);
          case Errors.EntityNotFoundError:
            throw new NotFoundException(error.message);
          case Errors.InvalidDataError:
            throw new BadRequestException(error.message);
          case Errors.NotAllowedError:
            throw new ForbiddenException(error.message);
          default:
            throw error;
        }
      }),
    );
  }
}
