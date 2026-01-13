
export function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
        </div>
    );
}