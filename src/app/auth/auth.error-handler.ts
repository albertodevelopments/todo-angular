import { HttpErrorResponse } from "@angular/common/http";
import { iSignupErrorResponse } from '../interfaces/isignup-error-response';

export function signupErrorsHandler(error: HttpErrorResponse): iSignupErrorResponse{
    const errorResponse: iSignupErrorResponse = {
        'errorCode': error.status,
        'errorDescription': 'Oops... something went wrong'  
    }

    return errorResponse
}