import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { email, password, confirmPassword } = inputValue;

  const navigate = useNavigate();

  const isValidEmail = email.includes('@') && email.includes('.');
  const isValidPassword = password.length >= 8;

  const handleInput = (e) => {
    const { id, value } = e.target;

    setInputValue({
      ...inputValue,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) {
      alert('비밀번호는 8자 이상 입력해주세요');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 다릅니다');
      return;
    }
    try {
      await api.post('/auth/signup', {
        email,
        password,
      });
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다');
      // navigate('/');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <div className='text-lg font-bold text-center'>회원가입</div>
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
        <div className='relative z-0 mb-6 w-full'>
          <input
            id='confirmPassword'
            type='password'
            name='repeat_password'
            className='input peer'
            placeholder=' '
            required
            onChange={handleInput}
          />
          <label htmlFor='floating_repeat_password' className='input-helper'>
            비밀번호 확인
          </label>
        </div>
        <button type='submit' className='btn-sm'>
          회원가입
        </button>
        <div className='text-sm text-center mt-4'>
          아이디가 있으신가요?
          <Link to='/' className='font-bold mx-1 hover:underline'>
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
