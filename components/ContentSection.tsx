
interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export function ContentSection({ children, className, ...props }: ContentSectionProps) {
    return (
        <section 
            className={`w-full min-h-[calc(100vh)] py-20 max-w-7xl mx-auto ${className ?? ''}`}
            {...props}
        >
            {children}
        </section>
    )
}