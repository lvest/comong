import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import {
  deleteUserNotificationAsync,
  INotification,
  patchUserNotificationAsync,
} from '../../redux/modules/userSlice';

const Wrapper = styled.li`
  background-color: white;

  width: 100%;
  padding: 0.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.whiteForShadow};
  border-bottom: 1px solid ${(props) => props.theme.colors.whiteForShadow};

  display: flex;
  align-items: center;

  gap: 0.4rem;
  position: relative;

  @media only screen and (max-width: 768px) {
    padding: 1rem;
  }

  &.highlight {
    background-color: #fcf8e7;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.bgColor};
    cursor: pointer;
  }

  img {
    width: 60px;
    height: 60px;
  }

  > div {
    width: 95%;
    padding: 0.4rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 14px;

    span.noti-item {
      color: ${(props) => props.theme.colors.charcol};
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span.noti-message {
      font-size: 18px;
      font-weight: 700;
    }
    span.noti-date {
      text-align: end;
      color: ${(props) => props.theme.colors.darkGrey};
    }
  }
`;

interface INotificationListItem {
  info: INotification;
  type: string;
  idx: number;
}

function DropdownNotificationListItem({ info, type }: INotificationListItem) {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [isRead, setIsRead] = useState(info.read);
  const showNotificationByType: { [key: string]: string } = {
    paid: '[구매 알림] 배송을 준비해주세요',
    processing: '배송 준비중입니다.',
    intransit: '배송이 시작되었습니다.',
  };

  return (
    <Wrapper
      onClick={() => {
        dispatch(
          patchUserNotificationAsync({
            userId: userinfo?.id!,
            notiId: info.id,
          }),
        );
        setIsRead(true);
      }}
      className={isRead ? '' : 'highlight'}
    >
      <img src={info.itemInfo[0].image_src?.split(',')[0]} />
      <div>
        <span className="noti-item">{info.itemInfo[0].title}</span>
        <span className="noti-message">{showNotificationByType[type]}</span>
        <span className="noti-date">
          {info.data.updatedAt
            ? info.data.updatedAt.split('T')[0]
            : info.updatedAt.split('T')[0]}
        </span>
      </div>
    </Wrapper>
  );
}

export default DropdownNotificationListItem;
