// biome-ignore-all lint/a11y/useValidAriaRole: we want this
import { use } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BylineCss from './index.styles';
import Text from '../../Text';
import Image from '../../Image';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import { RightChevron, LeftChevron } from '../../icons';

const Comma = () => {
  return <span aria-hidden="true" css={BylineCss.comma} />;
};

const And = ({ andTranslation }) => {
  return (
    <span aria-hidden="true">
      <Text css={BylineCss.and}>{` ${andTranslation} `}</Text>
    </span>
  );
};

const AuthorImage = ({ authorImage }) => {
  return (
    <Image
      css={BylineCss.imageSrc}
      src={authorImage}
      alt=""
      placeholder={false}
      aspectRatio={[1, 1]}
    />
  );
};

const AuthorTopicUrl = ({
  author,
  authorName,
  authorTopicUrl,
  isSingleContributor,
  isRtl,
}) => {
  return (
    <>
      <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
      <a
        css={[
          BylineCss.link,
          isSingleContributor
            ? BylineCss.linkSingleContributor
            : BylineCss.linkMultipleContributor,
        ]}
        href={authorTopicUrl}
        className="focusIndicatorReducedWidth"
      >
        <Text
          className="byline-link"
          size="bodyCopy"
          fontVariant="sansBold"
          css={[
            BylineCss.author,
            isSingleContributor && BylineCss.authorSingleContributor,
          ]}
        >
          {authorName}
        </Text>
        {isSingleContributor &&
          (isRtl ? (
            <LeftChevron
              className="byline-link"
              css={BylineCss.authorChevron}
            />
          ) : (
            <RightChevron
              className="byline-link"
              css={BylineCss.authorChevron}
            />
          ))}
      </a>
    </>
  );
};

const AuthorName = ({ author, authorName, isSingleContributor }) => {
  return (
    <span role="text">
      <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
      <Text
        css={[
          BylineCss.author,
          isSingleContributor && BylineCss.authorSingleContributor,
        ]}
        fontVariant="sansBold"
        size="bodyCopy"
      >
        {authorName}
      </Text>
    </span>
  );
};

const AuthorRole = ({ jobRole, isSingleContributor, role }) => {
  return (
    <span role="text">
      <VisuallyHiddenText>{`${role}, `} </VisuallyHiddenText>
      <Text
        css={BylineCss.jobRole}
        {...(isSingleContributor ? { size: 'brevier' } : { size: 'bodyCopy' })}
      >
        {jobRole}
      </Text>
    </span>
  );
};

const AuthorLocation = ({ location, reportingFrom, isSingleContributor }) => {
  return (
    <span role="text">
      <VisuallyHiddenText>{`${reportingFrom}, `} </VisuallyHiddenText>
      <Text
        css={[BylineCss.locationText]}
        {...(isSingleContributor ? { size: 'brevier' } : { size: 'bodyCopy' })}
      >
        {location}
      </Text>
    </span>
  );
};

const ArticleContributors = ({ contributorValues, isSingleContributor }) => {
  const { translations, dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const {
    byline: {
      author = 'Author',
      reportingFrom = 'Reporting from',
      role = 'Role',
    } = {},
    and = 'and',
  } = translations ?? {};

  const hasMultipleContributors = !isSingleContributor;

  const lastContributorIndex = contributorValues.length - 1;

  const isLastContributorNameOnly = (index, jobRole, location) => {
    return index === lastContributorIndex && !jobRole && !location;
  };

  return (
    <>
      {contributorValues.map((contributor, index) => {
        if (!contributor) return null;

        const { authorName, jobRole, authorImage, location, authorTopicUrl } =
          contributor;

        return (
          <ul
            css={[
              BylineCss.list,
              hasMultipleContributors && BylineCss.contributorTextWrapper,
            ]}
            role="list"
            key={authorName}
          >
            {index === lastContributorIndex && !isSingleContributor && (
              <And andTranslation={and} />
            )}
            {authorImage && isSingleContributor && (
              <li css={[BylineCss.imageWrapper]}>
                <AuthorImage authorImage={authorImage} />
              </li>
            )}
            <li
              css={hasMultipleContributors && BylineCss.contributorTextWrapper}
            >
              {authorTopicUrl ? (
                <AuthorTopicUrl
                  author={author}
                  authorName={authorName}
                  authorTopicUrl={authorTopicUrl}
                  isSingleContributor={isSingleContributor}
                  isRtl={isRtl}
                />
              ) : (
                <AuthorName
                  author={author}
                  authorName={authorName}
                  isSingleContributor={isSingleContributor}
                />
              )}
              {hasMultipleContributors &&
                !isLastContributorNameOnly(index, jobRole, location) && (
                  <Comma />
                )}
            </li>
            {jobRole && (
              <li css={BylineCss.contributorTextWrapper}>
                <AuthorRole
                  jobRole={jobRole}
                  role={role}
                  isSingleContributor={isSingleContributor}
                />
                {(location && <Comma />) ||
                  (hasMultipleContributors &&
                    index !== lastContributorIndex &&
                    index !== lastContributorIndex - 1 && <Comma />)}
              </li>
            )}
            {location && (
              <li css={BylineCss.contributorTextWrapper}>
                <AuthorLocation
                  location={location}
                  reportingFrom={reportingFrom}
                  isSingleContributor={isSingleContributor}
                />
                {hasMultipleContributors &&
                  index !== lastContributorIndex &&
                  index !== lastContributorIndex - 1 && <Comma />}
              </li>
            )}
          </ul>
        );
      })}
    </>
  );
};

export default ArticleContributors;
