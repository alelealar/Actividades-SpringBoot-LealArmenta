import AuthService from '../services/AuthService.js';

/**
 * ============================================================
 *  login.js — Controlador de login.html
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {

    console.log(window)
    console.log(window.screen)
    console.log(window.navigator)
    // Si ya hay sesión no tiene caso mostrar el login
    if (AuthService.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('login-form');

    // TODO: 1. Escuchar el evento 'submit' de loginForm (la función debe ser async)
    loginForm.addEventListener("submit", async (e)=>{
        e.preventDefault(); //le quitamos el comportamiento
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        try {
            await AuthService.login(username, password);
            window.location.href = "index.html";
        } catch (error) {
            alert(error.message)
        }
    })
 
});
