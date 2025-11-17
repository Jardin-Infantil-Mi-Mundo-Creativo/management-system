interface EnrollmentFormSectionHeaderProps {
  children: React.ReactNode;
}

function EnrollmentFormSectionHeader({
  children,
}: EnrollmentFormSectionHeaderProps) {
  return <h3 className="text-lg font-bold text-primary">{children}</h3>;
}

export { EnrollmentFormSectionHeader };
