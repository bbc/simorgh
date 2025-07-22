import React, { useState } from 'react';
import { POSTBOX } from '../../../components/ThemeProvider/palette';
import paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const shareButtonStyle = {
  position: 'fixed',
  cursor: 'pointer',
  background: POSTBOX,
  border: 'none',
  borderRadius: '50%',
  padding: '8px',
  zIndex: 9999,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};

// 👇 Arrow function style
const snapRangeToWordBoundaries = range => {
  const isTextNode = node =>
    node &&
    node.nodeType === Node.TEXT_NODE &&
    typeof node.textContent === 'string';

  if (!isTextNode(range.startContainer) || !isTextNode(range.endContainer)) {
    return;
  }

  const startText = range.startContainer.textContent;
  const endText = range.endContainer.textContent;

  let start = range.startOffset;
  while (start > 0 && /\w/.test(startText[start - 1])) {
    start -= 1;
  }

  let end = range.endOffset;
  while (end < endText.length && /\w/.test(endText[end])) {
    end += 1;
  }

  range.setStart(range.startContainer, start);
  range.setEnd(range.endContainer, end);
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
    const rawText = selection?.toString().trim();

    if (!rawText || selection.rangeCount === 0) {
      setShareLink('');
      return;
    }

    const range = selection.getRangeAt(0);

    // 👇 Snap selection to full words
    snapRangeToWordBoundaries(range);

    // Update user selection
    selection.removeAllRanges();
    selection.addRange(range);

    const selectedText = selection.toString().trim();

    if (!selectedText || selectedText.length < 1) {
      setShareLink('');
      return;
    }

    const rect = range.getBoundingClientRect();
    setIconPosition({
      top: rect.top - 50,
      left: Math.max(rect.left + rect.width - 120, 50),
    });

    const textArray = selectedText.split(' ');
    const startText = textArray.slice(0, 2).join(' ');
    const endText = textArray.slice(-2).join(' ');
    const encodedStart = encodeURIComponent(startText);
    const encodedEnd = encodeURIComponent(endText);
    const baseUrl = window.location.href.split('#')[0];
    const outputText =
      textArray.length > 4
        ? `${encodedStart},${encodedEnd}`
        : `${encodedStart}`;
    const fragment = `#:~:text=${outputText}`;
    const fullUrl = `${baseUrl}${fragment}`;
    setShareLink(fullUrl);
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

  React.useEffect(() => {
    const handleScroll = () => {
      setShareLink('');
      setCopied(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!blocks) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
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
          aria-label="link copied to clipboard"
        >
          Link copied
        </div>
      )}
    </div>
  );
};

export default TextContainer;
