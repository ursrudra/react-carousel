import React, { useState, useEffect, FC } from "react";
import "./Carousel.css";
import Card from "../card/Card";
import { IDataProps, IProps } from "../interfaces";
import { ReactComponent as NextIcon } from "../../assets/chevron-circled.svg";
import FilterBar from "../filter-bar/FilterBar";
import useMedia from "../../hooks/useMedia";

const TRACK_LENGTH = {
  desktop: 4,
  mobile: 2,
};

const Carousel:FC<IDataProps> = ({ data }):JSX.Element => {
  const [slideStart, setSlideStart] = useState<number>(0);
  const [slideEnd, setSlideEnd] = useState<number>(TRACK_LENGTH.desktop);
  const [currentItems, setCurrentItems] = useState<Array<IProps>>([]);
  const [filter, setFilter] = useState<string>('');
  const isMatch = useMedia("(max-width: 768px)");
  const [isLastItem, setIsLastItem] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("left");

  useEffect(() => {
    const items = data.slice(slideStart, slideEnd);
    setCurrentItems(items);
  }, [slideStart, slideEnd, data]);

  useEffect(() => {
    if (isMatch) {
      setSlideStart(0);
      setSlideEnd(TRACK_LENGTH.mobile);
    } else {
      setSlideStart(0);
      setSlideEnd(TRACK_LENGTH.desktop);
    }
  }, [isMatch]);

  const handleGoToNext = (trackLength: number) => {
    setSlideStart((slideStart) => slideStart + trackLength);
    setSlideEnd((slideEnd) => slideEnd + trackLength);
    setFilter('');
    setDirection("left");
  };

  const handleGoToPrev = (trackLength: number) => {
    setSlideStart((slideStart) => slideStart - trackLength);
    setSlideEnd((slideEnd) => slideEnd - trackLength);
    setFilter('');
    setDirection("right");
  };

  const handleClick = (index: number) => {
    if (index + 1 >= data.length) {
      setSlideStart(index - 1);
      setSlideEnd(index + 1);
      setIsLastItem(true);
    } else {
      setSlideStart(index);
      setSlideEnd(index + 2);
      setIsLastItem(false);
    }
    if (index <= slideStart) {
      setDirection("right");
    } else {
      setDirection("left");
    }
    setFilter('')
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const filterData = currentItems
    ? Array.from(new Set(currentItems.map((item) => item.bodyType)))
    : [];

  return (
    <section className="carousel">
      <FilterBar filters={filterData} handleFilter={handleFilter} selected={filter}/>

      <div
        className={
          isMatch
            ? isLastItem
              ? "carousel__items carousel__items-offset"
              : "carousel__items"
            : "carousel__items"
        }
      >
        {currentItems
          .filter((item) => !filter || item.bodyType === filter)
          .map((item) => (
            <Card
              {...item}
              key={item.id}
              filter={filter}
              direction={direction}
            />
          ))}
      </div>

      {isMatch ? (
        <div className="carousel__controls-mobile">
          <div className="dots" tabIndex={0} role="list">
            {data.map((item, index) => (
              <button 
                aria-labelledby={item.id}
                onClick={() => handleClick(index)}
                key={index}
                className={
                  (
                    isLastItem
                      ? index + 1 === data.length
                      : slideStart === index
                  )
                    ? "dot active"
                    : 'dot'
                }
              ></button>
            ))}
          </div>
        </div>
      ) : (
        <div className="carousel__controls">
          <button
            aria-label="Go to Previous"
            onClick={() => handleGoToPrev(4)}
            disabled={slideStart === 0}
            className="carousel__controls-prev"
          >
            <NextIcon />
          </button>
          <button
            aria-label="Go to Next"
            onClick={() => handleGoToNext(4)}
            disabled={slideEnd >= data.length}
          >
            <NextIcon />
          </button>
        </div>
      )}
    </section>
  );
};

export default Carousel