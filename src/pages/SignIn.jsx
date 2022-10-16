import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

const SignIn = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputValue;

  const navigate = useNavigate();

  const isValidEmail = email.includes('@') && email.includes('.');
  const isValidPassword = password.length >= 8;

  const handleInput = (e) => {
    const { id, value } = e.target;

    setInputValue({
      ...inputValue,
      [id]: value,
    });
    console.log(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) {
      alert('비밀번호는 8자 이상 입력해주세요');
      return;
    }
    try {
      await api.post('/auth/signin', {
        email,
        password,
      });
      navigate('/todo');
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div>
      <div className='text-lg font-bold text-center'>로그인</div>
      <form onSubmit={handleSubmit}>
        <div className='relative z-0 mb-6 w-full'>
          <input
            id='email'
            type='email'
            name='floating_email'
            className='input peer'
            placeholder=' '
            required
            onChange={handleInput}
          />
          <label htmlFor='floating_email' className='input-helper'>
            이메일
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full'>
          <input
            id='password'
            type='password'
            name='floating_password'
            className='input peer'
            placeholder=' '
            required
            onChange={handleInput}
          />
          <label htmlFor='floating_password' className='input-helper'>
            비밀번호
          </label>
        </div>
        <button type='submit' className='btn-sm'>
          로그인
        </button>
        <div className='text-sm text-center mt-4'>
          아이디가 없으신가요?
          <Link to='/signup' className='font-bold mx-1 hover:underline'>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;