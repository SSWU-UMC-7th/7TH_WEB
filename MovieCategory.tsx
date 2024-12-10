import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CategoryItemProps {
  imageUrl: string;
}

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const CategoryItem = styled(Link)<CategoryItemProps>`
  position: relative;
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;

  .label {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
`;

const MovieCategory: React.FC = () => {
  return (
    <div>
      <CategoryGrid>
        <CategoryItem
          to="/movies/now-playing"
          imageUrl="https://cdn.pixabay.com/photo/2021/02/03/16/15/disneyland-5978455_1280.jpg"
        >
          <div className="label">현재 상영중인</div>
        </CategoryItem>
        <CategoryItem
          to="/movies/popular"
          imageUrl="https://cdn.pixabay.com/photo/2017/06/22/19/50/disneyland-2432258_1280.jpg"
        >
          <div className="label">인기있는</div>
        </CategoryItem>
        <CategoryItem
          to="/movies/top-rated"
          imageUrl="https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png"
        >
          <div className="label">높은 평가를 받은</div>
        </CategoryItem>
        <CategoryItem
          to="/movies/up-coming"
          imageUrl="https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg"
        >
          <div className="label">개봉 예정중인</div>
        </CategoryItem>
      </CategoryGrid>
    </div>
  );
};

export default MovieCategory;
