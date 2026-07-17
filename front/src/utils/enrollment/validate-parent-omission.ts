function validateParentOmission(omitMother: boolean, omitFather: boolean) {
  return omitMother && omitFather
    ? 'Registre la información de al menos uno de los padres'
    : undefined;
}

export { validateParentOmission };
