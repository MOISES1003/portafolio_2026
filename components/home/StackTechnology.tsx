"use client";

import { useQueryTechnology } from "@/features/technology/hooks";
import { ContentSection } from "../ContentSection";
import { TechBubbles } from "./TechBubbles";
import { HeaderSection } from "../HeaderSection";
import { ID_TECNOLOGY_NO_STACK } from "@/utils";
import { useEffect, useState } from "react";

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsLarge(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isLarge;
}

export function StackTechnology() {
  const { technologyData } = useQueryTechnology();
  const filteredTechs = technologyData.filter((t) => !ID_TECNOLOGY_NO_STACK.includes(t.id));

  const isLargeScreen = useIsLargeScreen();

  return (
    <ContentSection>
      <HeaderSection label="Stack de Tecnologías" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Solo se monta en pantallas grandes */}
        {isLargeScreen && <TechBubbles techs={filteredTechs} />}

        {/* Derecha — descripción */}
        <div className="flex flex-col gap-6 px-4 lg:px-8">
          <div className="flex gap-2 items-center opacity-75">
            <span className="w-12 h-[0.5px] border-[0.5px] border-primary block" />
            <p className="text-primary text-xl tracking-widest font-mono">
              Tecnologías que impulsan cada proyecto
            </p>
          </div>

          <p className="text-secondary font-body text-sm leading-relaxed">
            Cada tecnología en este stack fue elegida por su capacidad
            para resolver problemas reales. Desde interfaces reactivas
            hasta arquitecturas backend robustas, el objetivo siempre
            es el mismo: rendimiento, escalabilidad y mantenibilidad.
          </p>

          {/* Tags de tecnologías */}
          <div className="flex flex-wrap gap-2 mt-2">
            {filteredTechs.map((tech) => (
              <span
                key={tech.id}
                className="px-3 py-1 text-xs font-mono tracking-widest border border-primary/20 text-secondary hover:border-primary/60 hover:text-primary transition-all duration-300 cursor-default"
              >
                {tech.name.toUpperCase()}
              </span>
            ))}
          </div>

          <p className="text-secondary/60 font-mono text-xs tracking-widest mt-2">
            {filteredTechs.length}+ TECNOLOGÍAS EN STACK ACTIVO
          </p>
        </div>

      </div>
    </ContentSection>
  );
}