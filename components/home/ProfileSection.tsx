import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { ContentSection } from "../ContentSection";
import { SocialLinks } from "./SocialLinks";

export function ProfileSection() {
    return (

        <ContentSection className="flex">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
                {/* Columna izquierda */}
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center opacity-75 animate-fade-slide delay-100">
                        <span className="w-16 h-[0.5px] border-[0.5px] border-primary block" />
                        <p className="text-primary text-sm tracking-widest">Portafolio v2.0.0</p>
                    </div>
                    <h1 className="text-5xl font-headline leading-tight text-textbase animate-fade-slide delay-200">
                        Moises Saucedo Ambicho{" "}
                        <span className="block">
                            <span className="text-primary text-4xl cursor-blink">
                                Tec. Ingeniero de Software
                            </span>
                        </span>
                    </h1>
                    <div>
                        <SocialLinks
                            items={[
                                {
                                    icon: <FaGithub />,
                                    href: "https://github.com/MOISES1003",
                                    label: "GitHub",
                                },
                                {
                                    icon: <FaLinkedin />,
                                    href: "https://www.linkedin.com/in/moises-saucedo-ambicho-813316174",
                                    label: "LinkedIn",
                                },
                                {
                                    icon: <FaGlobe />,
                                    href: "https://msa-cod117.vercel.app/",
                                    label: "Portfolio",
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="flex flex-col gap-6 text-secondary font-body">
                    <p className="text-base leading-relaxed animate-fade-slide delay-300">
                        Soy un apasionado desarrollador de software con experiencia en la creación
                        de aplicaciones web y desktop. Me especializo en tecnologías como React,
                        Node.js, .Net Core y Laravel, y siempre estoy buscando aprender nuevas herramientas
                        y técnicas para mejorar mis habilidades.
                    </p>
                    <p className="text-base leading-relaxed animate-fade-slide delay-400">
                        Mi objetivo es crear soluciones innovadoras que resuelvan problemas reales
                        y brinden una excelente experiencia de usuario.
                    </p>
                </div>
            </div>

        </ContentSection>
    )
}