import { useContext, useRef } from 'react';
import ThemeContext from '../context/theme-context';

import styled from 'styled-components';

const FormItem = styled.form`
  position: relative;
  z-index: 99;
  width: 600px;
  margin: 20px auto;

  @media (max-width: 1024px) {
    width: auto;
    margin: 20px;
  }

  & button {
    border-radius: 50%;
    border: ${(props) =>
      props.dark ? '1px solid #434451' : '1px solid #e6e5ea'};
    width: 20px;
    height: 20px;
    background: transparent;
    position: absolute;
    top: 8px;
    left: 10px;
    transition: all 0.3s linear;

    &:hover {
      cursor: pointer;
      background: linear-gradient(145deg, #73c1ff, #a77bea);
    }
  }

  & input {
    background-color: ${(props) => (props.dark ? '#25273c' : '#fff')};
    border: none;
    border-radius: 5px;
    padding: 10px 0 10px 50px;
    width: 100%;

    &::placeholder {
      color: #656774;
    }

    &[type='text'] {
      color: #adafc6;
    }
  }
`;

const Form = ({ onAdd }) => {
  const ctx = useContext(ThemeContext);
  const dark = ctx.themeDark;

  const taskRef = useRef('');

  const formSubmitHandler = (event) => {
    event.preventDefault();

    onAdd({
      task: taskRef.current.value,
      done: false,
    });
  };

  return (
    <FormItem dark={dark} onSubmit={formSubmitHandler}>
      <button type="submit" />
      <input type="text" placeholder="Create a new todo..." ref={taskRef} />
    </FormItem>
  );
};

export default Form;
