(() => {
  const script = document.currentScript;
  const banner = document.getElementById('analytics-consent');
  const key = 'rumo-pragas-analytics-consent-v1';
  const metaId = script?.dataset.metaId || '';
  const gaId = script?.dataset.gaId || '';
  let loaded = false;
  let settingsTrigger = null;

  const readChoice = () => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const saveChoice = (value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // The choice still applies for this page view when storage is unavailable.
    }
  };

  const grantAnalytics = () => {
    window.fbq?.('consent', 'grant');
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
  };

  const loadAnalytics = () => {
    if (loaded) {
      grantAnalytics();
      return;
    }
    loaded = true;
    let metaScript;
    let gaScript;

    if (metaId) {
      const fbq = (...args) => {
        fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
      };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = '2.0';
      window.fbq = window.fbq || fbq;

      metaScript = document.createElement('script');
      metaScript.async = true;
      metaScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      window.fbq('init', metaId);
    }

    if (gaId.startsWith('G-')) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    }

    grantAnalytics();
    window.fbq?.('track', 'PageView');
    if (gaScript) {
      window.gtag('js', new Date());
      window.gtag('config', gaId, { anonymize_ip: true, send_page_view: true });
    }
    if (metaScript) document.head.appendChild(metaScript);
    if (gaScript) document.head.appendChild(gaScript);
  };

  const revokeAnalytics = () => {
    window.fbq?.('consent', 'revoke');
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  };

  const setBanner = (visible) => {
    if (banner) banner.hidden = !visible;
    if (!visible && settingsTrigger) {
      const trigger = settingsTrigger;
      settingsTrigger = null;
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    }
  };

  const applyChoice = (choice) => {
    if (choice === 'granted') loadAnalytics();
    else revokeAnalytics();
    setBanner(false);
  };

  document.addEventListener('click', (event) => {
    const choiceButton = event.target.closest('[data-consent-choice]');
    if (choiceButton) {
      const choice = choiceButton.dataset.consentChoice === 'accept' ? 'granted' : 'denied';
      saveChoice(choice);
      applyChoice(choice);
      return;
    }

    const settingsButton = event.target.closest('[data-consent-settings]');
    if (settingsButton) {
      settingsTrigger = settingsButton;
      setBanner(true);
      banner?.querySelector('[data-consent-choice]')?.focus();
      return;
    }

    const storeLink = event.target.closest('[data-store-link]');
    if (!storeLink || readChoice() !== 'granted') return;
    const store = storeLink.dataset.storeLink;
    window.fbq?.('trackCustom', 'StoreOutboundClick', { store });
    window.gtag?.('event', 'store_outbound_click', { store });
  });

  const choice = readChoice();
  if (choice) applyChoice(choice);
  else setBanner(true);
})();
