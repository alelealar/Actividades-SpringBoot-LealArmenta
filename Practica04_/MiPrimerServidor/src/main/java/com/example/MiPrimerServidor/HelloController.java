/**
 * Alejandra Leal Armenta, 262719
 * Práctica 1 - Mi Primer Servidor Spring Boot
 * 26 de agosto de 2026
 */

package com.example.MiPrimerServidor;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello(){
        return "hola desde mi servidor de aplicaciòn";
    }

    @GetMapping("/saludo")
    public String saludar(@RequestParam String nombre){
        return "Hola: "+nombre+" desde mi servidor de apps";
    }

    @PostMapping("/mensaje")
    public String recibirMensaje(@RequestBody String mensaje){
        return "recibi el mensaje "+mensaje;
    }
}
