package com.example.PokemonAPI.Service;

import com.example.PokemonAPI.Model.Pokemon;
import com.example.PokemonAPI.Repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PokemonService {
    @Autowired
    private PokemonRepository pokemonRepository;

    public List<Pokemon> listarTodos(){
        return pokemonRepository.findAll();
    }

    public Optional<Pokemon> listarPorId(Long id){
        return pokemonRepository.findById(id);
    }

    public Pokemon guardar(Pokemon pokemon){
        return pokemonRepository.save(pokemon);
    }


}
