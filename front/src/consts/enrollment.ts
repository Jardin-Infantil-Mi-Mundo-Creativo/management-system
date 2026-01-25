import { useTranslations } from 'next-intl';

export const useEnrollmentOptions = () => {
  const t = useTranslations('enrollment.consts');

  const EDUCATION_LEVEL_OPTIONS = [
    { label: t('educationLevel.primary'), value: 'primary school' },
    { label: t('educationLevel.secondary'), value: 'secondary school' },
    { label: t('educationLevel.technical'), value: 'technical' },
    { label: t('educationLevel.university'), value: 'university' },
  ];

  const EDUCATION_LEVEL_OPTIONS_VALUES = EDUCATION_LEVEL_OPTIONS.flatMap(
    (option) => option.value
  );

  const PARENTS_RELATIONSHIP_OPTIONS = [
    { label: t('parentsRelationship.married'), value: 'married' },
    {
      label: t('parentsRelationship.commonLawMarriage'),
      value: 'common law marriage',
    },
    { label: t('parentsRelationship.singleMother'), value: 'single mother' },
    { label: t('parentsRelationship.separated'), value: 'separated' },
  ];

  const PARENTS_RELATIONSHIP_OPTIONS_VALUES =
    PARENTS_RELATIONSHIP_OPTIONS.flatMap((option) => option.value);

  const GRADE_OPTIONS = [
    { label: t('grades.walkers'), value: 'walkers' },
    { label: t('grades.toddlers'), value: 'toddlers' },
    { label: t('grades.preschool'), value: 'preschool' },
    { label: t('grades.kindergarten'), value: 'kindergarten' },
    { label: t('grades.transition'), value: 'transition' },
    { label: t('grades.firstGrade'), value: 'first grade' },
  ];

  const GRADE_OPTIONS_VALUES = GRADE_OPTIONS.flatMap((option) => option.value);

  const STRATUM_OPTIONS = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
  ];

  const STRATUM_OPTIONS_VALUES = STRATUM_OPTIONS.flatMap(
    (option) => option.value
  );

  const BLOOD_TYPE_OPTIONS = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
  ];

  const BLOOD_TYPE_OPTIONS_VALUES = BLOOD_TYPE_OPTIONS.flatMap(
    (option) => option.value
  );

  const SISBEN_OPTIONS = [
    { label: t('sisben.doesNotHave'), value: 'N/A' },
    { label: 'A1', value: 'A1' },
    { label: 'A2', value: 'A2' },
    { label: 'A3', value: 'A3' },
    { label: 'A4', value: 'A4' },
    { label: 'A5', value: 'A5' },
    { label: 'B1', value: 'B1' },
    { label: 'B2', value: 'B2' },
    { label: 'B3', value: 'B3' },
    { label: 'B4', value: 'B4' },
    { label: 'B5', value: 'B5' },
    { label: 'B6', value: 'B6' },
    { label: 'B7', value: 'B7' },
    { label: 'C1', value: 'C1' },
    { label: 'C2', value: 'C2' },
    { label: 'C3', value: 'C3' },
    { label: 'C4', value: 'C4' },
    { label: 'C5', value: 'C5' },
    { label: 'C6', value: 'C6' },
    { label: 'C7', value: 'C7' },
    { label: 'C8', value: 'C8' },
    { label: 'C9', value: 'C9' },
    { label: 'C10', value: 'C10' },
    { label: 'C11', value: 'C11' },
    { label: 'C12', value: 'C12' },
    { label: 'C13', value: 'C13' },
    { label: 'C14', value: 'C14' },
    { label: 'C15', value: 'C15' },
    { label: 'C16', value: 'C16' },
    { label: 'C17', value: 'C17' },
    { label: 'C18', value: 'C18' },
    { label: 'D1', value: 'D1' },
    { label: 'D2', value: 'D2' },
    { label: 'D3', value: 'D3' },
    { label: 'D4', value: 'D4' },
    { label: 'D5', value: 'D5' },
    { label: 'D6', value: 'D6' },
    { label: 'D7', value: 'D7' },
    { label: 'D8', value: 'D8' },
    { label: 'D9', value: 'D9' },
    { label: 'D10', value: 'D10' },
    { label: 'D11', value: 'D11' },
    { label: 'D12', value: 'D12' },
    { label: 'D13', value: 'D13' },
    { label: 'D14', value: 'D14' },
    { label: 'D15', value: 'D15' },
    { label: 'D16', value: 'D16' },
    { label: 'D17', value: 'D17' },
    { label: 'D18', value: 'D18' },
    { label: 'D19', value: 'D19' },
    { label: 'D20', value: 'D20' },
    { label: 'D21', value: 'D21' },
  ];

  const SISBEN_OPTIONS_VALUES = SISBEN_OPTIONS.flatMap(
    (option) => option.value
  );

  return {
    BLOOD_TYPE_OPTIONS,
    BLOOD_TYPE_OPTIONS_VALUES,
    EDUCATION_LEVEL_OPTIONS,
    EDUCATION_LEVEL_OPTIONS_VALUES,
    GRADE_OPTIONS,
    GRADE_OPTIONS_VALUES,
    PARENTS_RELATIONSHIP_OPTIONS,
    PARENTS_RELATIONSHIP_OPTIONS_VALUES,
    SISBEN_OPTIONS,
    SISBEN_OPTIONS_VALUES,
    STRATUM_OPTIONS,
    STRATUM_OPTIONS_VALUES,
  };
};
