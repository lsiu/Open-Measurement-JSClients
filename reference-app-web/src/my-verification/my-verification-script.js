// Import or bundle the OMID verification client library
// In this bundled approach, we'll access the global from the built client
import { AdEventType } from './constants.js';

/**
 * My Verification Script class
 */
class CustomVerificationScript {
  /**
   *
   */
    constructor(verificationClient, vendorKey, messageLogServer) {
        /** @private {VerificationClient} */
        this.verificationClient_ = verificationClient;
        this.messageLogServer = messageLogServer;
        const isSupported = this.verificationClient_.isSupported();
        this.logMessage_('OmidSupported[' + isSupported + ']');
        if (isSupported) {
            this.verificationClient_.registerSessionObserver((event) => this.sessionObserverCallback_(event), vendorKey);
            Object.keys(AdEventType)
                .filter(
                    (el) => AdEventType[el] !== AdEventType.MEDIA &&
                    AdEventType[el] !== AdEventType.VIDEO)
                .forEach(
                    (el) => {
                        console.log('register event: ', el, AdEventType[el])
                        this.verificationClient_.addEventListener(
                            AdEventType[el],
                            (event) => this.omidEventListenerCallback_(event))
                    }
                );
        }
    }
    /**
     * Callback for addEventListener.
     * Sending event logs to the server
     * @param {Object} event data
     */
    omidEventListenerCallback_(event) {
        // event = removeDomElements(event);
        // this.logMessage_(event, event.timestamp);
        console.log('Omid Event:', event);
    }

    /**
     * Callback for registerSessionObserver.
     * Sending session logs to the server
     * @param {Object} event data
     */
    sessionObserverCallback_(event) {
        // event = removeDomElements(event);
        this.logMessage_('SessionCallbackEvent', event);
    }

    /**
     *
     * @param {*} msg
     */
    logMessage_(msg) {
        console.log(msg);
    }
}

// Instantiate the script when loaded into the environment
VerificationClient = require('../../../bin/omid-verification-client-v1.js').OmidVerificationClient;
new CustomVerificationScript(new VerificationClient(), 'iabtechlab.com-omid');
