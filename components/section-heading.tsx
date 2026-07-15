type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  descriptionColor?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", descriptionColor }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-theme sm:text-4xl">{title}</h2>
      <p className="section-heading-description mt-4 text-lg leading-8 text-muted" data-why-description="true" style={descriptionColor ? { color: descriptionColor } : undefined}>{description}</p>
    </div>
  );
}
