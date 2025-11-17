interface EnrollmentFormSectionProps {
  children: React.ReactNode
};

function EnrollmentFormSection({
  children,
}: EnrollmentFormSectionProps) {
  return (
    <section className='flex flex-col gap-4'>
      {children}
    </section>
  )
}

export { EnrollmentFormSection };