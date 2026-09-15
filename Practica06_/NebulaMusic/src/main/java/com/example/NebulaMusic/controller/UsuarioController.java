package com.example.NebulaMusic.controller;


import com.example.NebulaMusic.model.Usuario;
import com.example.NebulaMusic.service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping({"index.html", "index"})
    public String index(){
        return "index";
    }
    @GetMapping({"/", "/iniciar-sesion", "/inciar-sesion.html"})
    public String login(){
        return "iniciar-sesion";
    }

    @GetMapping({"/registro", "/registro.html"})
    public String registro(){
        return "registro";
    }

    @GetMapping({"/error", "error.html"})
    public String error(){
        return "error";
    }

    @PostMapping("/crear-cuenta")
    public String crearCuenta(@ModelAttribute Usuario usuario) {
        if(usuarioService.existeCorreo(usuario.getCorreo())){
            return "redirect:/error";
        }
        usuarioService.registrar(usuario);
        return "redirect:/iniciar-sesion";
    }

    @PostMapping("/auntentication")
    public String autenticar(@RequestParam("correo") String correo, @RequestParam("contrasena") String contrasena) {

        if(usuarioService.autenticar(correo, contrasena)){
            return "redirect:/index";
        }
        return "redirect:/error";
    }

    @GetMapping("/cerrar-sesion")
    public String cerrarSesion(){
        return "redirect:/inciar-sesion?login";
    }
}
