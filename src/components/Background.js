import { useContext } from 'react';
import ThemeContext from '../context/theme-context';

import styled from 'styled-components';

const Background = (props) => {
  const ctx = useContext(ThemeContext);
  const dark = ctx.themeDark;

  const BackgroundColor = styled.section`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${ctx.themeDark ? '#000' : '#eeebeb'};
    z-index: 0;
    width: 100vw;
  `;

  return <BackgroundColor dark={dark}>{props.children}</BackgroundColor>;
};

export default Background;
