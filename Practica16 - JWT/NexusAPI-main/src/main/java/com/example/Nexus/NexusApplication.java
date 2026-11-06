package com.example.Nexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ============================================================
 * NexusApplication — Punto de entrada de la aplicación
 * ============================================================
 *
 * Esta es la clase principal de la API REST construida con
 * Spring Boot. Aquí es donde arranca todo el servidor.
 *
 * @SpringBootApplication es una anotación "todo en uno" que combina:
 * - @Configuration       → marca esta clase como fuente de beans de Spring
 * - @EnableAutoConfiguration → activa la configuración automática de Spring Boot
 * - @ComponentScan       → escanea el paquete actual y sub-paquetes buscando
 *                            componentes (@Service, @Repository, @Controller, etc.)
 *
 * Cuando se ejecuta main(), Spring Boot levanta un servidor Tomcat
 * embebido (por defecto en el puerto 8080) y deja la API lista
 * para recibir peticiones HTTP.
 */
@SpringBootApplication
public class NexusApplication {

	/**
	 * Método principal de Java. Es el primer código que se ejecuta.
	 * SpringApplication.run(...) inicializa el contexto de Spring,
	 * configura la base de datos y levanta el servidor web.
	 *
	 * @param args argumentos de línea de comandos (no se usan en este proyecto)
	 */
	public static void main(String[] args) {
		SpringApplication.run(NexusApplication.class, args);
	}

}