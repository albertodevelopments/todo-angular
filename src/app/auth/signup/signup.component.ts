import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iSignupSuccessfulResponse } from 'src/app/interfaces/isignup-successful-response';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/signup.service';
import { passwordsMustMatchValidator } from '../../directives/passwords-match.validator';
import { signupErrorsHandler } from '../auth.error-handler'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public signupForm: FormGroup
  public signUpErrorMessage: any

  constructor(
    private formBuilderService: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ){
    this.signupForm = this.formBuilderService.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])      
    }, {validators: passwordsMustMatchValidator})

    this.signUpErrorMessage = ''
  }

  /** Getters para poder acceder a los valores del formulario */
  get name(): FormControl{
    return this.signupForm.get('name') as FormControl
  }
  get email(): FormControl{
    return this.signupForm.get('email') as FormControl
  }
  get password(): FormControl{
    return this.signupForm.get('password') as FormControl
  }
  get confirmPassword(): FormControl{
    return this.signupForm.get('confirmPassword') as FormControl
  }

  signup(){
    this.signupForm.markAsPending()
    const user = new User({
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    })

    this.loginService.login(user).subscribe({
      next: results => this.handleSuccess(results),
      error: error => this.handleError(error)
    })
  }

  private handleError(error: HttpErrorResponse): void{
    this.signupForm.setErrors({requestResponseError: true})
    this.signUpErrorMessage = signupErrorsHandler(error)
  }

  private handleSuccess(response: iSignupSuccessfulResponse){
    this.router.navigate(['/tasks-list'])
  }
}
