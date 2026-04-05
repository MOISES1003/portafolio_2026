interface HeaderProps {
    label: string;
}

export function HeaderSection({ label }: HeaderProps) {
    return (
        <div className="w-full flex items-center justify-start">
            <h2 className="text-3xl tracking-widest">
                {label}
            </h2>
        </div>

    )
}