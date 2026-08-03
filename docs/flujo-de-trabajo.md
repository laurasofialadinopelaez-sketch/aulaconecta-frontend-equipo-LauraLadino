# Flujo de Trabajo y Registro de Comandos

En este documento se detalla la secuencia lógica de trabajo en Git y GitHub, los riesgos que se evitan en cada etapa y la observación del comportamiento de los comandos principales en el simulador.

---

## 1. Secuencia de Trabajo y Riesgos Evitados

1. **Crear repositorio**
   * **Propósito:** Definir el espacio centralizado en la nube para alojar el proyecto.
   * **Riesgo que evita:** Previene el trabajo desordenado y disperso entre carpetas locales sin un punto de origen común.

2. **Crear rama (`branch`)**
   * **Propósito:** Generar una línea paralela de trabajo para desarrollar nuevas funcionalidades o corregir errores.
   * **Riesgo que evita:** Evita modificar directamente la versión estable (`main`) y previene romper el código funcional por cambios incompletos.

3. **Hacer commits**
   * **Propósito:** Registrar snapshots o fotos del progreso con mensajes descriptivos.
   * **Riesgo que evita:** Evita la pérdida de cambios históricos y permite regresar a versiones anteriores si algo falla.

4. **Abrir Pull Request (PR)**
   * **Propósito:** Proponer formalmente la integración de los cambios de una rama hacia la rama principal.
   * **Riesgo que evita:** Evita fusionar código a ciegas sin antes comparar las diferencias (`diff`) y dar visibilidad al equipo.

5. **Revisar (Review)**
   * **Propósito:** Inspeccionar el código por parte de otro integrante del equipo antes de aceptarlo.
   * **Riesgo que evita:** Previene subir errores sintácticos, faltas de ortografía, código incompleto o fugas de información sensible (tokens, contraseñas).

6. **Corregir observaciones**
   * **Propósito:** Atender los comentarios y mejoras solicitadas por el revisor en la misma rama.
   * **Riesgo que evita:** Evita que se queden fallas detectadas sin resolver antes del despliegue o entrega final.

7. **Fusionar (`merge`)**
   * **Propósito:** Unir la historia de trabajo aprobada con la rama `main` y eliminar la rama secundaria.
   * **Riesgo que evita:** Previene la acumulación de ramas obsoletas y asegura que `main` mantenga solo código probado y verificado.

---

## 2. Registro de Comandos y Observaciones (Learn Git Branching)

### 1. `git commit`
* **¿Qué nodo nuevo apareció y dónde quedó apuntando la rama?**
  Apareció un nuevo nodo (commit) conectado como hijo del commit anterior, y la rama activa se movió automáticamente hacia adelante para apuntar a este nuevo nodo.

---

### 2. `git branch <nombre>`
* **¿Qué se creó y sobre qué commit quedó ubicado?**
  Se creó un nuevo puntero o rama independiente, el cual quedó ubicado exactamente sobre el mismo commit en el que nos encontrábamos en ese momento.

---

### 3. `git checkout <rama>`
* **¿Qué cambió al moverse a otra rama?**
  Cambió la rama activa (el indicador `HEAD` se desplazó a la nueva rama), por lo que los nuevos commits que se realicen solo afectarán a esta rama y no a la anterior.

---

### 4. `git merge <rama>`
* **¿Qué historias de trabajo quedaron integradas?**
  Quedaron unificadas las historias de la rama actual y de la rama especificada, generando un nuevo commit de fusión (*merge commit*) que combina ambos historiales.
