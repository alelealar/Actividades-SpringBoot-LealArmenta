package com.example.Nexus.controllers;

import com.example.Nexus.dto.PostRequest;
import com.example.Nexus.models.Post;
import com.example.Nexus.services.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ============================================================
 *  PostController — Controlador REST para posts
 * ============================================================
 *
 * Expone los endpoints HTTP para las operaciones sobre posts.
 * La ruta base de todos los endpoints es "/api/posts".
 *
 * @RestController → indica que esta clase es un controlador REST
 *                   (respuestas en JSON, no HTML).
 * @RequestMapping → define el prefijo de ruta para todos los métodos.
 *
 * Endpoints expuestos:
 *   POST  /api/posts       → crear un nuevo post
 *   GET   /api/posts       → obtener todos los posts
 *   GET   /api/posts/{id}  → obtener un post por ID
 */
@RestController
@RequestMapping("/api/posts")
public class PostController {

    /**
     * Inyección del servicio de posts.
     * El controlador delega toda la lógica al Service.
     */
    @Autowired
    private PostService postService;

    /**
     * Crea un nuevo post.
     *
     * Método HTTP: POST
     * URL:         /api/posts
     * Body JSON:
     * {
     *   "title":   "Mi post",
     *   "content": "Contenido del post",
     *   "userId":  1
     * }
     *
     * @Valid       → valida el DTO antes de ejecutar el método.
     *               Si hay errores de validación → 400 Bad Request.
     * @RequestBody → deserializa el JSON del body a PostRequest.
     *
     * @param request los datos del post a crear
     * @return 201 Created con el post creado en el body
     */
    @PostMapping
    public ResponseEntity<Post> createPost(@Valid @RequestBody PostRequest request) {
        Post post = postService.createPost(request);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    /**
     * Obtiene todos los posts, ordenados del más reciente al más antiguo.
     *
     * Método HTTP: GET
     * URL:         /api/posts
     *
     * @GetMapping (sin ruta adicional) → responde a GET /api/posts.
     * ResponseEntity.ok(...) → respuesta 200 OK con la lista en JSON.
     *
     * @return 200 OK con la lista de todos los posts
     */
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    /**
     * Obtiene un post específico por su ID.
     *
     * Método HTTP: GET
     * URL:         /api/posts/{id}
     * Ejemplo:     GET /api/posts/3
     *
     * @PathVariable → extrae el {id} de la URL como Long.
     *
     * Si el post no existe, el servicio lanza ResourceNotFoundException
     * que se convierte automáticamente en 404 Not Found.
     *
     * @param id el ID del post a buscar
     * @return 200 OK con el post, o 404 Not Found si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }
}
