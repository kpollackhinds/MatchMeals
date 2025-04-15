import OverlayLabel from "rn-tinder-card/src/components/OverlayLabel";
import { OpeningHours } from "./Place";

interface RestaurantCardProps {
  cardWidth?: number;
  cardHeight?: number;
  OverlayLabelRight?: () => JSX.Element;
  OverlayLabelLeft?: () => JSX.Element;
  OverlayLabelTop?: () => JSX.Element;
  imageUri?: string;
  RestaurantName: string;
  description: string;
  rating: number;
  category: string;
  priceLevel: string;
  details?: string;
  distance: string;
  onSwipedRight?: () => void;
  onSwipedLeft?: () => void;
  onSwipedTop?: () => void;
  onTapLeft?: () => void;
  onTapRight?: () => void;
  onToggleExpand?: () => void;
}

interface ExtendedCardProps extends RestaurantCardProps {
  title: string;
  extendedDescription: string;
  priceRange: { startPrice: any; endPrice: any };
  website: string;
  address: string;
  phoneNumber: string;
  openHours: OpeningHours;
  onClose: () => void;
  onLike: () => void;
  onSkip: () => void;
}

export type { RestaurantCardProps, ExtendedCardProps };
