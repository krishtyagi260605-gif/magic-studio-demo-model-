import * as amplitude from '@amplitude/analytics-browser'
import { isAmplitudeEnabled } from '@/config'

/**
 * Track custom event
 * @param eventName Event name
 * @param eventProperties Event properties (optional)
 */
export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  return // Disable Amplitude for Magic Studio
  if (!isAmplitudeEnabled)
    return
  amplitude.track(eventName, eventProperties)
}

/**
 * Set user ID
 * @param userId User ID
 */
export const setUserId = (userId: string) => {
  return // Disable Amplitude for Magic Studio
  if (!isAmplitudeEnabled)
    return
  amplitude.setUserId(userId)
}

/**
 * Set user properties
 * @param properties User properties
 */
export const setUserProperties = (properties: Record<string, any>) => {
  return // Disable Amplitude for Magic Studio
  if (!isAmplitudeEnabled)
    return
  const identifyEvent = new amplitude.Identify()
  Object.entries(properties).forEach(([key, value]) => {
    identifyEvent.set(key, value)
  })
  amplitude.identify(identifyEvent)
}

/**
 * Reset user (e.g., when user logs out)
 */
export const resetUser = () => {
  return // Disable Amplitude for Magic Studio
  if (!isAmplitudeEnabled)
    return
  amplitude.reset()
}
