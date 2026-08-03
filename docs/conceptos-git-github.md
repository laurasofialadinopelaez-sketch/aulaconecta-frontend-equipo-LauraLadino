# Comprobación Conceptual y Reto Rápido de Secuencia

## Comprobación Conceptual

### ¿Qué puede hacer Git aunque GitHub no exista?
Git se encarga de mantener un control de las versiones y cambios de un proyecto localmente, los cuales quedan guardados en el computador, funcionando perfectamente de esta forma sin necesidad de GitHub.

---

### ¿Por qué una rama reduce el riesgo de dañar `main`?
Se reduce el riesgo ya que los cambios realizados no afectan directamente a la rama `main`. Permite trabajar y mantener las modificaciones en una línea paralela sin alterar la versión estable en caso de que algo no funcione.

---

### ¿Qué diferencia existe entre guardar un archivo y crear un commit?
El **commit** es un registro histórico identificable donde se explican y confirman los cambios realizados, mientras que **guardar** un archivo solo actualiza el estado de los cambios en el disco local sin crear una foto en el historial de versiones.

---

### ¿Por qué un Pull Request no es lo mismo que un Merge?
Un **Pull Request** es una solicitud para que se evalúen, comenten y prueben las propuestas de una rama antes de ser incorporadas a `main`. El **Merge**, en cambio, es la acción formal de integrar esos cambios aceptados a la rama principal. *(Uno evalúa la rama, el otro la integra).*

---

### ¿Qué evidencia permite saber quién cambió algo y por qué?
El **commit** permite saber quién hizo un cambio, ya que contiene la información del usuario (autor) y el mensaje que describe el propósito de la acción. Adicionalmente, el **`diff`** sirve como evidencia visual de los cambios, marcando en rojo o verde lo que ha sido borrado o agregado.

---

## Reto Rápido de Secuencia

1. **Crear repositorio**
   * **Riesgo que evita:** Evita el desorden en el proyecto y trabajar sin un historial centralizado, previniendo la pérdida de archivos o el compartir versiones erróneas.

2. **Crear rama**
   * **Riesgo que evita:** Evita que se dañe o rompa la versión funcional del proyecto (`main`) mientras se prueban e implementan nuevos cambios.

3. **Hacer commits**
   * **Riesgo que evita:** Evita la pérdida de avances y la falta de información sobre quién hizo cambios, permitiendo volver a puntos anteriores en el historial en caso de errores.

4. **Abrir Pull Request**
   * **Riesgo que evita:** Evita la integración directa de cambios a `main` sin antes realizar pruebas y dar visibilidad al equipo sobre las modificaciones propuestas.

5. **Revisar**
   * **Riesgo que evita:** Evita que se pasen por alto errores de código, ortografía o inconsistencias en el proyecto, así como la fuga de información privada o sensible.

6. **Corregir observaciones**
   * **Riesgo que evita:** Evita que se ignore la retroalimentación entregada por el equipo e integrar cambios deficientes o incompletos al proyecto final.

7. **Fusionar (`merge`)**
   * **Riesgo que evita:** Evita que se acumulen ramas desactualizadas o en desuso, reduciendo el riesgo de generar conflictos de integración difíciles de resolver en el futuro.
