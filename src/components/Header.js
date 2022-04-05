import { useContext } from 'react';
import ThemeContext from '../context/theme-context';

import styled from 'styled-components';
import BgDarkDesktop from '../assets/bg-desktop-dark.jpg';
import BgLightDesktop from '../assets/bg-desktop-light.jpg';
import Moon from '../assets/icon-moon.svg';
import Sun from '../assets/icon-sun.svg';

const HeaderSection = styled.header`
  color: #fff;
  position: relative;
  z-index: 99;
  width: 600px;
  margin: 220px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    width: auto;
    margin: 50px 20px 0;
  }

  & h1 {
    font-size: 3rem;
  }

  & img {
    width: 30px;
    height: 30px;
  }
`;

const HeaderBackground = styled.header`
  width: 100vw;
  height: 500px;
  background: url(${(props) => (props.dark ? BgDarkDesktop : BgLightDesktop)});
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;

  @media (max-width: 1024px) {
    height: 300px;
  }
`;

const Header = ({ onThemeChange }) => {
  const ctx = useContext(ThemeContext);
  const dark = ctx.themeDark;

  return (
    <>
      <HeaderBackground dark={dark} />
      <HeaderSection>
        <h1>TODO</h1>
        <img
          src={ctx.themeDark ? Sun : Moon}
          onClick={onThemeChange}
          alt="theme change icon"
        />
      </HeaderSection>
    </>
  );
};

export default Header;
