'use client';

import { Controller } from 'react-hook-form';

import { EnrolledStudentDialogContentInfo } from '@/components/enrolled-students//enrolled-student-dialog-content-info';
import { FileInput } from '@/components/ui/file-input';
import { Button } from '@/components/ui/shadcn/button';
import { useEnrolledStudentDialogContentInfoForm } from '@/hooks/enrolled-students/use-enrolled-student-dialog-content-info-form';
import { usePutEnrollmentMutation } from '@/mutations/enrolled-students/use-put-enrollment-mutation';
import type { EnrolledStudentDialogContentInfoSchemaType } from '@/schemas/enrolled-students';
import type { EnrollmentFormSchemaWithDocumentId } from '@/types/shared';

interface EnrolledStudentDialogContentInfoFormProps {
  data: EnrollmentFormSchemaWithDocumentId;
}

export function EnrolledStudentDialogContentInfoForm({
  data,
}: EnrolledStudentDialogContentInfoFormProps) {
  const { control, errors, handleSubmit } =
    useEnrolledStudentDialogContentInfoForm();
  const mutation = usePutEnrollmentMutation(data.id);

  const onSubmit = (formData: EnrolledStudentDialogContentInfoSchemaType) => {
    mutation.mutate(formData);
  };

  const isCompleted = data.studentPhoto && data.documentsFile;

  return (
    <div className="flex flex-col h-full gap-4">
      <EnrolledStudentDialogContentInfo data={data} />

      {!isCompleted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border-t pt-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Foto del estudiante</label>
              <Controller
                name="studentPhoto"
                control={control}
                render={({ field }) => (
                  <FileInput
                    onFileSelect={(file) => field.onChange(file)}
                    className="w-full"
                  />
                )}
              />
              {errors.studentPhoto && (
                <span className="text-sm text-red-600">
                  {String(errors.studentPhoto.message)}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Documentos (PDF)</label>
              <Controller
                name="documentsFile"
                control={control}
                render={({ field }) => (
                  <FileInput
                    onFileSelect={(file) => field.onChange(file)}
                    className="w-full"
                  />
                )}
              />
              {errors.documentsFile && (
                <span className="text-sm text-red-600">
                  {String(errors.documentsFile.message)}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Enviando...' : 'Completar formulario'}
          </Button>

          {mutation.isError && (
            <div className="text-red-600 text-sm text-center">
              Hubo un error al actualizar la matrícula. Por favor intente
              nuevamente.
            </div>
          )}
        </form>
      )}
    </div>
  );
}
