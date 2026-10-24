import { ExternalSvg } from '#app/components/icons';

const TickSvg = ({ className }: { className?: string }) => (
  <ExternalSvg
    path="images/icons/success.svg"
    className={className}
    width="4rem"
    height="4rem"
  />
);

export default TickSvg;
