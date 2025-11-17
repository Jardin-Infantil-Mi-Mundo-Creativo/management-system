import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment'
import { Control, FieldError, FieldErrorsImpl, Merge, useFieldArray, UseFormRegister } from 'react-hook-form';
import { EnrollmentFormSchema } from '@/types/enrollment';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { InputGroup } from '@/components/ui/input-group';


interface EnrollmentFormSectionAuthorizedPersonsProps {
  control: Control<EnrollmentFormSchema>;
  authorizedPersonsErrors?: Merge<FieldError, FieldErrorsImpl<EnrollmentFormSchema['authorizedPersons']>>;
  register: UseFormRegister<EnrollmentFormSchema>;
};

function EnrollmentFormSectionAuthorizedPersons({
  control,
  authorizedPersonsErrors,
  register,
}: EnrollmentFormSectionAuthorizedPersonsProps) {
  const {
    fields: authorizedPersonsFields,
    append: appendAuthorizedPerson,
    remove: removeAuthorizedPerson
  } = useFieldArray({
    control,
    name: "authorizedPersons"
  });

  return (
    <>
      <div>
        <EnrollmentFormSectionHeader>
          Personas autorizadas para recoger al estudiante
        </EnrollmentFormSectionHeader>
        <p className='text-sm'>Diferentes a los padres</p>
      </div>

      {authorizedPersonsFields.length ? (
        <div className='flex flex-col gap-4'>
          {authorizedPersonsFields.map((field, idx) => (
            <div key={field.id} className='flex gap-4 items-start'>
              <InputGroup
                label='Nombre completo:'
                inputId={`authorizedPersons.${idx}.fullName`}
                register={register(`authorizedPersons.${idx}.fullName`)}
                errorMessage={authorizedPersonsErrors?.[idx]?.fullName?.message}
                className='w-3/5'
              />

              <InputGroup
                label='Celular:'
                inputId={`authorizedPersons.${idx}.cellPhoneNumber`}
                register={register(`authorizedPersons.${idx}.cellPhoneNumber`)}
                errorMessage={authorizedPersonsErrors?.[idx]?.cellPhoneNumber?.message}
                className='w-1.5/5'
              />

              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="w-0.5/5 h-9 mt-[30px]"
                onClick={() => removeAuthorizedPerson(idx)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      ) : null}

      <Button
        type="button"
        className="w-fit"
        onClick={() => appendAuthorizedPerson({ fullName: "", cellPhoneNumber: "" })}
      >
        Agregar persona
      </Button>

      {authorizedPersonsErrors ? (
        <span className="text-sm text-red-600 -mt-2">
          {authorizedPersonsErrors?.message}
        </span>
      ) : null}
    </>
  )
}

export { EnrollmentFormSectionAuthorizedPersons };
