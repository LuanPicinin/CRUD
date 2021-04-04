import { validateRequestCreateAndUpdate } from '../../../shared/utils/validateRequestCreateAndUpdate';

describe('Validate', () => {
  it('Deve lançar erro se data de nascimento for maior que a data de hoje', async () => {
    const validate = validateRequestCreateAndUpdate('03/09/2022', 0, 'M');

    expect(validate).toBe('Data de Nascimento inválida!');
  });

  it('Deve lançar erro se idade for menor que zero', async () => {
    const validate = validateRequestCreateAndUpdate('03/09/1997', -1, 'M');

    expect(validate).toBe('Idade inválida!');
  });

  it('Deve lançar erro se sexo for diferente de M ou F', async () => {
    const validate = validateRequestCreateAndUpdate('03/09/1997', 0, 'G');

    expect(validate).toBe('Campo sexo com caractere inválido!');
  });

  it('Não deve lançar erro ao validar campos', async () => {
    const validate = validateRequestCreateAndUpdate('03/09/1997', 0, 'M');

    expect(validate).toBe(undefined);
  });
});
