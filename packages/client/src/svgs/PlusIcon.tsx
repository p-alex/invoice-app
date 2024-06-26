import { SvgType } from ".";

function PlusIcon(svgProps: SvgType) {
  return (
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default PlusIcon;
