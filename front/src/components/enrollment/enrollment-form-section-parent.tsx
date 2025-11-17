import { EnrollmentFormSectionHeader } from '@/components/enrollment/enrollment'
import { InputGroup } from '@/components/ui/input-group'
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import type { EnrollmentFormSchema } from '@/types/enrollment';
import { ControlledDropdown } from '@/components/enrollment/controlled-dropdown'
import { ControlledDatePicker } from '@/components/enrollment/controlled-date-picker'
import { calculateAgeYears } from '@/utils/enrollment/calculate-age';
import { EDUCATION_LEVEL_OPTIONS } from '@/consts/enrollment';


interface EnrollmentFormSectionParentProps {
  register: UseFormRegister<EnrollmentFormSchema>;
  control: Control<EnrollmentFormSchema>;
  errors: FieldErrors<EnrollmentFormSchema>;
  parent: 'mother' | 'father';
  setValue: UseFormSetValue<EnrollmentFormSchema>
};

function EnrollmentFormSectionParent({
  register,
  control,
  errors,
  parent,
  setValue,
}: EnrollmentFormSectionParentProps) {
  return (
    <>
      <EnrollmentFormSectionHeader>
        Información {parent === 'mother' ? 'de la madre' : 'del padre'}
      </EnrollmentFormSectionHeader>
      <InputGroup
        className='w-full'
        label="Nombre completo:"
        inputId={`${parent}.fullName`}
        register={register(`${parent}.fullName`)}
        errorMessage={errors[parent]?.fullName?.message}
      />

      <div className='flex gap-4'>
        <ControlledDatePicker
          control={control}
          inputId={`${parent}.birthDate`}
          labelText='Fecha de nacimiento:'
          errorMessage={errors[parent]?.birthDate?.message}
          onValueChange={(value) => {
            const calculatedAgeYears = calculateAgeYears(value)
            setValue(`${parent}.ageYears`, calculatedAgeYears)
          }}
        />

        <InputGroup
          className='w-16'
          label="Años:"
          inputId={`${parent}.ageYears`}
          register={register(`${parent}.ageYears`)}
          disabled={true}
        />
      </div>

      <div className='flex gap-4'>
        <InputGroup
          className='w-full'
          label="Dirección:"
          inputId={`${parent}.address`}
          register={register(`${parent}.address`)}
          errorMessage={errors[parent]?.address?.message}
        />

        <InputGroup
          className='w-full'
          label="Barrio:"
          inputId={`${parent}.neighborhood`}
          register={register(`${parent}.neighborhood`)}
          errorMessage={errors[parent]?.neighborhood?.message}
        />
      </div>

      <div className='flex gap-4'>
        <InputGroup
          className='w-full'
          label="Celular:"
          inputId={`${parent}.cellPhoneNumber`}
          register={register(`${parent}.cellPhoneNumber`)}
          errorMessage={errors[parent]?.neighborhood?.message}
        />

        <InputGroup
          className='w-full'
          label="Teléfono:"
          inputId={`${parent}.telephoneNumber`}
          register={register(`${parent}.telephoneNumber`)}
          errorMessage={errors[parent]?.telephoneNumber?.message}
        />
      </div>

      <InputGroup
        label="Ocupación o profesión:"
        inputId={`${parent}.occupation`}
        register={register(`${parent}.occupation`)}
        errorMessage={errors[parent]?.occupation?.message}
      />

      <ControlledDropdown
        control={control}
        inputId={`${parent}.educationLevel`}
        labelText='Nivel educativo:'
        errorMessage={errors[parent]?.educationLevel?.message}
        variant='multiple'
        options={EDUCATION_LEVEL_OPTIONS}
      />
    </>
  )
}

export { EnrollmentFormSectionParent };
