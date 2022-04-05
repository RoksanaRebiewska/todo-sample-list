import { useContext, useState, useRef } from 'react';
import ThemeContext from '../context/theme-context';

import ApiService from '../Api.service';

import styled from 'styled-components';

const ListWrapper = styled.section`
  background-color: ${(props) => (props.dark ? '#25273c' : '#fff')};
  position: relative;
  width: 600px;
  z-index: 99;
  margin: 0 auto;
  color: ${(props) => (props.dark ? '#adafc6' : '#434451')};
  border-radius: 5px;

  @media (max-width: 1024px) {
    width: auto;
    margin: 20px;
  }

  & ul {
    padding: 0;
  }

  & li {
    padding: 10px 0 10px 50px;
    list-style: none;
    border-bottom: ${(props) =>
      props.dark ? '1px solid #434451' : '1px solid #e6e5ea'};
    position: relative;
    transition: all 0.3s linear;

    &.done {
      text-decoration: line-through;
      color: ${(props) => (props.dark ? '#434451' : '#e6e5ea')};

      & button {
        background: linear-gradient(145deg, #73c1ff, #a77bea);
        color: #fff;
      }
    }

    &.display-none {
      display: none;
    }

    & button {
      border-radius: 50%;
      border: ${(props) =>
        props.dark ? '1px solid #434451' : '1px solid #e6e5ea'};
      width: 20px;
      height: 20px;
      background: transparent;
      position: absolute;
      top: 7px;
      left: 10px;
      transition: all 0.3s linear;
      color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        cursor: pointer;
        background: linear-gradient(145deg, #73c1ff, #a77bea);
        color: #fff;
      }
    }
  }

  & section {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 20px;
    color: ${(props) => (props.dark ? '#434451' : '#b9babe')};

    & span {
      margin: 0 10px;
      display: inline-block;
      width: 50px;
      text-align: center;

      &:hover {
        cursor: pointer;
        font-weight: bold;
        color: ${(props) => (props.dark ? '#adafc6' : '#3a3d50')};
      }
    }

    & div.span-div {
      @media (max-width: 1024px) {
        position: absolute;
        background-color: ${(props) => (props.dark ? '#25273c' : '#fff')};
        padding: 20px 0;
        border-radius: 5px;
        width: calc(100vw - 40px);
        bottom: -80px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        & span {
          width: auto;
          margin: 0 5%;
        }
      }
    }
  }
`;

const List = ({ onUpdating, content }) => {
  const ctx = useContext(ThemeContext);
  const dark = ctx.themeDark;

  const [showingAll, setShowingAll] = useState(true);
  const [showingActive, setShowingActive] = useState(false);
  const [showingCompleted, setShowingCompleted] = useState(false);
  const [listToShow, setListToShow] = useState(content);

  const ref = useRef([]);

  const data = content;

  async function doneDataUpdateHandler(id, done, ref) {
    if (!done) {
      await ApiService.httpPatch(`/${id}.json`, { done: true });

      ref.classList.add('done');
      onUpdating();
    } else {
      await ApiService.httpPatch(`/${id}.json`, { done: false });

      ref.classList.remove('done');
      onUpdating();
    }
  }

  const showAll = () => {
    setShowingAll(true);
    setShowingActive(false);
    setShowingCompleted(false);

    setListToShow(data);
  };

  const showActive = () => {
    setShowingAll(false);
    setShowingActive(true);
    setShowingCompleted(false);

    setListToShow(data.filter((item) => item.done === false));
  };

  const showCompleted = () => {
    setShowingAll(false);
    setShowingActive(false);
    setShowingCompleted(true);

    setListToShow(data.filter((item) => item.done === true));
  };

  async function clearCompletedHandler() {
    const toDelete = data.filter((item) => item.done === true);

    await toDelete.forEach((item) => ApiService.httpDelete(`/${item.id}.json`));

    onUpdating();
  }

  return (
    <ListWrapper dark={dark}>
      <ul>
        {listToShow.map((item, index) => (
          <li
            id={item.id}
            key={item.id}
            className={item.done ? 'done' : ''}
            ref={(element) => (ref.current[index] = element)}
          >
            <button
              onClick={() => {
                doneDataUpdateHandler(item.id, item.done, ref.current[index]);
              }}
            >
              &#x2713;
            </button>
            {item.task}
          </li>
        ))}
      </ul>
      <section>
        <div>
          {content.filter((item) => item.done === false).length} items left
        </div>
        <div className="span-div">
          <span
            onClick={showAll}
            style={{
              fontWeight: showingAll ? 'bold' : '',
              color: showingAll ? '#4f77d6' : '',
            }}
          >
            All
          </span>
          <span
            onClick={showActive}
            style={{
              fontWeight: showingActive ? 'bold' : '',
              color: showingActive ? '#4f77d6' : '',
            }}
          >
            Active
          </span>
          <span
            onClick={showCompleted}
            style={{
              fontWeight: showingCompleted ? 'bold' : '',
              color: showingCompleted ? '#4f77d6' : '',
            }}
          >
            Completed
          </span>
        </div>
        <div>
          <span style={{ width: '130px' }} onClick={clearCompletedHandler}>
            Clear Completed
          </span>
        </div>
      </section>
    </ListWrapper>
  );
};

export default List;
