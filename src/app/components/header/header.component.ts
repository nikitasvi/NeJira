import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    constructor(private readonly router: Router) { }
    
    public ngOnInit(): void {
        const isLoggedIn = AuthService.isLoggedIn();

        if (!isLoggedIn) {
            this.logout();
        }
    }

    public get isLoggedIn(): boolean {
        return AuthService.isLoggedIn();
    }

    public logout(): void {
        AuthService.logout();
        this.router.navigate(['/login']);
    }
}
