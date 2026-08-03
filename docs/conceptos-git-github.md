COMPROBACIÓN CONCEPTUAL

¿Qué puede hacer Git aunque GitHub no exista?

	El Git de lo que se encarga es de mantener un control de las versiones y cambios de un proyecto, los cuales quedan guardados en un computador, funcionando de esta forma sin GitHub.

¿Por qué una rama reduce el riesgo de dañar main?
	
	Se reduce el riesgo ya que los cambios hechos no afectan directamente al main, ya que esta puede mantener los cambios sin que se modifique el main en caso de que algo no funcione.

¿Qué diferencia existe entre guardar un archivo y crear un commit?

	El commit es un registro donde se explican los cambios realizados, mientras que guardar es para la implementación/actualización de cambios en el proyecto.

¿Por qué un pull request no es lo mismo que un merge?

	Pull request es para que se evalúe y se hagan pruebas para reconocer si una rama puede ser incorporada al main, mientras que el merge es tras hacer la revisión de un rama para que esta finalmente sea incorporada en el main.

Una evalúa la rama, el otro la integra.

¿Qué evidencia permite saber quién cambió algo y por qué?

	El que permite saber quien hizo un cambio es el commit, el cual contiene la describe la acción, junto con el resultado, mientras que también esta contiene la información del usuario, el diff es la evidencia de cambios, marcados de color rojo o verde si algo a sido borrado o agregado.

RETO RÁPIDO DE SECUENCIAS
crear repositorio
	Evita que haya desorden del proyecto sin un historial, donde se pueden perder archivos o compartir versiones errores.

crear rama
	Evita que se dañe la versión que funciona de forma adecuada del proyecto mientras se prueba y hacen cambios.

hacer commits
	Evita la pérdida de avances, la falta de información sobre quien hizo cambios; además de no permitir volver a un punto anterior en caso de haber errores.

abrir pull request
	Evita que haya una integración de una versión al main sin pruebas, también para que el equipo esté enterado de las modificaciones propuestas.

revisar
	Evita que se pasen por alto errores de código, de ortografía o inconsistencias en el proyecto junto a fugas de información privada o sensible.

corregir observaciones.
	Evita que sea ignorada la retroalimentación e integrar cambios que sean deficientes o incompletos al proyecto final.

fusionar
	Evita que se acumulen muchas ramas que no funcionen o estén desactualizadas que generan conflictos difíciles de integración en un futuro.



flujo-de-trabajo.md