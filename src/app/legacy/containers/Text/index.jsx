import React, { useState } from 'react';
import paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const shareButtonStyle = {
  position: 'fixed',
  cursor: 'pointer',
  background: '#b80000', // BBC Postbox red
  border: 'none',
  borderRadius: '50%',
  padding: '8px',
  zIndex: 9999,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};

const TextContainer = ({
  blocks,
  componentsToRender = {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
}) => {
  const [shareLink, setShareLink] = useState('');
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  const [copied, setCopied] = useState(false);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setIconPosition({
        top: rect.top - 40, // 40px above selection
        left: rect.left + rect.width, // to the right of selection
      });
      const encodedText = encodeURIComponent(selectedText);
      const baseUrl = window.location.href.split('#')[0];
      const fragment = `#:~:text=${encodedText}`;
      const fullUrl = `${baseUrl}${fragment}`;
      setShareLink(fullUrl);
    }
  };

  const copyToClipboard = () => {
    if (!shareLink) return;
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = shareLink;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          // Optionally show a notification for failure
        }
        document.body.removeChild(textArea);
      });
  };

  if (!blocks) return null;

  return (
    <div onMouseUp={handleMouseUp}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      {shareLink && !copied && (
        <button
          type="button"
          onClick={copyToClipboard}
          style={{
            ...shareButtonStyle,
            top: iconPosition.top,
            left: iconPosition.left,
          }}
          aria-label="Copy share link to clipboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            fill="#fff"
            style={{ display: 'block' }}
          >
            <path d="M7.8 17 25.3 7l-1.2-2.3L6.6 15zm-1.2 0 17.5 10.3 1.2-2.3L7.8 15zm5.6-1c0-2.7-2.2-5-5-5-2.7 0-4.9 2.2-4.9 5 0 2.7 2.2 4.9 4.9 4.9 2.8 0 5-2.2 5-4.9M29.7 5.9c0-2.7-2.2-5-5-5-2.7 0-4.9 2.2-4.9 5 0 2.7 2.2 4.9 4.9 4.9 2.8 0 5-2.2 5-4.9m0 20.2c0-2.7-2.2-5-5-5-2.7 0-4.9 2.2-4.9 5 0 2.7 2.2 4.9 4.9 4.9 2.8.1 5-2.2 5-4.9" />
          </svg>
        </button>
      )}
      {shareLink && copied && (
        <div
          style={{
            position: 'fixed',
            top: iconPosition.top,
            left: iconPosition.left,
            background: '#fff',
            color: '#b80000',
            padding: '8px 16px',
            borderRadius: '8px',
            zIndex: 9999,
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          Link copied
        </div>
      )}
    </div>
  );
};

export default TextContainer;
