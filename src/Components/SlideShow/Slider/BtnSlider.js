import React from 'react';
import leftArrow from './icons/left-arrow.svg';
import rightArrow from './icons/right-arrow.svg';

export default function BtnSlider({ moveSlide, direction }) {
    return (
        <button type="button" className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'} onClick={moveSlide}>
            <img src={direction === 'next' ? rightArrow : leftArrow} alt="icône flèche" />
        </button>
    );
}
