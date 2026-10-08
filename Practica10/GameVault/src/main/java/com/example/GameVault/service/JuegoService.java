package com.example.GameVault.service;

import com.example.GameVault.model.Juego;
import com.example.GameVault.repository.JuegoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class JuegoService {
    //servicio s = new servicio();
    //servicio s2 = new servicio2();
    private static final String UPLOAD_DIR="src/main/resources/static/uploads/";
    @Autowired
    private JuegoDAO juegoDAO;

    public List<Juego> listarTodos() {
        return juegoDAO.findAll();
    }

    public void guardarJuegos(Juego juego, MultipartFile portada){
        String nombreArchivo = "default.png"; // Imagen por defecto si no suben nada

        // Verificamos si el archivo no está vacío
        if (!portada.isEmpty()) {
            nombreArchivo = guardarImagenEnProyecto(portada);
        }

        juego.setPortadaUrl(nombreArchivo);
        juegoDAO.save(juego);
    }

    public String guardarImagenEnProyecto(MultipartFile portada){
        try {
            // Crear la carpeta si no existe
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generamos un nombre único para evitar sobrescribir archivos con el mismo nombre
            String nombreArchivo = UUID.randomUUID().toString() + "_" + portada.getOriginalFilename();
            Path filePath = uploadPath.resolve(nombreArchivo);

            // Guardamos el archivo físicamente en disco
            Files.copy(portada.getInputStream(), filePath);

            System.out.println("Archivo guardado en: " + filePath.toAbsolutePath());

            return nombreArchivo;

        } catch (IOException e) {
            e.printStackTrace();
            return "default.png";
        }
    }
}
