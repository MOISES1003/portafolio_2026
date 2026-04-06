"use client";

import { FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import { ContentSection } from "@/components";

export default function ContactSection() {
    const [selectedForm, setSelectedForm] = useState<"whatsapp" | "email">("whatsapp");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");

    const defaultMessage = `Hola Moises, me interesa tus servicios de desarrollo. ¿Podemos hablar?`;

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // WhatsApp
    const handleWhatsApp = () => {
        const text = encodeURIComponent(
            message.trim() ? `${name ? `De: ${name}\n` : ""}${message}` : defaultMessage
        );
        window.open(`https://wa.me/51982432575?text=${text}`, "_blank");
    };

    // Email
    const handleEmail = async () => {
        if (!email.trim()) {
            setEmailError("El correo es obligatorio");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Formato de correo inválido");
            return;
        }

        setEmailError(""); // todo ok
        const msg = message.trim() || defaultMessage;
        const payload = {
            from_name: name || "Anónimo",
            from_email: email,
            message: msg,
        };

        console.log("Enviar a backend:", payload);
        alert("¡Correo enviado! (simulación)");
    };

    // Cambiar formulario y limpiar inputs
    const selectForm = (form: "whatsapp" | "email") => {
        setSelectedForm(form);
        setName("");
        setEmail("");
        setMessage("");
        setEmailError("");
    };

    return (
        <ContentSection className="flex flex-col gap-12">
            <div className="flex flex-col gap-2 animate-fade-slide">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-wide">
                    Hablemos de tu proyecto
                </h2>
                <p className="text-secondary/80 text-sm sm:text-base font-mono">
                    Selecciona el método de contacto y envíame tu mensaje. Estoy listo para ayudarte.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* Columna izquierda: Formulario dinámico */}
                <div className="flex flex-col gap-6 lg:gap-8">
                    {selectedForm === "whatsapp" && (
                        <div className="space-y-4 animate-fade-slide">
                            <input
                                type="text"
                                placeholder="Tu nombre (opcional)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 border border-primary/20 bg-white/5 rounded-xl placeholder:text-secondary/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm"
                            />
                            <textarea
                                rows={5}
                                placeholder="Tu mensaje (opcional)"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-4 border border-primary/20 bg-white/5 rounded-xl placeholder:text-secondary/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm resize-none"
                            />
                            <button
                                onClick={handleWhatsApp}
                                className="group flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300 font-mono tracking-widest text-sm justify-center"
                            >
                                <FaWhatsapp className="text-white group-hover:scale-110 transition-transform" />
                                Enviar a WhatsApp
                            </button>
                        </div>
                    )}

                    {selectedForm === "email" && (
                        <div className="space-y-4 animate-fade-slide">
                            <input
                                type="email"
                                placeholder="Tu email (obligatorio)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full p-4 border rounded-xl placeholder:text-secondary/60 focus:ring-2 focus:ring-primary transition-all duration-300 shadow-sm ${emailError
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-primary/20 focus:border-primary focus:ring-primary"
                                    }`}
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm mt-1">{emailError}</p>
                            )}
                            <textarea
                                rows={5}
                                placeholder="Tu mensaje"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-4 border border-primary/20 bg-white/5 rounded-xl placeholder:text-secondary/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm resize-none"
                            />
                            <button
                                onClick={handleEmail}
                                className="group flex items-center gap-3 px-6 py-4 bg-blue-500 text-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300 font-mono tracking-widest text-sm justify-center"
                            >
                                <FaPaperPlane className="text-white group-hover:scale-110 transition-transform" />
                                Enviar por Email
                            </button>
                        </div>
                    )}
                </div>

                {/* Columna derecha: Selección de Formulario */}
                <div className="flex flex-col gap-6 animate-fade-slide">
                    <p className="text-lg sm:text-xl font-semibold">
                        Conectemos y llevemos tu proyecto al siguiente nivel
                    </p>
                    <p>Selecciona el método de contacto:</p>

                    <div className="space-y-4 pt-4">
                        {/* WhatsApp (activo) */}
                        <div
                            onClick={() => selectForm("whatsapp")}
                            className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-opacity duration-300 ${selectedForm === "whatsapp"
                                ? "border-green-500 opacity-100"
                                : "border-primary/20 opacity-50 hover:opacity-80"
                                }`}
                        >
                            <FaWhatsapp className="text-2xl text-green-500 mt-0.5" />
                            <div>
                                <h3 className="text-textbase font-mono tracking-widest mb-1">WhatsApp</h3>
                                <p>Respuesta inmediata. Solo ingresa tu nombre y mensaje.</p>
                            </div>
                        </div>

                        {/* Email (en desarrollo) */}
                        <div
                            className="flex items-start gap-3 p-4 border rounded-xl opacity-50 cursor-not-allowed relative"
                        >
                            <FaPaperPlane className="text-2xl text-blue-500 mt-0.5" />
                            <div>
                                <h3 className="text-textbase font-mono tracking-widest mb-1 flex items-center gap-2">
                                    Email
                                    <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-mono">
                                        En desarrollo
                                    </span>
                                </h3>
                                <p>No disponible por ahora. Próximamente podrás enviarme un correo.</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-primary/80 font-mono text-xs tracking-widest mt-4">
                        Disponible 24/7 para proyectos interesantes 💬
                    </p>
                </div>
            </div>
        </ContentSection>
    );
}