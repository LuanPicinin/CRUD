import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { differenceInYears, subDays } from 'date-fns';

import Button from '../../components/Button';
import Input from '../Input';
import Select from '../Dropdown';
import SelectDate from '../DatePicker';

import { Buttons, Container, Content } from './styles';
import api from '../../services/api';
import { formatDateEUA } from '../../utils/formatDateEUA';

export default function Modal({
  data,
  fetchDevelopers,
  handleClose,
  isEdit,
  setNotification,
  setOpenNotification,
}) {
  const formRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;

    formRef.current.setData({
      age: data.idade,
      birthDate: new Date(data.dataNascimento).getTime(),
      gender: data.sexo === 'M' ? 1 : 2,
      hobby: data.hobby,
      name: data.nome,
    });
  }, [data, isEdit]);

  const handleSubmit = useCallback(
    async (formData) => {
      const { age, birthDate, gender, hobby, name } = formData;

      const birthDateFormatted = formatDateEUA(birthDate);

      const genderTreated = gender === '1' ? 'M' : 'F';

      try {
        if (!isEdit) {
          const response = await api.post('developers', {
            nome: name,
            sexo: genderTreated,
            idade: age,
            hobby: hobby,
            dataNascimento: birthDateFormatted,
          });

          if (response.status === 201) {
            setNotification({
              status: 'sucess',
              message: 'Cadastrado com sucesso!',
            });
            setOpenNotification(true);
            handleClose();
            fetchDevelopers();
          }
        } else {
          const response = await api.put(`developers/${data.id}`, {
            nome: name,
            sexo: genderTreated,
            idade: age,
            hobby: hobby,
            dataNascimento: birthDateFormatted,
          });

          if (response.status === 200) {
            setNotification({
              status: 'sucess',
              message: 'Atualizado com sucesso!',
            });
            setOpenNotification(true);
            handleClose();
            fetchDevelopers();
          }
        }
      } catch (e) {
        setNotification({
          status: 'error',
          message: e.response.data,
        });
        setOpenNotification(true);
      }
    },
    [
      data.id,
      fetchDevelopers,
      handleClose,
      isEdit,
      setNotification,
      setOpenNotification,
    ]
  );

  return (
    <>
      <Container>
        <Content>
          <Form
            ref={formRef}
            onSubmit={(formData) => {
              handleSubmit(formData);
            }}
          >
            <div>
              <Input name="name" label="Nome" />
            </div>
            <div>
              <Select
                name="gender"
                label="Sexo"
                list={[
                  { label: 'Masculino', value: 1 },
                  { label: 'Feminino', value: 2 },
                ]}
              />
            </div>
            <div>
              <SelectDate
                name="birthDate"
                label="Data de Nascimento"
                maxDate={subDays(new Date(), 0)}
                handleChange={(value) => {
                  const formCurrent = formRef.current.getData();

                  const ageCount = differenceInYears(
                    new Date(),
                    new Date(value)
                  );

                  formRef.current.setData({
                    ...formCurrent,
                    age: ageCount,
                  });
                }}
              />
            </div>
            <div>
              <Input name="age" label="Idade" disabled />
            </div>
            <div>
              <Input name="hobby" label="Hobby" />
            </div>
            <Buttons>
              <Button color="#ff4569" type="button" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit">Cadastrar</Button>
            </Buttons>
          </Form>
        </Content>
      </Container>
    </>
  );
}
