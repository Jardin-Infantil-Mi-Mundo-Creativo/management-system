interface FormDataWithFilesInput {
  documentsFile?: File | string | null;
  studentPhoto?: File | string | null;
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
