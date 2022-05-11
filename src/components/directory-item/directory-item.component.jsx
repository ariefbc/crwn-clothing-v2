import { useNavigate } from "react-router-dom";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
  Title,
  ShopNowText,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  const navigate = useNavigate();

  const goToProductsHandler = () => {
    navigate(`/shop/${title}`);
  };

  return (
    <DirectoryItemContainer onClick={goToProductsHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <Title>{title}</Title>
        <ShopNowText>Shop Now</ShopNowText>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
