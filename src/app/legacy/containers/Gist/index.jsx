import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import { useTheme } from '@emotion/react';
import Blocks from '#containers/Blocks';
import Text from '#containers/Text';
import { GridItemLarge } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import UnorderedList from '../BulletedList';

const componentsToRender = (service, script, dir, bulletPointColour) => ({
  text: props => (
    <Text
      {...props}
      componentsToRender={{
        unorderedList: innerProps => (
          <UnorderedList
            {...innerProps}
            service={service}
            script={script}
            direction={dir === 'rtl' ? 'right' : 'left'}
            bulletPointShape="square"
            bulletPointColour={bulletPointColour}
            className="mb-0 p-0 [&_ul]:p-0 [&_ul>li]:dark:text-grey-8 [&_ul>li:before]:dark:bg-grey-8 [&_ul>li:before]:dark:border-grey-8 [&_li]:text-greatPrimer [&_li]:pl-half-triple [&_li]:rtl:pr-half-triple [&_li]:rtl:pl-0 [&_li]:mb-double [&_li:last-child]:pb-double [&_li>*]:dark:text-grey-8 [&_li>*:visited]:dark:text-grey-6 group-3:[&_li]:pl-double group-3:[&_li]:rtl:pr-double group-3:[&_li]:rtl:pl-0 group-3:[&_li:last-child]:pb-quad"
          />
        ),
      }}
    />
  ),
});

const Gist = ({ blocks }) => {
  const { service, script, dir, translations } = use(ServiceContext);
  const {
    palette: { GREY_6: bulletPointColour },
  } = useTheme();
  const gistTitle = pathOr('At a glance', ['gist'], translations);
  return (
    <GridItemLarge role="region" aria-labelledby="gist-title">
      <div className={`text-grey-6 border-t-half border-t-postbox ${
        dir === 'ltr' ? 'p-triple pr-triple pl-double' : 'p-triple pl-triple pr-double'
      } mb-quad group-3:p-quad dark:bg-grey-3 bg-white`}>
        <strong className="text-doublePica font-bold inline-block pb-triple dark:text-grey-8" id="gist-title">
          {gistTitle}
        </strong>
        <Blocks
          blocks={blocks}
          componentsToRender={componentsToRender(
            service,
            script,
            dir,
            bulletPointColour,
          )}
        />
      </div>
    </GridItemLarge>
  );
};

export default Gist;
