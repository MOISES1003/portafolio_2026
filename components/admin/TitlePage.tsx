interface ITitlePageProps {
    title: string;
}


export default function TitlePage({ title }: ITitlePageProps) {
    return (
        <div className="h-10 shadow-2xl w-full flex items-center justify-start border-b-2 border-white">
            <h1 className="text-gray-300">{title}</h1>
        </div>
    )
}