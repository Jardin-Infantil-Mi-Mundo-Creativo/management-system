interface FormDataWithFilesInput {
  documentsFile?: File | null;
  studentPhoto?: File | null;
}

export function createFormDataWithFiles({
  documentsFile,
  studentPhoto,
}: FormDataWithFilesInput) {
  const formData = new FormData();
  formData.append('studentPhoto', studentPhoto ?? '');
  formData.append('documentsFile', documentsFile ?? '');

  return formData;
}
