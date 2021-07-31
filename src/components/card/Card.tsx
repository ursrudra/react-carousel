import React, { FC } from "react";
import "./Card.css";
import { IProps } from "../interfaces";
import { ReactComponent as Arrow } from "../../assets/chevron-small.svg";

const Card:FC<IProps> = ({
  modelType,
  imageUrl,
  modelName,
  bodyType,
  id,
  direction,
}): JSX.Element => (
  <article className={`card slide-${direction}`} key={id} tabIndex={0} aria-live="polite" id={id}>
    <header>
      <h6>{bodyType}</h6>
      <div className="title-container">
        <h4>{modelName}</h4> <h5>{modelType}</h5>
      </div>
    </header>
    <figure>
      <img src={imageUrl} alt={modelName} />
    </figure>
    <footer>
      <a href={`/learn/${id}`}>
        learn
        <Arrow />
      </a>
      <a href={`/shop/${id}`}>
        shop
        <Arrow />
      </a>
    </footer>
  </article>
);

export default Card;
