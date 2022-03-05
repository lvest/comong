import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageAsideBar from '../../components/mypage/MypageAsideBar';

const Wrapper = styled.div`
  height: auto;
  max-width: 1240px;
  margin: 0 auto;
  padding: 100px 0;
  display: flex;
  justify-content: space-around;
  font-family: 'roboto', 'Noto Sans KR';

  @media only screen and (max-width: 1200px) {
    padding: 100px 1%;
  }
  // @media only screen and (max-width: 768px) {
  // }

  div.menuIcon {
    width: 20px;
    height: 20px;
    position: fixed;
    top: 80px;
    left: 10px;
    padding: 2px;
    border-radius: 10px;
  }
`;

const NavWrapper = styled.div`
  position: relative;
  width: 20%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const MenuIcon = styled.img`
  width: 100%;
  height: 100%;
`;

// @media only screen and (max-width: 1200px) {
// }
// @media only screen and (max-width: 768px) {
// }

const OutletWrapper = styled.div`
  width: 80%;
  padding: 0 2%;

  @media only screen and (max-width: 1500px) {
    padding: 0 4%;
  }

  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 20px;
    margin-left: 0;
  }

  &.modifyInfo {
    display: flex;
    justify-content: center;
    padding: 60px 0;
  }
`;

// 1. width가 태블릿이 되면 기본으로 햄버거 바가 보여야 함
// 2. 햄버거를 클릭했을 때, MypageAsideBar가 나와야 함
// 3. MypageAsideBar는 width에 따라 모양이 달라야 함
// 4. MypageAsideBar가 열려있을 때는 배경이 어두워야 함
// 4. MypageAsideBar의 close 버튼을 클릭하면 MypageAsideBar는 사라지고, 햄버거 버튼이 다시 생겨야 함

function Mypage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(width > 1200 ? true : false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => setWidth(window.innerWidth);

  return (
    <Wrapper>
      <NavWrapper>
        {showMenu || width > 1200 ? (
          <MypageAsideBar setShowMenu={setShowMenu}></MypageAsideBar>
        ) : (
          <div className="menuIcon">
            <MenuIcon onClick={() => setShowMenu(true)} src="/icons/menu.png" />
          </div>
        )}
      </NavWrapper>
      <OutletWrapper
        className={pathname.includes('modifyInfo') ? 'modifyInfo' : ''}
      >
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
}

export default Mypage;
