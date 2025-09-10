/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { useState, useEffect, use } from 'react';
import { jsx } from '@emotion/react';
import useIsPWA from '../../hooks/useIsPWA';
import { RequestContext } from '../../contexts/RequestContext';
import styles from './index.styles';

const NotificationPermission = () => {
  const [permissionState, setPermissionState] = useState<string>('default');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isMobilePlatform, setIsMobilePlatform] = useState<boolean>(false);
  const isPWA = useIsPWA();
  const { isAmp } = use(RequestContext);

  // Detect if user is on Android or iOS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      setIsMobilePlatform(isAndroid || isIOS);
    }
  }, []);

  // Helper function to convert base64 to Uint8Array for VAPID key
  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(new ArrayBuffer(rawData.length));

    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Check if the user is already subscribed to push notifications
  const checkSubscriptionStatus = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      // Silent fail - just means we can't check subscription status
    }
  };

  // Check if notifications are supported and get current permission state
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && !isAmp) {
      setPermissionState(Notification.permission);
      checkSubscriptionStatus();
    }
  }, [isAmp]);

  // Helper function to send a test notification (for development only)
  const sendTestNotification = () => {
    if (!('Notification' in window)) return;

    // Get the current service from the URL path
    const service = window.location.pathname.split('/')[1] || 'news';

    const notification = new Notification('Test Notification', {
      body: 'This is a test notification from your PWA',
      icon: `/${service}/images/icons/icon-192x192.png`,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  };

  // Note: Server-side subscription handling is not implemented
  // This would typically send the subscription to a backend service

  // Register for push notifications
  const registerPushSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // In a real implementation, you would fetch this from your server
      // For now, we'll use a placeholder
      const publicVapidKey =
        'BLVYfB5S8-34JmFr9I2NQ2IUzGs6qRxFSQ-wgWS2_lmHkx1iQzCFLwOaOYpKBIxuIbQ_D1JkG0K9-ZKsBMzKBYs';

      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          publicVapidKey,
        ) as unknown as ArrayBuffer,
      });

      // Subscription successful
      setIsSubscribed(true);

      // Note: In a production app, you would send the subscription to your server
    } catch (error) {
      // Silent fail - push subscription failed
    }
  };

  // Request notification permission and register for push
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);

      if (permission === 'granted') {
        await registerPushSubscription();

        // Track last visit time for inactivity detection
        localStorage.setItem('lastVisitTime', new Date().getTime().toString());
        localStorage.setItem('notificationEnabled', 'true');

        // For testing: Send a test notification immediately
        if (process.env.NODE_ENV === 'development') {
          sendTestNotification();
        }
      }
    } catch (error) {
      // Silent fail - user probably dismissed the permission prompt
    }
  };

  // Only show the notification permission button if:
  // 1. We're in a PWA on Android or iOS (not in regular browser)
  // 2. Notifications are supported
  // 3. Permission is not already granted
  // 4. User is not already subscribed
  // 5. Not in AMP mode
  if (
    !isPWA ||
    !isMobilePlatform ||
    isAmp ||
    (permissionState === 'granted' && isSubscribed)
  ) {
    return null;
  }

  return (
    <div css={styles.container}>
      {permissionState !== 'granted' && (
        <button
          type="button"
          css={styles.button}
          onClick={requestPermission}
          aria-label="Enable notifications"
        >
          Enable notifications
        </button>
      )}
    </div>
  );
};

export default NotificationPermission;
