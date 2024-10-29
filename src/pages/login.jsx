import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import styled from "styled-components";

const Position = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  margin-top:100px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  width: 600px;
  border-radius: 8px;
`

const Input = styled.input `
  width:300px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 13px;

  &[type="submit"] {
    background-color: #d91656;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #d91656;
    }
  }
`

const ErrorMessage = styled.p`
  color: #D91656;
  font-size: 12px;
`

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`


const LoginPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 입력해주세요!'),
    password: yup.string().min(8,'비밀번호는 8자 이상이어야 합니다.'). max(16, '비밀번호는 16자 이하여야 합니다.'). required('비밀번호를 입력해주세요!'),
  })

  const {register,handleSubmit,formState:{errors, isValid},}=useForm({
    resolver:yupResolver(schema),
    mode:"onChange",
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출')
    console.log(data);
  }

  return (
    <Position>
      <StyledForm onSubmit = {handleSubmit(onSubmit)}>
        <Heading>로그인</Heading>
        <Input type={'email'}{...register("email")} placeholder="이메일을 입력해주세요!"/>
        <ErrorMessage style={{color:'red'}}>{errors.email?.message}</ErrorMessage>
        <Input type={'password'}{...register("password")} placeholder="비밀번호를 입력해주세요!"/>
        <ErrorMessage style={{color:'red'}}>{errors.password?.message}</ErrorMessage>
        <Input type={'submit'} value="로그인"
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? '#D91656' : 'gray',  // 유효하면 핑크색, 아니면 회색
          cursor: isValid ? 'pointer' : 'not-allowed',  // 비활성화 시 마우스 커서 변경
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '5px',
        }}
          />
      </StyledForm>
    </Position>
  );
};

export default LoginPage;