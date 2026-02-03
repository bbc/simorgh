import { ATIData } from '#app/components/ATIAnalytics/types';
import { ContentType } from '#app/components/ChartbeatAnalytics/types';
import { PageTypes } from '#app/models/types/global';
import {
  OnDemandAudioBlock,
  EpisodeAvailability,
} from '#app/models/types/media';
import { RadioScheduleData } from '#app/models/types/radioSchedule';
import { Component } from 'react';

export interface OnDemandAudioProps {
  pageData: {
    mediaBlocks: OnDemandAudioBlock[];
    metadata: {
      type: PageTypes;
      atiAnalytics?: ATIData;
    };
    episodeAvailability: EpisodeAvailability;
    isPodcast: boolean;
    language: string;
    brandTitle: string;
    headline: string;
    summary?: string;
    shortSynopsis: string;
    masterBrand: string;
    episodeId: string;
    releaseDateTimeStamp: number;
    imageUrl: string;
    imageAltText: string;
    promoBrandTitle: string;
    durationISO8601: string;
    thumbnailImageUrl: string;
    radioScheduleData?: RadioScheduleData[];
    recentEpisodes: [];
    brandId: string;
    episodeTitle: string;
    externalLinks: string[];
    contentType: ContentType;
  };
  mediaIsAvailable?: boolean;
  MediaError: Component;
}
