import { Wrapper, Img, PersonName, CharacterName } from "./styled";

const PersonTile = ({ posterImage, personName, characterName }) => {
  return (
    <Wrapper>
      <Img src={posterImage} alt="obrazek" />
      <PersonName>{personName}</PersonName>
      {characterName && <CharacterName>{characterName}</CharacterName>}
    </Wrapper>
  );
};

export default PersonTile;
