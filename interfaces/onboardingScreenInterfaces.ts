interface OnboardingScreenProps {
  onNext: (key: string, value: any) => void; // Function with no parameters, returning nothing
  next: () => void;
}

export { OnboardingScreenProps };
