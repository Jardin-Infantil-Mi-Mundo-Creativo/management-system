interface EnrolledStudentDialogContentInfoDataItemProps {
  label: string;
  value: string;
}

function EnrolledStudentDialogContentInfoDataItem({
  label,
  value,
}: EnrolledStudentDialogContentInfoDataItemProps) {
  return (
    <p>
      <span className="font-bold">{label}:</span> {value}
    </p>
  );
}

export { EnrolledStudentDialogContentInfoDataItem };
