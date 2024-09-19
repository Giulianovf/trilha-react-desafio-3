import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { 
  Container, 
  ErrorText, 
  Title, 
  Column, 
  TitleLogin, 
  SubtitleLogin, 
  EsqueciText, 
  CriarText, 
  Row, 
  Wrapper 
} from './styles';

// Define o esquema de validação com yup
const schema = yup.object({
  email: yup
    .string()
    .email('O email não é válido')
    .required('O email é obrigatório'),
  
  password: yup
    .string()
    .min(3, 'A senha deve ter no mínimo 3 caracteres')
    .required('A senha é obrigatória'),
}).required();

const Login = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.password}`);
      
      if (data.length && data[0].id) {
        navigate('/feed');
        return;
      }

      alert('Usuário ou senha inválidos');
    } catch (e) {
      alert('Houve um erro ao realizar o login. Tente novamente.');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais tecnologias
            e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Faça seu login</TitleLogin>
            <SubtitleLogin>Faça seu login e faça a diferença.</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="password" control={control} />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}              
              <Button title="Entrar" variant="secondary" type="submit" />
            </form>
            <Row>
              <EsqueciText>Esqueci minha senha</EsqueciText>
              <CriarText>Criar Conta</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
}

export { Login };
