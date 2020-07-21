import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = this.router.url === '/auth/signin' ? true : false;
  isLoading = false;
  userNamePerson: '';
  hideFormContent = false;
  hideAllForm = false;
  error: string = null;
  registerForm: FormGroup;
  submitted = false;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.isLoginMode) {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSwitchModeSignin() {
    this.isLoginMode = true;
  }
  onSwitchModeSignup() {
    this.isLoginMode = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log('this.registerForm.valid', this.registerForm.valid)
    if (!this.registerForm.valid) {
      return;
    }

    this.submitted = false;
    this.isLoading = true;
    this.userNamePerson = this.registerForm.value.name;
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(name, email, password);
    }

    authObs.subscribe(response => {
      setTimeout(() => {
        this.isLoading = false;
        this.hideFormContent = true;
      }, 4000)
      setTimeout(() => {
        this.authService.handleAuthentification(
          response.name,
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn);
        this.hideAllForm = true;
        this.router.navigate(['/product']);
      }, 5500)
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
    })

    this.registerForm.reset();
  }

  onHandleerror() {
    this.error = null;
    this.isLoading = false;
  }


  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    //create component dynamically
    const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
