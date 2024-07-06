interface Props {
  title: string;
  children: React.ReactNode;
}

function FormSection({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="font-bold text-primary">{title}</h3>
      {children}
    </section>
  );
}

export default FormSection;
