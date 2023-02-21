import { MEDIA_QUERY_TYPOGRAPHY } from './breakpoints';

const getTypeSizes = (typographyName, importedScript) => {
  const typographyStyle = importedScript[typographyName];

  const GROUP_A_FONT_SIZE_PX = typographyStyle.groupA.fontSize;
  const GROUP_A_FONT_SIZE = `${GROUP_A_FONT_SIZE_PX / 16}rem`;
  const GROUP_A_LINE_HEIGHT_PX = typographyStyle.groupA.lineHeight;
  const GROUP_A_LINE_HEIGHT = `${GROUP_A_LINE_HEIGHT_PX / 16}rem`;

  const GROUP_B_FONT_SIZE_PX = typographyStyle.groupB.fontSize;
  const GROUP_B_FONT_SIZE = `${GROUP_B_FONT_SIZE_PX / 16}rem`;
  const GROUP_B_LINE_HEIGHT_PX = typographyStyle.groupB.lineHeight;
  const GROUP_B_LINE_HEIGHT = `${GROUP_B_LINE_HEIGHT_PX / 16}rem`;

  const GROUP_D_FONT_SIZE_PX = typographyStyle.groupD.fontSize;
  const GROUP_D_FONT_SIZE = `${GROUP_D_FONT_SIZE_PX / 16}rem`;
  const GROUP_D_LINE_HEIGHT_PX = typographyStyle.groupD.lineHeight;
  const GROUP_D_LINE_HEIGHT = `${GROUP_D_LINE_HEIGHT_PX / 16}rem`;

  return `
    font-size: ${GROUP_A_FONT_SIZE};
    line-height: ${GROUP_A_LINE_HEIGHT};

    ${MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY} {
      font-size: ${GROUP_B_FONT_SIZE};
      line-height: ${GROUP_B_LINE_HEIGHT};
    }

    ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
      font-size: ${GROUP_D_FONT_SIZE};
      line-height: ${GROUP_D_LINE_HEIGHT};
    }
  `;
};

export default getTypeSizes;
