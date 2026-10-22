package com.example.PokemonAPI.Controller;

import com.example.PokemonAPI.Model.Pokemon;
import com.example.PokemonAPI.Service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pokemones")
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @GetMapping
    public List<Pokemon> listar(){
        return pokemonService.listarTodos();
    }

    @GetMapping("/{id}")
    public Pokemon listarPorId(@PathVariable Long id){
        return pokemonService.listarPorId(id).orElse(null);
    }

    @PostMapping
    public Pokemon crear(@RequestBody Pokemon pokemon){
        return pokemonService.guardar(pokemon);
    }
}
