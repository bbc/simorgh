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
    summary: string;
    shortSynopsis: string;
    mediumSynopsis?: string;
    longSynopsis?: string;
    brandShortSynopsis?: string;
    brandMediumSynopsis?: string;
    brandLongSynopsis?: string;
    masterBrand: string;
    episodeId: string;
    releaseDateTimeStamp: number;
    imageUrl: string;
    imageAltText: string;
    promoBrandTitle?: string | null;
    promoSeriesTitle?: string | null;
    durationISO8601: string;
    thumbnailImageUrl: string;
    radioScheduleData?: RadioScheduleData[];
    recentEpisodes: [];
    brandId: string;
    episodeTitle: string;
    externalLinks: Array<{
      linkText: string;
      linkUrl: string;
      linkType: string;
    }>;
    contentType: ContentType;
  };
  mediaIsAvailable?: boolean;
  MediaError: Component;
}
