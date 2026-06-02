interface Props {
  className?: string;
}

export default function ConcentricRings({ className = "" }: Props) {
  return (
    <svg
      className={`concentric-rings-svg ${className}`}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(300,300)">
        <circle r="32"  fill="none" stroke="#c8a56a" strokeWidth="0.9" strokeOpacity="0.75"/>
        <circle r="64"  fill="none" stroke="#c8a56a" strokeWidth="0.8" strokeOpacity="0.66"/>
        <circle r="96"  fill="none" stroke="#c8a56a" strokeWidth="0.7" strokeOpacity="0.57"/>
        <circle r="128" fill="none" stroke="#c8a56a" strokeWidth="0.7" strokeOpacity="0.48"/>
        <circle r="160" fill="none" stroke="#c8a56a" strokeWidth="0.6" strokeOpacity="0.38"/>
        <circle r="192" fill="none" stroke="#c8a56a" strokeWidth="0.5" strokeOpacity="0.28"/>
        <circle r="224" fill="none" stroke="#c8a56a" strokeWidth="0.5" strokeOpacity="0.18"/>
        <circle r="256" fill="none" stroke="#c8a56a" strokeWidth="0.4" strokeOpacity="0.1"/>
        <circle r="288" fill="none" stroke="#c8a56a" strokeWidth="0.4" strokeOpacity="0.05"/>
      </g>
    </svg>
  );
}
