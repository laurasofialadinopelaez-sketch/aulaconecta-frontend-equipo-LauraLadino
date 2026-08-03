¿Qué nodo nuevo apareció y dónde quedó apuntando la rama?
  Apareció un nuevo nodo (commit) conectado como hijo del commit anterior, y la rama activa se movió automáticamente hacia adelante para apuntar a este nuevo nodo.
    
¿Qué se creó y sobre qué commit quedó ubicado?
  Se creó un nuevo puntero o rama independiente, el cual quedó ubicado exactamente sobre el mismo commit en el que nos encontrábamos en ese momento.
  
¿Qué cambió al moverse a otra rama?
  Cambió la rama activa (el indicador `HEAD` se desplazó a la nueva rama), por lo que los nuevos commits que se realicen solo afectarán a esta rama y no a la anterior.
  
¿Qué historias de trabajo quedaron integradas?
  Quedaron unificadas las historias de la rama actual y de la rama especificada, generando un nuevo commit de fusión (*merge commit*) que combina ambos historiales.
