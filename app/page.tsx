import { ContactMe, ProfileSection, ProyectosDestacadatos, StackTechnology } from "@/components";

export default function Home() {
  return (
    <div>
      <ProfileSection />
      <ProyectosDestacadatos />
      <StackTechnology/>
      <ContactMe/>
    </div>
  );
}
