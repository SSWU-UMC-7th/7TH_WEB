// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

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

// const Login = () => {
//   const [loginError, setLoginError] = useState('');
//   const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

//   const schema = yup.object().shape({
//     email: yup.string().email('이메일을 입력해주세요!').required('이메일을 반드시 입력해주세요'),
//     password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.'),
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     console.log('폼 데이터 제출', data);
    
//     try {
//       const response = await fetch('http://localhost:3000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('로그인 실패');
//       }

//       const result = await response.json();
//       console.log('로그인 성공', result);

//       // 여기서 토큰을 로컬 스토리지에 저장하거나 상태 관리 도구에 저장할 수 있습니다.
//       localStorage.setItem('accessToken', result.accessToken);
//       localStorage.setItem('refreshToken', result.refreshToken);

//       // 로그인 성공 시 메인 페이지로 이동
//       navigate('/'); // 메인 페이지의 경로에 맞게 수정

//     } catch (error) {
//       console.error('오류 발생:', error);
//       setLoginError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
//     }
//   };

//   return (
//     <Container>
//       <FormWrapper onSubmit={handleSubmit(onSubmit)}>
//         <Title>로그인</Title>
        
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
        
//         {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

//         <SubmitButton type="submit">로그인</SubmitButton>
//       </FormWrapper>
//     </Container>
//   );
// };

// export default Login;

// pages/Login.js

import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #111;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 40px;
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
  margin: -8px 0 10px 0;
`;

const SubmitButton = styled.button`
  height: 40px;
  background-color: #ff4081; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1c6b; /* 버튼 호버 색상 */
  }
`;

const Title = styled.h2`
  color: white; /* 제목 색상 */
  text-align: center;
  margin-bottom: 20px;
`;

const Login = () => {
  const { setIsLoggedIn, setNickname } = useContext(AuthContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('이메일을 입력해주세요!').required('이메일을 반드시 입력해주세요'),
    password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        setIsLoggedIn(true);
        setNickname(data.email.split('@')[0]);
        navigate('/'); // Navigate to the main page after login
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
        <Input
          type="email"
          {...register('email')}
          placeholder="이메일을 입력해주세요!"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <Input
          type="password"
          {...register('password')}
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        <SubmitButton type="submit">로그인</SubmitButton>
      </FormWrapper>
    </Container>
  );
};

export default Login;

