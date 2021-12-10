import React, { useState, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "../Home/style";

const Favorites = () => {
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem("my-favorite-users"));
    if (data) setFavoriteUsers(data);
    setIsLoading(false);
  }, []);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorite Users
          </Text>
        </S.Header>
        <UserList
          users={favoriteUsers}
          isLoading={isLoading}
          setUsers={setFavoriteUsers}
        />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
