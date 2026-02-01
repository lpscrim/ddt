
export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="border w-vw">
            {children}
        </div>
    );
}