import { ContentSection, ExperienceSection } from "@/components";

export default function ExperiencePage() {


    return (
        <ContentSection>
            <div className="flex flex-col gap-4 items-center text-center">
                <h2 className="text-4xl font-headline text-textbase animate-fade-slide delay-200">
                    Mi recorrido profesional
                    <span className="block text-primary text-2xl font-light mt-2">
                        Aquí encontrarás los proyectos y roles que he desarrollado a lo largo de mi carrera
                    </span>
                </h2>

                <p className="text-secondary text-base max-w-2xl leading-relaxed animate-fade-slide delay-300">
                    Desde colaboraciones en empresas hasta proyectos independientes, cada experiencia
                    refleja mi pasión por el desarrollo de software y la creación de soluciones innovadoras.
                </p>
            </div>
            <ExperienceSection />
        </ContentSection>

    )
}