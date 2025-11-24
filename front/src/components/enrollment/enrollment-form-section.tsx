interface EnrollmentFormSectionProps {
  children: React.ReactNode;
  dataTestId?: string;
}

function EnrollmentFormSection({
  children,
  dataTestId,
}: EnrollmentFormSectionProps) {
  return (
    <section className="flex flex-col gap-4" data-testid={dataTestId}>
      {children}
    </section>
  );
}

export { EnrollmentFormSection };
