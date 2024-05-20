import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(private readonly router: Router) { }

    public get isLoggedIn(): boolean {
        return AuthService.isLoggedIn();
    }

    public logout(): void {
        AuthService.logout();
        this.router.navigate(['/login']);
    }
}
