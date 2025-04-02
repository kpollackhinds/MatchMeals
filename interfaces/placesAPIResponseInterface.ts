interface Place {
  id: string;
  types: string[];
  nationalPhoneNumber: string;
  formattedAddress: string;
  rating: number;
  googleMapsUri: string;
  websiteUri: string;
  businessStatus: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
  priceLevel:
    | "PRICE_LEVEL_UNSPECIFIED"
    | "PRICE_LEVEL_FREE"
    | "PRICE_LEVEL_INEXPENSIVE"
    | "PRICE_LEVEL_MODERATE"
    | "PRICE_LEVEL_EXPENSIVE"
    | "PRICE_LEVEL_VERY_EXPENSIVE";
  displayName: LocalizedText;
  primaryTypeDisplayName: LocalizedText;
  takeout: boolean;
  delivery: boolean;
  dineIn: boolean;
  servesVegetarianFood: boolean;
  currentOpeningHours: OpeningHours;
  primaryType: string;
  photos?: Photo[];
  allowsDogs: boolean;
  accessibilityOptions: AccessibilityOptions;
  generativeSummary: GenerativeSummary;
}

interface LocalizedText {
  text: string;
  languageCode: string;
}

interface OpeningHours {
  openNow: boolean;
  periods: OpeningPeriod[];
  weekdayDescriptions: string[];
  nextOpenTime: string;
}

interface OpeningPeriod {
  open: OpeningTime;
  close: OpeningTime;
}

interface OpeningTime {
  day: number; // 0 (Sunday) - 6 (Saturday)
  hour: number;
  minute: number;
  date: {
    year: number;
    month: number;
    day: number;
  };
}

interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttribution: AuthorAttribution[];
  flagContentUri: string;
  googleMapsUri: string;
}

interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

interface AccessibilityOptions {
  wheelchairAccessibleParking: boolean;
  wheelchairAccessibleEntrance: boolean;
  wheelchairAccessibleRestroom: boolean;
  wheelchairAccessibleSeating: boolean;
}

interface GenerativeSummary {
  overview: LocalizedText;
  overviewFlagContentUri: string;
  description: LocalizedText;
  descriptionFlagContentUri: string;
  reference: Reference;
}

interface Reference {
  review: Review[];
  places: string[];
}

interface Review {
  name: string;
  relativePublicationTimeDescription: string;
  text: LocalizedText;
  originalText: LocalizedText;
  rating: number;
  authorAttribution: AuthorAttribution[];
  publishedTime: string;
  flagContentUri: string;
  googleMapsUri: string;
}

interface PlacesResponse {
  places: Place[];
}
