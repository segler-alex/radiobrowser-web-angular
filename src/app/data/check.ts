export interface DataCheck {
  timestamp_iso8601: Date;
  source: string;
  codec: string;
  bitrate: number;
  name: string;
  tags: string;
  homepage: string;
  countrycode: string;
  description: string;
  ok: number;
  metainfo_overrides_database: number;
}
