import React, { memo } from "react";
import "./card.css"; 
import { AiOutlineArrowRight, AiFillHeart } from "react-icons/ai";

function Card({ characterData }) {
  var cardData = characterData.data;

  return (
    <div>
      {cardData && cardData.length > 0 ? (
        cardData.map((item) => (
          <div key={item.mal_id} className="CharacterCard">
            <img
              src={item.images.webp.image_url}
              className="Image"
              alt="Character_Img"
            />

            <div className="CardHeader">
              <h3>{item.name}</h3>
              <div>
                {item.nicknames.map((nick, index) => (
                  <span className="Nickname" key={index}>
                    {nick}
                  </span>
                ))}
              </div>
            </div>

            <div className="Favorite">
              <AiFillHeart style={{ color: "blue" }} /> 
              <div style={{ marginLeft: "10px" }}>{item.favorites}</div>
            </div>
            <a href={item.url} className="ArrowIcon">
              <AiOutlineArrowRight />
            </a>
          </div>
        ))
      ) : (
        <div className="NotFoundPage">No data found</div>
      )}
    </div>
  );
}

export default memo(Card);
