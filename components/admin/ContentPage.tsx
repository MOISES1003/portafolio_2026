
interface ContentPageProps {
    children: React.ReactNode;
}

export default function ContentPage({ children }: ContentPageProps) {
    return (
        <div className="flex flex-col min-h-screen items-start p-2 gap-5  bg-zinc-50 font-sans dark:bg-black">
            {children}
        </div>
    );
}