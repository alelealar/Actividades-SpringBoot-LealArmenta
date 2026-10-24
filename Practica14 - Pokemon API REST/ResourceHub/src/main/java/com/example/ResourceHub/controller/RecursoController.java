package com.example.ResourceHub.controller;



import com.example.ResourceHub.model.Recurso;
import com.example.ResourceHub.service.RecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
//@RequestMapping("/api/videojuegos")
//@RequestMapping("/api/usuarios")
public class RecursoController {

    @Autowired
    private RecursoService recursoService;

    //YA NO DEVEOLVEMOS VISTAS, desvolvemos OBJETOS. Diferencia con thymeleaf
    @GetMapping
    public List<Recurso> listar(){
        return recursoService.obtenerTodos();
    }

    @PostMapping
    //lo mandamos en el body ya que si lo mandamos en el parametro, pueden ser muchos datos
    //norma que se mande albody si es post
    public Recurso crear(@RequestBody Recurso recurso){
        return recursoService.crearRecurso(recurso);
    }

    @PutMapping("/{id}")
    public Recurso actualizar(@PathVariable Long id, @RequestBody Recurso recurso){
        return recursoService.actualizar(id, recurso).orElse(null);
    }

    @PatchMapping("/{id}") //actualizacion parcial
    public Recurso actualizarParcial(@PathVariable Long id, @RequestBody Recurso recurso){
        return recursoService.actualizarParcial(id, recurso).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        recursoService.eliminarRecurso(id);
    }
}
