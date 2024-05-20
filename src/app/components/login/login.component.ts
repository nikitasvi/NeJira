import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    public hide: boolean = true;
    public loginForm: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public login(): void {
        const login = this.loginForm.controls['login'].value;
        const password = this.loginForm.controls['password'].value;

        this.authService.login(login, password)
            .then((res) =>  {
                if (res.token) {
                    AuthService.saveToken(res.token);
                    this.authService.saveUser(res.user);
                    this.router.navigate(['/projects']);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
