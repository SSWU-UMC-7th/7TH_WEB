import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

const Input = styled.input`
  width:300px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 13px;

  &[type="submit"] {
    background-color: #D91656;
    color: white;
    border: none;
    cursor: pointer;
  }
`
const Header = styled.h2`
  text-align:center;
  margin-bottom:10px;
`
const P = styled.p`
  color: white;
  font-size: 12px;
`

const SignUpPage = () => {
  // Yup 유효성 검사 스키마 설정
  const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요!'),
    password: yup.string().min(8, '비밀번호는 최소 8자입니다.').max(16, '비밀번호는 최대 16자입니다.').required('비밀번호를 입력해주세요!'),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')  // password와 일치하는지 확인
      .required('비밀번호 확인을 입력해주세요!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",  // 입력이 변경될 때마다 유효성 검사를 실행
  });

  const onSubmit = (data) => {
    console.log('폼 데이터 제출:', data);
  };

  return (
    <Position>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Header>회원가입</Header>

        {/* 이메일 입력 필드 */}
        <Input
          type="email"
          {...register("email")}
          placeholder="이메일을 입력해주세요!"
        />
        <P>{errors.email?.message}</P>

        {/* 비밀번호 입력 필드 */}
        <Input
          type="password"
          {...register("password")}
          placeholder="비밀번호를 입력해주세요!"
        />
        <P>{errors.password?.message}</P>

        {/* 비밀번호 확인 입력 필드 */}
        <Input
          type="password"
          {...register("passwordCheck")}
          placeholder="비밀번호 확인을 입력해주세요!"
        />
        <P>{errors.passwordCheck?.message}</P>

        {/* 제출 버튼: 유효성 검사 통과 시 활성화 */}
        <Input
          type="submit"
          value="가입하기"
          disabled={!isValid}  // 유효하지 않으면 비활성화
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

export default SignUpPage;
