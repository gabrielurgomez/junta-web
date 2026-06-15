import { Hero2 } from "@/app/components/Hero2";
import { Card } from "@/app/components/Card";
import { Equipo } from "@/app/components/Equipo";

export default function EntidadPage() {
  return (
    <>
      <Hero2
        title="Conoce la entidad"
        subtitle="Junta Regional de Calificación de Invalidez de Santander. Somos un organismo del Sistema de Seguridad Social Integral."
        imageSrc="/imagenes/docsergio_medicos_psicologa.webp"
        imageAlt="Recepción de la Junta Regional de Calificación de Invalidez de Santander"
        badgeText="Sobre Nosotros"
        priority={true}
      />
      <div className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Card
            id="card-creacion-juntas"
            title="Creación de las Juntas"
            text="En los artículos 42 y 43 de la Ley 100 de 1993, se crean las Juntas Regionales y Nacional de Calificación de Invalidez. Su naturaleza y administración se consolida con la expedición del Decreto 1346 de 1994, que reglamentó su funcionamiento, norma modificada por el Decreto 2463 del 2001, el cual tuvo una vigencia de más de 12 años. Con la reforma al Sistema de Riesgos Laborales a través de la Ley 1562 del 2012, artículo 16, se modificó el artículo 42 de la Ley 100 y, posteriormente, se reglamentó con el Decreto 1352 del 2013, el cual es cobijado por el Decreto 1072 del 2015. El artículo 16 de la Ley 1562 contempla que las juntas son organismos del Sistema de Seguridad Social Integral de creación legal, de derecho privado, sin ánimo de lucro y adscritas al Ministerio de Trabajo."
          />
          <Card
            id="card-importancia"
            title="Importancia"
            text="La importancia de las Juntas Regionales y Nacional se reviste en el hecho de que si bien pertenecen al Sistema General de Seguridad Social Integral, sus integrantes y miembros actúan con independencia en los procedimientos adelantados, esto es, garantizar la imparcialidad de los interesados en el proceso de calificación para la definición de las controversias frente al origen de la enfermedad o accidentes, la pérdida de capacidad laboral, la fecha de estructuración y los peritazgos solicitados por la Rama Judicial, las aseguradoras, las entidades bancarias y el Ministerio de Trabajo."
          />
        </div>
      </div>
      <Equipo />
    </>
  );
}
