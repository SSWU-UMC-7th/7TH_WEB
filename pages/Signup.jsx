// import React from 'react';
// import {useForm} from 'react-hook-form'
// import * as yup from 'yup'
// // TIP: zod를 사용하신다면 @hookform/resolvers/zod 를 import 하시면 됩니다!
// import {yupResolver} from '@hookform/resolvers/yup'
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;

// `;

// const FormWrapper = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   padding: 40px;
//   background-color: #111;
//   border-radius: 8px;
// `;

// const Input = styled.input`
//   height: 40px;
//   margin-bottom: 10px;
//   padding: 0 10px;
//   font-size: 16px;
//   border: none;
//   border-radius: 4px;
//   outline: none;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 12px;
//   margin-top: -8px;
//   margin-bottom: 10px;
// `;

// const SubmitButton = styled.button`
//   height: 40px;
//   background-color: #ff4081;
//   color: white;
//   font-size: 16px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #ff1c6b;
//   }
// `;

// const Title = styled.h2`
//   color: white;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const SignUp = () => {
//   const schema = yup.object().shape({
//       email: yup.string().email().required('이메일을 반드시 입력해주세요'),
//       password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 반드시 입력해주세요'),
//       passwordCheck: yup.string().oneOf([yup.ref('password'), null],'비밀번호가 일치하지 않습니다.')
//       .required('비밀번호 확인을 입력해주세요.')
//   })

//   const {register, handleSubmit, formState: {errors}} = useForm({
//       resolver: yupResolver(schema)
//   });

//   const onSubmit = (data) => {
//       console.log('폼 데이터 제출')
//       console.log(data);
//   }

//   return (
//     <Container>
//       <FormWrapper onSubmit={handleSubmit(onSubmit)}>
//         <Title>회원가입</Title>
//         <Input
//           type="email"
//           placeholder="이메일을 입력해주세요!"
//           {...register('email')}
//         />
//         {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

//         <Input
//           type="password"
//           placeholder="비밀번호를 입력해주세요!"
//           {...register('password')}
//         />
//         {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

//         <Input
//           type="password"
//           placeholder="비밀번호를 다시 입력해주세요!"
//           {...register('passwordCheck')}
//         />
//         {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}

//         <SubmitButton type="submit">제출</SubmitButton>
//       </FormWrapper>
//     </Container>
//   );
// };

// export default SignUp;

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 40px;
  background-color: #111;
  border-radius: 8px;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  height: 40px;
  background-color: #ff4081;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1c6b;
  }
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const SignUp = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('올바른 이메일 형식을 입력해주세요')
      .required('이메일을 반드시 입력해주세요'),
    password: yup
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .required('비밀번호를 반드시 입력해주세요'),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 회원가입 API 호출
      const response = await axios.post('http://localhost:3000/auth/register', {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck // 비밀번호 확인도 포함
      });

      console.log('회원가입 성공:', response.data);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error.response?.data || error.message);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.'); // 오류 메시지 표시
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register('email')}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register('password')}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...register('passwordCheck')}
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
        )}

        <SubmitButton type="submit">제출</SubmitButton>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;

