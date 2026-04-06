interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export function ContentSection({ children, className, ...props }: ContentSectionProps) {
    return (
        <section 
            className={`w-full min-h-[calc(100vh-4rem)] py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 ${className ?? ''}`}
            {...props}
        >
            {children}
        </section>
    )
}