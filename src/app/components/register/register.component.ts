import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    public hide: boolean = true;
    public registerForm: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public register(): void {
        const login = this.registerForm.controls['login'].value;
        const email = this.registerForm.controls['email'].value;
        const password = this.registerForm.controls['password'].value;
      
        this.authService.register(login, email, password)
            .then(() =>  this.router.navigate(['/login']));
    }
}
