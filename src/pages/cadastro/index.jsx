import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from 'react-hook-form';
import {Container, ErrorText, Title, Column, TitleLogin, SubtitleLogin, Row, Wrapper, FazerLogin, LoginText } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Cadastro = () => {

  const schema = yup.object({
    email: yup.string().email('O email não é válido').required('O email é obrigatório'),
    password: yup.string().min(3, 'A senha deve ter no mínimo 3 caracteres').required('A senha é obrigatória'),
    name: yup.string().required(),
  }).required();
  
    const navigate = useNavigate();
  
    const { control, handleSubmit,  formState: { errors, isValid } } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange',
    });
  
    const handleClickSignUp = () => {
      navigate('/feed')
    }

    const handleClickLogin = () => {
      navigate('/login')
    }

    return (<>
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
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change.</SubtitleLogin>
            <form onSubmit={handleSubmit}>
              <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="Nome" control={control} />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="password" control={control} />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}              
              <Input type="password" placeholder="Confirme a senha" leftIcon={<MdLock />} name="confirmPassword" control={control} />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}              
              <Button title='Criar minha conta' variant="secondary" type="submit" onClick={handleClickSignUp} />
            </form>
          <Row>
            <SubtitleLogin>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleLogin>
          </Row>
          <Row>
            <LoginText>Já tenho conta.
              <FazerLogin onClick={handleClickLogin}>Fazer login</FazerLogin>
            </LoginText>
          </Row>
          </Wrapper>
        </Column>
      </Container>
    </>)
}

export { Cadastro }