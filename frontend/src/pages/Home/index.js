import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format } from 'date-fns';

import api from '../../services/api';

import add from '../../assets/add.png';
import edit from '../../assets/edit.png';
import trash from '../../assets/delete.png';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Notification from '../../components/Notification';

import {
  AddButton,
  Container,
  Content,
  DivTable,
  Filters,
  Table,
} from './styles';
import Input from '../../components/Input';
import { Form } from '@unform/web';

export default function Home() {
  const filterForm = useRef(null);
  const lastScrollTop = useRef(null);
  const tableDiv = useRef(null);

  const [callFetchDevelopers, setCallFetchDevelopers] = useState(true);
  const [developers, setDevelopers] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredFetch, setFilteredFetch] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notification, setNotification] = useState({
    status: '',
    message: '',
  });
  const [page, setPage] = useState(0);
  const [selectedDeveloper, setSelectedDeveloper] = useState({});

  const fetchDevelopers = useCallback(async () => {
    try {
      const formCurrent = filterForm.current.getData();

      const response = await api.get('developers', {
        params: {
          filter: formCurrent.filter,
          page: 0,
        },
      });

      if (response.status === 200) {
        setDevelopers(response.data.content);
        const element = tableDiv.current;
        element.scrollTop = 0;
      }
    } catch (e) {
      setNotification({
        status: 'error',
        message: 'Erro ao carregar os dados',
      });
      setOpenNotification(true);
    }
  }, []);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await api.get('developers', {
          params: {
            filter,
            page: page,
          },
        });

        if (response.status === 200) {
          setHasMore(response.data.hasMore);

          if (filteredFetch) {
            setDevelopers([...response.data.content]);
          } else {
            setDevelopers([...developers, ...response.data.content]);
          }

          if (filteredFetch && response.data.content.length) {
            const element = tableDiv.current;
            element.scrollTop = 0;
          }
        }
      } catch (e) {
        setNotification({
          status: 'error',
          message: e.response.data
            ? e.response.data
            : 'Erro ao carregar os dados',
        });
        setOpenNotification(true);
      }
    };

    if (hasMore || callFetchDevelopers) {
      fetchDevelopers();
    }
  }, [callFetchDevelopers, filter]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await api.delete(`developers/${id}`);

        if (response.status === 204) {
          setNotification({
            status: 'sucess',
            message: 'Deletado com sucesso!',
          });
          setOpenNotification(true);
          fetchDevelopers();
        }
      } catch (e) {
        setNotification({
          status: 'error',
          message: 'Erro ao excluir dado!',
        });
        setOpenNotification(true);
      }
    },
    [fetchDevelopers]
  );

  const handleScroll = useCallback(
    (e) => {
      const element = e.target;

      if (
        element.scrollTop + element.clientHeight === element.scrollHeight &&
        lastScrollTop.current < element.scrollTop
      ) {
        setCallFetchDevelopers(!callFetchDevelopers);
        setFilteredFetch(false);
        setPage(page + 1);
      }

      lastScrollTop.current = element.scrollTop;
    },
    [callFetchDevelopers, page]
  );

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleCloseNotification = useCallback(() => {
    setOpenNotification(false);
  }, []);

  const tableHeaders = useMemo(
    () => [
      { key: 'name', name: 'Nome' },
      { key: 'gender', name: 'Sexo' },
      { key: 'age', name: 'Idade' },
      { key: 'hobby', name: 'Hobby' },
      { key: 'birthDate', name: 'Data de Nascimento' },
      { key: 'shares', name: 'Ações' },
    ],
    []
  );

  return (
    <>
      {openModal && (
        <Modal
          data={selectedDeveloper}
          fetchDevelopers={fetchDevelopers}
          handleClose={handleClose}
          isEdit={isEdit}
          setNotification={setNotification}
          setOpenNotification={setOpenNotification}
        />
      )}

      {openNotification && (
        <Notification
          handleClose={handleCloseNotification}
          message={notification.message}
          status={notification.status}
        />
      )}

      <Container>
        <Filters>
          <Form
            ref={filterForm}
            onSubmit={({ filter }) => {
              setCallFetchDevelopers(!callFetchDevelopers);
              setDevelopers([]);
              setFilter(filter);
              setFilteredFetch(true);
              setHasMore(true);
              setPage(0);
            }}
          >
            <Input name="filter" label="Nome" />
            <Button type="submit">Filtrar</Button>
          </Form>
        </Filters>
        <Content>
          <DivTable ref={tableDiv} onScroll={handleScroll}>
            <Table>
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header.key}>{header.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {developers.map((developer, index) => (
                  <tr key={index}>
                    <td>{developer.nome}</td>
                    <td>{developer.sexo}</td>
                    <td>{developer.idade}</td>
                    <td>{developer.hobby}</td>
                    <td>
                      {format(new Date(developer.dataNascimento), 'dd/MM/yyyy')}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setIsEdit(true);
                          setOpenModal(true);
                          setSelectedDeveloper(developer);
                        }}
                      >
                        <img src={edit} alt="editar" />
                      </Button>
                      <Button
                        color="#ff4569"
                        onClick={() => {
                          handleDelete(developer.id);
                        }}
                      >
                        <img src={trash} alt="apagar" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </DivTable>
          <AddButton
            onClick={() => {
              setIsEdit(false);
              setOpenModal(true);
            }}
          >
            <img src={add} alt="adicionar" />
          </AddButton>
        </Content>
      </Container>
    </>
  );
}
