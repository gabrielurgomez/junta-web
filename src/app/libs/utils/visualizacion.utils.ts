/*
  Preferencias de visualización (tamaño de texto, tema de contraste y espaciado).

  El estado vive en tres atributos `data-*` del elemento <html>, no en React: es
  el CSS quien los consume, y así el ajuste se aplica antes del primer pintado.
  React solo mantiene un reflejo para dibujar los radios del panel.

  El servidor NUNCA emite estos atributos. Los escribe únicamente el script en
  línea del layout, de modo que el HTML por defecto sea el tema claro y el
  selector `html:not([data-tema])` pueda seguir la preferencia del sistema.
*/

export const CLAVE_VISUALIZACION = "jrci:visualizacion-v1";

export const TAMANOS = ["normal", "grande", "mayor"] as const;
export const TEMAS = ["sistema", "claro", "alto-contraste"] as const;
export const ESPACIADOS = ["normal", "amplio"] as const;

export type Tamano = (typeof TAMANOS)[number];
export type Tema = (typeof TEMAS)[number];
export type Espaciado = (typeof ESPACIADOS)[number];

export interface PreferenciasVisualizacion {
  tamano: Tamano;
  tema: Tema;
  espaciado: Espaciado;
}

export const PREFERENCIAS_POR_DEFECTO: PreferenciasVisualizacion = {
  tamano: "normal",
  tema: "sistema",
  espaciado: "normal",
};

/*
  Valores que SÍ se escriben como atributo. Los neutros ("normal", "sistema")
  se representan con la ausencia del atributo, que es lo que permite a
  `html:not([data-tema])` reaccionar a `prefers-contrast`.
*/
const ATRIBUTOS = [
  { atributo: "data-tamano", clave: "tamano", visibles: ["grande", "mayor"] },
  {
    atributo: "data-tema",
    clave: "tema",
    visibles: ["claro", "alto-contraste"],
  },
  { atributo: "data-espaciado", clave: "espaciado", visibles: ["amplio"] },
] as const;

/*
  Script que se inyecta en el <head> y corre de forma síncrona durante el
  parseo del HTML, antes del primer pintado. Se escribe a mano en ES5 y sin
  dependencias porque no pasa por el compilador.

  Formato de almacenamiento: string plano "tamano|tema|espaciado". Se prefiere
  a JSON porque este script bloquea el parseo: es más corto y no puede lanzar
  por un valor corrupto. Cada posición se valida contra su lista blanca.

  El atributo `data-js` marca que hay JavaScript disponible; el CSS lo usa para
  revelar el disparador del panel, que sin JS sería un control inerte.

  Patrón oficial de Next.js:
  node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
*/
export const SCRIPT_VISUALIZACION = `(function(){try{var d=document.documentElement;d.setAttribute("data-js","1");var v=(localStorage.getItem("${CLAVE_VISUALIZACION}")||"").split("|");var m=[["data-tamano",["grande","mayor"]],["data-tema",["claro","alto-contraste"]],["data-espaciado",["amplio"]]];for(var i=0;i<3;i++){if(m[i][1].indexOf(v[i])>-1){d.setAttribute(m[i][0],v[i]);}}}catch(e){}})()`;

const esValido = <T extends string>(
  valores: readonly T[],
  valor: string | undefined,
): valor is T => valores.includes((valor ?? "") as T);

/* Lee el estado desde el DOM, que es la fuente de verdad. En el servidor
   devuelve los valores por defecto. */
export function leerPreferencias(): PreferenciasVisualizacion {
  if (typeof document === "undefined") return PREFERENCIAS_POR_DEFECTO;
  const datos = document.documentElement.dataset;
  return {
    tamano: esValido(TAMANOS, datos.tamano) ? datos.tamano : "normal",
    tema: esValido(TEMAS, datos.tema) ? datos.tema : "sistema",
    espaciado: esValido(ESPACIADOS, datos.espaciado)
      ? datos.espaciado
      : "normal",
  };
}

/* Lee desde localStorage. Se usa al reaccionar al evento `storage`, donde el
   DOM de esta pestaña todavía tiene el valor antiguo. */
export function leerPreferenciasAlmacenadas(): PreferenciasVisualizacion {
  try {
    const partes = (
      window.localStorage.getItem(CLAVE_VISUALIZACION) ?? ""
    ).split("|");
    return {
      tamano: esValido(TAMANOS, partes[0]) ? partes[0] : "normal",
      tema: esValido(TEMAS, partes[1]) ? partes[1] : "sistema",
      espaciado: esValido(ESPACIADOS, partes[2]) ? partes[2] : "normal",
    };
  } catch {
    return PREFERENCIAS_POR_DEFECTO;
  }
}

export function aplicarPreferencias(
  preferencias: PreferenciasVisualizacion,
): void {
  const elemento = document.documentElement;
  for (const { atributo, clave, visibles } of ATRIBUTOS) {
    const valor = preferencias[clave];
    if ((visibles as readonly string[]).includes(valor)) {
      elemento.setAttribute(atributo, valor);
    } else {
      elemento.removeAttribute(atributo);
    }
  }
}

export function guardarPreferencias(
  preferencias: PreferenciasVisualizacion,
): void {
  try {
    window.localStorage.setItem(
      CLAVE_VISUALIZACION,
      `${preferencias.tamano}|${preferencias.tema}|${preferencias.espaciado}`,
    );
  } catch {
    // Almacenamiento bloqueado (modo privado): el ajuste vale para esta página.
  }
}

/* Restablecer borra la clave en vez de escribir "claro": conservar el valor
   neutro es lo que devuelve el seguimiento de la preferencia del sistema. */
export function olvidarPreferencias(): void {
  try {
    window.localStorage.removeItem(CLAVE_VISUALIZACION);
  } catch {
    // Sin almacenamiento no hay nada que borrar.
  }
}
