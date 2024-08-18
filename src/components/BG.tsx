import type * as react from 'react';

const BG = (props: react.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1600 900'
      fill='#ffffff'
      width='1600'
      height='900'
      {...props}
    >
      <defs>
        <linearGradient
          id='a'
          x1='0'
          x2='0'
          y1='1'
          y2='0'
          gradientTransform='rotate(91,0.5,0.5)'
        >
          <stop offset='0' stopColor='#0FF' />
          <stop offset='1' stopColor='#CF6' />
        </linearGradient>
        <linearGradient
          id='b'
          x1='0'
          x2='0'
          y1='0'
          y2='1'
          gradientTransform='rotate(158,0.5,0.5)'
        >
          <stop offset='0' stopColor='#F00' />
          <stop offset='1' stopColor='#FC0' />
        </linearGradient>
      </defs>
      <g fill='#FFF' fillOpacity='0' strokeMiterlimit='10'>
        <g stroke='url(#a)' strokeWidth='3.3'>
          <path
            transform='translate(-179.2 32) rotate(17.6 1409 581) scale(1.043392)'
            d='M1409 581 1450.35 511 1490 581z'
          />
          <circle
            strokeWidth='1.1'
            transform='translate(-136 112) rotate(25.6 800 450) scale(1.039616)'
            cx='500'
            cy='100'
            r='40'
          />
          <path
            transform='translate(75.2 -264) rotate(248 401 736) scale(1.039616)'
            d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'
          />
        </g>
        <g stroke='url(#b)' strokeWidth='1'>
          <path
            transform='translate(672 -28.799999999999997) rotate(7.199999999999999 150 345) scale(0.9184640000000001)'
            d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'
          />
          <rect
            strokeWidth='2.2'
            transform='translate(-360 -288) rotate(288 1089 759)'
            x='1039'
            y='709'
            width='100'
            height='100'
          />
          <path
            transform='translate(-582.4 185.6) rotate(48 1400 132) scale(0.92)'
            d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'
          />
        </g>
      </g>
    </svg>
  );
};

export default BG;
