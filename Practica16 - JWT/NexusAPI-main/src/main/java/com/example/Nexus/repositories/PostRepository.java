package com.example.Nexus.repositories;

import com.example.Nexus.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * ============================================================
 *  PostRepository — Repositorio de acceso a datos de Post
 * ============================================================
 *
 * Extiende JpaRepository<Post, Long> para heredar automáticamente
 * los métodos CRUD básicos (save, findById, findAll, delete, etc.).
 *
 * Spring Data JPA analiza el nombre de los métodos definidos aquí
 * y genera las consultas SQL correspondientes sin que tengamos
 * que escribirlas nosotros.
 */
public interface PostRepository extends JpaRepository<Post, Long> {

    /**
     * Devuelve todos los posts ordenados por fecha de creación
     * de más reciente a más antiguo (orden descendente).
     *
     * Spring JPA interpreta el nombre del método así:
     *   findAll           → SELECT * FROM posts
     *   By                → (sin filtro WHERE)
     *   OrderBy           → ORDER BY
     *   CreatedAt         → columna created_at
     *   Desc              → DESC
     *
     * Query generada automáticamente:
     *   SELECT * FROM posts ORDER BY created_at DESC;
     *
     * @return lista de posts ordenados del más nuevo al más viejo
     */
    List<Post> findAllByOrderByCreatedAtDesc();
}
