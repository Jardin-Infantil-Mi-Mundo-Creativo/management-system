interface EnrolledStudentDialogContentInfoConditionalListProps {
  items: Array<{ displayItem: boolean; label: string }>;
  title: string;
}

function EnrolledStudentDialogContentInfoConditionalList({
  items,
  title,
}: EnrolledStudentDialogContentInfoConditionalListProps) {
  return (
    <>
      <p className="font-bold">{title}:</p>
      <ul>
        {items.map(
          (item) =>
            item.displayItem && <li key={item.label}>&emsp;- {item.label}</li>
        )}
      </ul>
    </>
  );
}

export { EnrolledStudentDialogContentInfoConditionalList };
