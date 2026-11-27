export default function Button(props: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  size: "xs" | "sm" | "md" | "lg";
}>) {
  const { children, onClick, size } = props;
  return (
    <button className={`cursor-crosshair text-muted-foreground hover:text-foreground text-${size} py-1 px-2 rounded-xs transition-all duration-250 group`} onClick={onClick}>
      <span className="group-hover:px-0.5 transition-all duration-250">[</span>{" "}
      {children}{" "}
      <span className="group-hover:px-0.5 transition-all duration-250">]</span>
    </button>
  );
}
