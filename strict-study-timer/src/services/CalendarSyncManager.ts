import type { Task } from '../types';
import { isPast } from 'date-fns';

// Placeholder Client ID - User to replace this later
const CLIENT_ID = '906164086846-o2bn749cnjgao8k7krdq789oam77p25r.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

export class CalendarSyncManager {
  private tokenClient: any;
  private gapiInited: boolean = false;
  private gisInited: boolean = false;

  constructor() {
    this.loadScripts();
  }

  private loadScripts() {
    // Load the "gapi" script for API calls
    const scriptGapi = document.createElement('script');
    scriptGapi.src = 'https://apis.google.com/js/api.js';
    scriptGapi.onload = () => this.initializeGapiClient();
    document.body.appendChild(scriptGapi);

    // Load the "gis" script for Auth
    const scriptGis = document.createElement('script');
    scriptGis.src = 'https://accounts.google.com/gsi/client';
    scriptGis.onload = () => this.initializeGisClient();
    document.body.appendChild(scriptGis);
  }

  private async initializeGapiClient() {
    await new Promise<void>((resolve) => window.gapi.load('client', resolve));
    await window.gapi.client.init({
      discoveryDocs: [DISCOVERY_DOC],
    });
    this.gapiInited = true;
  }

  private initializeGisClient() {
    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => {}, // defined at request time
    });
    this.gisInited = true;
  }

  public async sync(): Promise<Task[]> {
    if (!this.gapiInited || !this.gisInited) {
      throw new Error('Google API not initialized yet. Please wait a moment.');
    }

    return new Promise((resolve, reject) => {
      // Timeout after 10 seconds to avoid infinite loading if popup is blocked/closed
      const timeoutId = setTimeout(() => {
        reject(new Error('Auth timed out or popup closed'));
      }, 10000);

      this.tokenClient.callback = async (resp: any) => {
        clearTimeout(timeoutId);
        if (resp.error) {
          reject(resp);
          return;
        }
        try {
          const tasks = await this.fetchTodayEvents();
          resolve(tasks);
        } catch (error) {
          reject(error);
        }
      };

      // Request token (triggers popup)
      if (window.gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    });
  }

  private async fetchTodayEvents(): Promise<Task[]> {
    const today = new Date();
    const timeMin = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const timeMax = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const response = await window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': timeMin,
      'timeMax': timeMax,
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime',
    });

    const events = response.result.items;
    return this.parseAndConvert(events);
  }

  private parseAndConvert(googleEvents: any[]): Task[] {
    const tasks: Task[] = [];

    googleEvents.forEach((event: any) => {
      // Strict Logic: Ignore "All Day" events (they have no dateTime, only date)
      if (!event.start.dateTime) {
        return;
      }

      const startTime = new Date(event.start.dateTime);
      const endTime = new Date(event.end.dateTime);

      // Strict Logic: Check if time is over
      // If event ended 1 hour ago (or just in the past), status is TIME_OVER.
      // The requirement says: "If the event ended 1 hour ago... import it... as TIME OVER."
      // It also says simpler: "If an event's 'End Time' is already in the past, set... 'TIME_OVER'."
      // I will use strict past check (endTime < now).

      let status: 'ACTIVE' | 'TIME_OVER' = 'ACTIVE';
      if (isPast(endTime)) {
        status = 'TIME_OVER';
      }

      tasks.push({
        id: event.id,
        title: event.summary || 'Untitled Task',
        startTime: startTime,
        endTime: endTime,
        status: status,
      });
    });

    return tasks;
  }
}

export const calendarManager = new CalendarSyncManager();
