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
      <h2>
        <span className="font-bold">{title}:</span>
      </h2>
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
