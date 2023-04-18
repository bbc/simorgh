/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../icons';
import Text from '../Text';

interface CtaLinkProps {
  href?: string;
  className?: string;
  linkText?: string;
}

const CtaLink = ({ href, linkText, className }: CtaLinkProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';
  return (
    <a href={href} className={className}>
      <div>
        <Text size="pica" fontVariant="sansBold">
          {linkText}
          {isRtl ? <LeftChevron /> : <RightChevron />}
        </Text>
      </div>
    </a>
  );
};

export default CtaLink;
