/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import useCachedAnalyticsTracker from '#app/hooks/useCachedAnalyticsTracker';
import useNetworkStatusTracker from '#app/hooks/useNetworkStatusTracker';
import {
  VIEW_EVENT,
  CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';

const AnalyticsTestPage = () => {
  const { track, flush } = useCachedAnalyticsTracker();
  const { isOnline, networkType } = useNetworkStatusTracker();
  const [eventCount, setEventCount] = useState(0);
  const [navigatorOnline, setNavigatorOnline] = useState<string>('N/A');
  const [queueSize, setQueueSize] = useState(0);
  const [lastAction, setLastAction] = useState<string>('');

  const updateQueueSize = () => {
    if (typeof window !== 'undefined' && window.cached_analytics) {
      const queue = window.cached_analytics.getQueue();
      setQueueSize(queue?.length || 0);
    }
  };

  useEffect(() => {
    // Client-side only - avoid hydration mismatch
    if (typeof window !== 'undefined') {
      setNavigatorOnline(String(navigator.onLine));

      const updateNavigatorOnline = () => {
        setNavigatorOnline(String(navigator.onLine));
      };

      window.addEventListener('online', updateNavigatorOnline);
      window.addEventListener('offline', updateNavigatorOnline);

      // Update queue size periodically
      const interval = setInterval(updateQueueSize, 500);

      return () => {
        window.removeEventListener('online', updateNavigatorOnline);
        window.removeEventListener('offline', updateNavigatorOnline);
        clearInterval(interval);
      };
    }
    return undefined;
  }, []);

  const handleTrackView = async () => {
    setLastAction('Tracking VIEW event...');
    // eslint-disable-next-line no-console
    console.log('[TEST] Tracking VIEW event, isOnline:', isOnline);
    await track({
      eventType: VIEW_EVENT,
      eventTrackingData: {
        componentName: `test-view-${eventCount}`,
      },
    });
    setEventCount(eventCount + 1);
    updateQueueSize();
    setLastAction(isOnline ? 'VIEW event sent' : 'VIEW event queued');
    // eslint-disable-next-line no-console
    console.log(
      '[TEST] After track, check localStorage:',
      localStorage.getItem('cached_analytics_queue'),
    );
  };

  const handleTrackClick = async () => {
    setLastAction('Tracking CLICK event...');
    // eslint-disable-next-line no-console
    console.log('[TEST] Tracking CLICK event, isOnline:', isOnline);
    await track({
      eventType: CLICK_EVENT,
      eventTrackingData: {
        componentName: `test-click-${eventCount}`,
      },
    });
    setEventCount(eventCount + 1);
    updateQueueSize();
    setLastAction(isOnline ? 'CLICK event sent' : 'CLICK event queued');
    // eslint-disable-next-line no-console
    console.log(
      '[TEST] After track, check localStorage:',
      localStorage.getItem('cached_analytics_queue'),
    );
  };

  const handleFlush = async () => {
    if (!isOnline) {
      setLastAction('❌ Cannot flush: You are offline');
      return;
    }
    if (queueSize === 0) {
      setLastAction('ℹ️ Queue is empty, nothing to flush');
      return;
    }
    // eslint-disable-next-line no-console
    console.log('[TEST] Calling flush(), queue size:', queueSize);
    setLastAction(`Flushing ${queueSize} queued event(s)...`);

    try {
      await flush();
      updateQueueSize();
      // eslint-disable-next-line no-console
      console.log('[TEST] Flush completed, new queue size:', queueSize);
      setLastAction('✅ Queue flushed successfully');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[TEST] Flush failed:', error);
      setLastAction(`❌ Flush failed: ${error}`);
    }
  };

  const simulateOffline = () => {
    window.dispatchEvent(new Event('offline'));
  };

  const simulateOnline = () => {
    window.dispatchEvent(new Event('online'));
  };

  const checkDevHelpers = () => {
    // eslint-disable-next-line no-console
    console.log('=== Cached Analytics Debug ===');
    // eslint-disable-next-line no-console
    console.log(
      'window.cached_analytics available:',
      !!window.cached_analytics,
    );
    if (window.cached_analytics) {
      // eslint-disable-next-line no-console
      console.log('Queue:', window.cached_analytics.getQueue());
    }
    // eslint-disable-next-line no-console
    console.log(
      'localStorage queue:',
      localStorage.getItem('cached_analytics_queue'),
    );
    // eslint-disable-next-line no-console
    console.log('isOnline:', isOnline);
    // eslint-disable-next-line no-console
    console.log('navigator.onLine:', navigator.onLine);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Cached Analytics Tracker Test Page</h1>

      <div
        style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}
      >
        <div>
          <strong>Network Status:</strong>
          {isOnline ? ' 🟢 Online' : ' 🔴 Offline'} (navigator.onLine:{' '}
          {navigatorOnline})
        </div>
        <div>
          <strong>Network Type:</strong> {networkType || 'Unknown'}
        </div>
        <div>
          <strong>Events Tracked:</strong> {eventCount}
        </div>
        <div>
          <strong>Queue Size:</strong> {queueSize}
        </div>
        {lastAction && (
          <div style={{ marginTop: '10px', color: '#0066cc' }}>
            <strong>Status:</strong> {lastAction}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Network Simulation</h2>
        <button
          type="button"
          onClick={simulateOffline}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer',
            background: '#ff6b6b',
            color: 'white',
          }}
        >
          Simulate Offline
        </button>
        <button
          type="button"
          onClick={simulateOnline}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer',
            background: '#51cf66',
            color: 'white',
          }}
        >
          Simulate Online
        </button>
        <button
          type="button"
          onClick={checkDevHelpers}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#228be6',
            color: 'white',
          }}
        >
          Debug Info (Console)
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Analytics Actions</h2>
        <button
          type="button"
          onClick={handleTrackView}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Track VIEW Event
        </button>
        <button
          type="button"
          onClick={handleTrackClick}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Track CLICK Event
        </button>
        <button
          type="button"
          onClick={handleFlush}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#4CAF50',
            color: 'white',
          }}
        >
          Flush Queue
        </button>
      </div>

      <div style={{ padding: '10px', background: '#fff3cd' }}>
        <h3>📋 Testing Instructions:</h3>
        <ol>
          <li>Open DevTools Console to see logs</li>
          <li>
            Click &quot;Track VIEW Event&quot; while online → should send
            immediately
          </li>
          <li>
            Click &quot;Simulate Offline&quot; button (DevTools offline mode may
            not work reliably)
          </li>
          <li>
            Click &quot;Track CLICK Event&quot; → should queue in localStorage
          </li>
          <li>
            Check localStorage:{' '}
            <code>
              localStorage.getItem(&apos;cached_analytics_queue&apos;)
            </code>
          </li>
          <li>Click &quot;Simulate Online&quot; button</li>
          <li>
            Click &quot;Flush Queue&quot; or wait for auto-flush to send queued
            events
          </li>
        </ol>

        <h4>Dev Helpers (check console):</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px' }}>
          {`window.cached_analytics.getQueue()  // View queue
window.cached_analytics.clearQueue() // Clear queue
window.cached_analytics.track()      // Track event
window.cached_analytics.flush()      // Flush queue`}
        </pre>
      </div>
    </div>
  );
};

export default AnalyticsTestPage;
