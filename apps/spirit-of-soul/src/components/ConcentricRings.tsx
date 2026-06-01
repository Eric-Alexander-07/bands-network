interface Props {
  id: string;
  className?: string;
}

export default function ConcentricRings({ id, className = "" }: Props) {
  return (
    <svg
      className={`concentric-rings-svg ${className}`}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`rf-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="15%" stopColor="#f6f4f0" stopOpacity="0" />
          <stop offset="100%" stopColor="#f6f4f0" stopOpacity="1" />
        </radialGradient>
      </defs>
      <g transform="translate(300,300)">
        <circle r="32"  fill="none" stroke="#b89a7a" strokeWidth="0.8" strokeOpacity="0.72"/>
        <circle r="64"  fill="none" stroke="#b89a7a" strokeWidth="0.7" strokeOpacity="0.64"/>
        <circle r="96"  fill="none" stroke="#b89a7a" strokeWidth="0.7" strokeOpacity="0.56"/>
        <circle r="128" fill="none" stroke="#b89a7a" strokeWidth="0.6" strokeOpacity="0.48"/>
        <circle r="160" fill="none" stroke="#b89a7a" strokeWidth="0.6" strokeOpacity="0.4"/>
        <circle r="192" fill="none" stroke="#b89a7a" strokeWidth="0.5" strokeOpacity="0.3"/>
        <circle r="224" fill="none" stroke="#b89a7a" strokeWidth="0.5" strokeOpacity="0.2"/>
        <circle r="256" fill="none" stroke="#b89a7a" strokeWidth="0.5" strokeOpacity="0.12"/>
        <circle r="288" fill="none" stroke="#b89a7a" strokeWidth="0.4" strokeOpacity="0.06"/>
      </g>
      <rect width="100%" height="100%" fill={`url(#rf-${id})`} />
    </svg>
  );
}
