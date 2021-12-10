import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, showCheckBox, setUsers }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countryFilter, setCountryFilter] = useState(new Set());
  const [favoriteUsers, setFavoriteUsers] = useState([]);

  const countries = [
    { nat: "BR", name: "Brazil" },
    { nat: "AU", name: "Australia" },
    { nat: "CA", name: "Canada" },
    { nat: "DE", name: "Germany" },
    { nat: "NO", name: "Norway" },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("my-favorite-users"));
    if (data) setFavoriteUsers(data);
    users.map((user, index) => {
      let found = favoriteUsers.find((favoriteUser) => favoriteUser.email === user.email);
      if (found !== undefined) {
        users[index].isFavorite = true;
      }
    });
  }, [users]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheckBoxClick = (value, check) => {
    if (check) countryFilter.add(value);
    else countryFilter.delete(value);
    setCountryFilter(countryFilter);
  };

  const handleFavoritesIconClick = (email) => {
    let user = users.find((user) => user.email === email);
    if (user.hasOwnProperty("isFavorite")) {
      let index = favoriteUsers.findIndex((user) => user.email === email);
      // The user changed to unfavorite
      if (user.isFavorite) favoriteUsers.splice(index, 1);
      // The user changed to favorite
      else favoriteUsers.push(user);

      user.isFavorite = !user.isFavorite;
    } else {
      // The user is first time favorite
      favoriteUsers.push(user);
      user.isFavorite = true;
    }
    setFavoriteUsers(favoriteUsers);
    if (setUsers) setUsers(favoriteUsers);
    localStorage.setItem("my-favorite-users", JSON.stringify(favoriteUsers));
  };

  return (
    <S.UserList>
      {showCheckBox && (
        <S.Filters>
          {countries.map((country, index) => {
            return (
              <CheckBox
                key={index}
                value={country.nat}
                label={country.name}
                onChange={handleCheckBoxClick}
                isChecked={false}
              />
            );
          })}
        </S.Filters>
      )}
      <S.List>
        {users
          .filter((user) => countryFilter.has(user.nat) || countryFilter.size == 0)
          .map((user, index) => {
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper
                  isVisible={index === hoveredUserId || user.isFavorite}
                >
                  <IconButton onClick={() => handleFavoritesIconClick(user.email)}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
