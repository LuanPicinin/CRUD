import { isAfter } from 'date-fns';

export const validateRequestCreateAndUpdate = (
  dataNascimento: string,
  idade: number,
  sexo: string
): string | undefined => {
  if (isAfter(new Date(dataNascimento), new Date()))
    return 'Data de Nascimento inválida!';

  if (idade && idade < 0) return 'Idade inválida!';

  if (sexo && sexo !== 'F' && sexo !== 'M')
    return 'Campo sexo com caractere inválido!';
};
