import React, { useState } from 'react';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import InputAdress from '../Input/InputAdress';
import InputName from '../Input/InputName';
import InputPhoneNum from '../Input/InputPhoneNum';
import { TitleWrapper } from './BasicInfo';

function OauthBasicInfo() {
  const [joinForm, setJoinForm] = useState({});

  const fillJoinForm = (obj: IJoinPartial) => {
    setJoinForm({ ...joinForm, ...obj });
  };

  return (
    <div>
      <TitleWrapper>
        <h2>기본정보</h2>
        <span>(*)는 필수 입력 사항입니다.</span>
      </TitleWrapper>
      <InputName fillJoinForm={fillJoinForm}></InputName>
      <InputPhoneNum fillJoinForm={fillJoinForm}></InputPhoneNum>
    </div>
  );
}

export default OauthBasicInfo;
