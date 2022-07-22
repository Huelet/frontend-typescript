export interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width, height }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={width}
      height={height}
      viewBox="0 0 400.000000 400.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
        fill="#7600ff"
        stroke="none"
      >
        <path d="M1447 2833 c-4 -3 -7 -104 -7 -224 0 -119 -3 -224 -6 -233 -9 -23 -24 -20 -68 14 -21 16 -43 27 -47 24 -5 -3 -9 -189 -9 -415 0 -349 2 -409 14 -409 8 0 17 4 21 9 7 12 64 41 80 41 10 0 13 -50 14 -206 1 -113 3 -209 5 -213 3 -4 123 -7 268 -7 l263 1 5 382 c3 210 9 385 13 390 5 4 106 10 225 13 l217 5 5 330 5 330 131 3 c101 2 134 -1 142 -11 9 -10 12 -188 12 -636 0 -342 -2 -626 -5 -631 -4 -6 -68 -10 -146 -10 l-139 0 0 224 c0 159 -3 227 -12 232 -15 9 -126 12 -140 3 -12 -7 -17 -603 -5 -615 9 -9 580 -14 595 -5 9 6 12 183 13 804 0 439 -2 801 -6 806 -3 5 -137 9 -300 10 l-296 0 -10 -26 c-6 -16 -9 -144 -7 -327 2 -166 -1 -307 -5 -313 -6 -10 -63 -13 -227 -13 -210 0 -219 -1 -225 -20 -3 -11 -10 -20 -15 -20 -10 0 -98 55 -153 96 l-42 30 -2 202 c-1 238 -9 224 125 220 l87 -3 3 -177 2 -176 53 -4 c28 -2 64 -2 80 0 l27 4 -2 262 -3 261 -261 3 c-143 1 -263 -1 -267 -5z m68 -542 c28 -16 57 -36 64 -45 10 -12 14 -73 16 -246 2 -222 1 -230 -19 -248 -32 -29 -106 -74 -117 -70 -13 4 -17 638 -4 638 6 0 33 -13 60 -29z m435 -291 c0 -17 -109 -92 -122 -84 -9 6 -11 158 -2 167 10 10 124 -67 124 -83z m-132 -369 c2 -189 -1 -246 -10 -253 -17 -10 -156 -8 -185 3 -23 8 -23 11 -23 193 l0 184 93 61 c50 33 99 59 107 58 13 -2 15 -38 18 -246z" />
        <path d="M967 2633 c-4 -3 -7 -292 -7 -641 0 -515 2 -633 13 -629 7 3 52 30 100 61 l87 56 0 511 c0 335 -4 517 -10 530 -6 11 -28 30 -48 42 -86 54 -129 77 -135 70z" />
      </g>
    </svg>
  );
};