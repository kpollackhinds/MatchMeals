import { CurrencyCode } from "@/constants/CurrencyEnum";

interface Place {
  id?: string;
  types?: string[];
  nationalPhoneNumber?: string;
  formattedAddress?: string;
  rating?: number;
  googleMapsUri?: string;
  websiteUri?: string;
  businessStatus?: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY" | "BUSINESS_STATUS_UNSPECIFIED";
  priceLevel?:
    | "PRICE_LEVEL_UNSPECIFIED"
    | "PRICE_LEVEL_FREE"
    | "PRICE_LEVEL_INEXPENSIVE"
    | "PRICE_LEVEL_MODERATE"
    | "PRICE_LEVEL_EXPENSIVE"
    | "PRICE_LEVEL_VERY_EXPENSIVE";
  userRatingsCount?: number;
  displayName?: LocalizedText;
  primaryTypeDisplayName?: LocalizedText;
  takeout?: boolean;
  delivery?: boolean;
  dineIn?: boolean;
  servesVegetarianFood?: boolean;
  currentOpeningHours?: OpeningHours;
  primaryType?: string;
  photos?: Photo[];
  allowsDogs?: boolean;
  accessibilityOptions?: AccessibilityOptions;
  generativeSummary?: GenerativeSummary;
  priceRange?: PriceRange;
}

interface LocalizedText {
  text?: string;
  languageCode?: string;
}

interface PriceRange {
  startPrice?: Money;
  endPrice?: Money;
}

interface Money {
  currencyCode?: CurrencyCode;
  units?: string;
  nanos?: number;
}

interface OpeningHours {
  openNow?: boolean;
  periods?: Period[];
  weekdayDescriptions?: string[];
  nextOpenTime?: string;
  secondaryHoursType?: SecondaryHoursType;
  specialDays?: SpecialDay[];
  nextCloseTime?: string;
}

interface Period {
  open?: Point;
  close?: Point;
}

interface GoogleDate {
  year?: number;
  month?: number;
  day?: number;
}
interface Point {
  date?: GoogleDate;
  truncated?: boolean;
  day?: number;
  hour?: number;
  minute?: number;
}

interface OpeningTime {
  day?: number; // 0 (Sunday) - 6 (Saturday)
  hour?: number;
  minute?: number;
  date?: {
    year?: number;
    month?: number;
    day?: number;
  };
}

interface SpecialDay {
  date: GoogleDate;
}

enum SecondaryHoursType {
  UNSPECIFIED = "SECONDARY_HOURS_TYPE_UNSPECIFIED",
  DRIVE_THROUGH = "DRIVE_THROUGH",
  HAPPY_HOUR = "HAPPY_HOUR",
  DELIVERY = "DELIVERY",
  TAKEOUT = "TAKEOUT",
  KITCHEN = "KITCHEN",
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  BRUNCH = "BRUNCH",
  PICKUP = "PICKUP",
  ACCESS = "ACCESS",
  SENIOR_HOURS = "SENIOR_HOURS",
  ONLINE_SERVICE_HOURS = "ONLINE_SERVICE_HOURS",
}

interface Photo {
  name?: string;
  widthPx?: number;
  heightPx?: number;
  authorAttribution?: AuthorAttribution[];
  flagContentUri?: string;
  googleMapsUri: string;
}

interface AuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}

interface AccessibilityOptions {
  wheelchairAccessibleParking?: boolean;
  wheelchairAccessibleEntrance?: boolean;
  wheelchairAccessibleRestroom?: boolean;
  wheelchairAccessibleSeating?: boolean;
}

interface GenerativeSummary {
  overview?: LocalizedText;
  overviewFlagContentUri?: string;
  description?: LocalizedText;
  descriptionFlagContentUri?: string;
  reference?: Reference;
  disclosureText?: LocalizedText;
}

interface Reference {
  review?: Review[];
  places?: string[];
}

interface Review {
  name?: string;
  relativePublicationTimeDescription?: string;
  text?: LocalizedText;
  originalText?: LocalizedText;
  rating?: number;
  authorAttribution?: AuthorAttribution[];
  publishedTime?: string;
  flagContentUri?: string;
  googleMapsUri?: string;
}

interface PlacesResponse {
  places: Place[];
}

export {
  Place,
  PlacesResponse,
  PriceRange,
  Money,
  OpeningHours,
  Period,
  Point,
  OpeningTime,
  SpecialDay,
  SecondaryHoursType,
};
