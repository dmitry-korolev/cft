import React from 'react'

import {
  LoaderAngle,
  LoaderInnerSquare,
  LoaderOuterSquare,
  LoaderSVG
} from 'components/Loader/Loader.s'

export const Loader = () => (
  <LoaderSVG
    width='1000'
    height='1000'
    viewBox='0 0 1000 1000'
    xmlns='http://www.w3.org/2000/svg'
    version='1.1'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <g transform='translate(500,500)'>
      <LoaderOuterSquare
        className='rotate-45 rotate-back'
        x={ -5 }
        y={ -5 }
        width={ 10 }
        height={ 10 }
        stroke='black'
        strokeWidth={ 20 }
        fill='none'
      />
      <LoaderInnerSquare
        className='rotate-45 rotate'
        x={ -50 }
        y={ -50 }
        width={ 100 }
        height={ 100 }
        stroke='black'
        strokeWidth={ 20 }
        strokeLinejoin='bevel'
        fill='none'
      />
      <g transform='translate(-50,0) rotate(-45)'>
        <LoaderAngle
          className='left'
          points='40,-40 50,-50 -40,-50 -50,-40 -50,50 -40,40'
          stroke='black'
          strokeWidth={ 20 }
          fill='none'
        />
      </g>
      <g transform='translate(50,0) rotate(135)'>
        <LoaderAngle
          className='right'
          points='40,-40 50,-50 -40,-50 -50,-40 -50,50 -40,40'
          stroke='black'
          strokeWidth={ 20 }
          fill='none'
        />
      </g>
      <text y={ -140 } textAnchor='middle' fontWeight='bold' fontSize='3em' fontFamily='sans-serif'>
        loading...
      </text>
    </g>
  </LoaderSVG>
)
