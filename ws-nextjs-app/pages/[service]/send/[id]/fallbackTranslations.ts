import { UgcTranslations } from '#app/models/types/translations';

const fallbackTranslations: UgcTranslations = {
  // No JavaScript
  noJsHeading: 'Sorry, this page cannot be loaded.',
  noJsDescription:
    'To load this page, please enable JavaScript, or try a different browser',

  // Optional
  optional: 'optional',

  // File upload
  fileUploadLiveRegionText: `Update, Here's what you're sending: `,
  fileUploadLiveRegionUpdateText: 'Update, removed ',
  fileUploadButton: 'Choose a file',
  fileUploadListHeading: `Here's what you're sending:`,
  fileUploadRemoveButton: 'Remove',

  // Submit button
  submitButton: 'Submit',

  // Validation
  errorSummary: 'There’s a problem, please check your:',
  validationRequired: `There's something missing.`,
  validationInvalidEmail: `That doesn't look right. Please enter a proper email address.`,
  validationInvalidTelephone: 'NEEDS IMPLEMENTATION',
  validationFilesNotEnough: `There aren't enough files. Please add at least {{minFiles}}`,
  validationFilesTooMany: `There are too many files. You can add {{maxFiles}}.`,
  validationFilesInvalidType: `Sorry, we can't use this type of file. Please add {{fileTypes}}.`,
  validationFilesTooSmall: 'This file is broken. Try picking another.',
  validationFilesSizeExceeded:
    'Sorry, these files are too big. You can only upload up to 1.2 GB at a time.',
  validationWordLimit: 'Maximum {{wordLimit}} words',

  // Messaging
  referenceNumber: 'Reference number',
  submissionInfoSignedOutMessage:
    'You may wish to make a note of these details for your reference.',
  retentionPeriodDays: `We'll keep your submission for up to {{days}} days – and if we don't use it we'll then delete it and any other information you sent us.`,
  privacyInfoHtml: `Don't worry, we protect your information — read the {{privacyInfoLink}} for more details.`,
  emailToHtml: `If you change your mind and don't want us to use it, just email us at {{emailLink}}. Don't forget the reference number.`,
  removalGuidelineText: `If you submitted something for a programme or online, we won't be able to remove it once we use it.`,

  // Form Screen
  dataPolicyHeading: 'Our data policy',

  // Uploading Screen
  uploadingHeading: 'Uploading',
  uploadingDescription: 'Please wait until it is finished.',

  // Success Screen
  successHeading: 'Message sent',
  successDescription: 'Thanks for getting in touch.',
  privacyPolicyLinkHref: 'https://www.bbc.com/privacy/',
  privacyPolicyLinkText: 'Privacy Policy',

  // Error Screen
  errorHeading: 'Sorry, your message could not be sent.',
  errorDescription: 'Please try again later.',

  // Closed Screen
  closedHeading: 'This is now closed',
  closedDescription: 'This closed on {{date}}.',
};

export default fallbackTranslations;
