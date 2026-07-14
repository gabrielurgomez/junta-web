# Regla de Componentes UI

Esta regla aplica siempre que se cree, modifique, revise o refactorice un componente visual del proyecto.

Un componente UI debe construirse como una pieza modular, reutilizable, accesible y alineada con el sistema visual del sitio. No debe resolverse como markup aislado dentro de una página cuando representa una unidad visual o interactiva con identidad propia.

## Modularizacion obligatoria

- Todo bloque visual con responsabilidad propia debe vivir en un archivo dedicado dentro de `src/app/components/` o, si es un primitivo reutilizable de interfaz, dentro de `src/app/components/ui/`.
- Las paginas no deben contener el markup completo de secciones complejas como heroes, cards, navbars, banners, modales, listados visuales o bloques institucionales reutilizables.
- Una pagina debe orquestar componentes; el componente debe encapsular su estructura visual, sus estilos y la interaccion que le corresponda.
- Antes de crear un componente nuevo, se debe revisar si ya existe un componente equivalente o un patron cercano en `src/app/components/`.
- Los iconos SVG reutilizables deben vivir en `src/app/components/iconos/` y los componentes consumidores deben importarlos desde alli; no se deben declarar SVG hardcodeados directamente en el componente que los usa.

## Reutilizacion y props

- Los componentes deben recibir por props los textos, datos, estados, callbacks, clases opcionales y variantes que necesiten para funcionar en distintos contextos.
- No se debe endurecer contenido, estados o reglas de negocio dentro de un componente si eso limita su reutilizacion sin una razon explicita del dominio.
- Las props deben tiparse con TypeScript y tener nombres claros en espanol cuando el resto del proyecto siga esa convencion.
- Las props opcionales deben tener valores por defecto razonables cuando eso reduzca duplicacion en los consumidores.
- Un componente compartido no debe conocer rutas, datos o decisiones de una pagina especifica salvo que su responsabilidad sea precisamente representar ese caso del dominio.

## Accesibilidad obligatoria

- Todo componente UI debe cumplir las reglas de accesibilidad del proyecto y las pautas WCAG aplicables.
- Los componentes deben usar HTML semantico antes de recurrir a `role` o atributos ARIA.
- Los elementos interactivos deben poder usarse con teclado, mostrar foco visible y conservar un orden de navegacion coherente.
- Las imagenes deben recibir `alt` adecuado desde el contexto que conoce el significado de la imagen.
- Los componentes deben exponer props para los atributos de accesibilidad necesarios, como `aria-label`, `aria-describedby`, `id`, `aria-controls`, `aria-expanded` o textos alternativos.
- No se deben usar atributos ARIA para ocultar problemas de estructura semantica; primero se corrige el HTML.

## Diseno y consistencia visual

- Cualquier componente UI debe respetar `DESIGN.md`, `AGENTS.md` y las reglas de accesibilidad vigentes del proyecto.
- Los estilos deben seguir el sistema existente de Tailwind CSS y los patrones ya usados en componentes cercanos.
- No se deben introducir paletas, radios, sombras, espaciados o patrones visuales nuevos sin validar que encajan con el sistema visual del sitio.
- Los componentes deben conservar una jerarquia tipografica clara, contraste suficiente y estados visibles para hover, focus, active, disabled y loading cuando apliquen.

## Separacion de responsabilidades

- La logica de presentacion pertenece al componente; la obtencion de datos y acciones de servidor deben permanecer en la pagina, action o utilidad correspondiente.
- Si un componente necesita estado de cliente o manejadores interactivos, debe declararse como componente cliente solo cuando sea necesario.
- No se debe convertir una pagina o componente a cliente por conveniencia si la interactividad puede aislarse en un componente mas pequeno.
- Las utilidades compartidas deben vivir fuera del componente cuando se reutilicen o cuando hagan mas legible la responsabilidad visual.

## Verificacion minima

- Antes de dar por terminado un cambio de componente, se debe revisar que los imports sean correctos, que las props requeridas esten cubiertas y que no existan estados visuales rotos.
- Si el cambio afecta UI visible, se debe verificar mentalmente o con ejecucion local que el componente se renderiza de forma coherente en mobile y desktop.
- Si el componente es interactivo, se debe verificar teclado, foco visible y estados de accesibilidad relevantes.
