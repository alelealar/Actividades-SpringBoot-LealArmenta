package com.example.Nexus.services;

import com.example.Nexus.dto.PostRequest;
import com.example.Nexus.models.Post;
import com.example.Nexus.models.User;
import com.example.Nexus.repositories.PostRepository;
import com.example.Nexus.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ============================================================
 *  PostService — Lógica de negocio para la entidad Post
 * ============================================================
 *
 * Esta capa contiene las operaciones sobre posts:
 *   - Crear un post asociado a un usuario.
 *   - Obtener todos los posts ordenados por fecha.
 *   - Obtener un post específico por su ID.
 *
 * Nótese que PostService inyecta UserService, lo que demuestra
 * cómo los servicios pueden colaborar entre sí.
 *
 * @Service → Spring registra esta clase como bean de servicio.
 */
@Service
public class PostService {

    /**
     * Repositorio para acceder a la tabla "posts" en la BD.
     * Spring lo inyecta automáticamente.
     */
    @Autowired
    private PostRepository postRepository;

    /**
     * Inyectamos UserService (no UserRepository directamente).
     * Esto sigue el principio de no saltarse capas: si necesitamos
     * un usuario, usamos el servicio ya existente que ya tiene su
     * lógica de búsqueda y manejo de errores.
     */
    @Autowired
    private UserService userService;

    /**
     * Crea y guarda un nuevo post en la base de datos.
     *
     * Pasos:
     * 1. Busca al usuario por ID (lanza excepción si no existe).
     * 2. Construye el objeto Post con los datos del request.
     * 3. Asocia el usuario al post.
     * 4. Guarda el post en la BD.
     *
     * La fecha de creación (createdAt) se asigna automáticamente
     * por el @PrePersist de la entidad Post, no se necesita asignarla aquí.
     *
     * @param request DTO con title, content y userId
     * @return el Post guardado con su ID y createdAt asignados
     */
    public Post createPost(PostRequest request) {
        // Primero verificamos que el usuario existe (lanza 404 si no)
        User user = userService.getUserById(request.getUserId());

        // Construimos el objeto Post y lo configuramos
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setUser(user); // Asociamos la relación ManyToOne

        // Guardamos en la BD; JPA ejecuta INSERT INTO posts (...)
        return postRepository.save(post);
    }

    /**
     * Obtiene todos los posts existentes, ordenados del más reciente
     * al más antiguo.
     *
     * Usa el método personalizado del repositorio que genera:
     *   SELECT * FROM posts ORDER BY created_at DESC;
     *
     * @return lista de todos los posts en orden descendente de fecha
     */
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * Busca un post específico por su ID.
     *
     * Si no existe, lanza ResourceNotFoundException que será
     * capturada por el GlobalExceptionHandler y convertida
     * en una respuesta HTTP 404 con mensaje de error.
     *
     * @param id el ID del post a buscar
     * @return el Post encontrado
     * @throws ResourceNotFoundException si no existe el post
     */
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post no encontrado con ID: " + id));
    }
}
