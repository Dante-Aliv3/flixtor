export {};

declare global {
  export interface Window {
    showSpinner: () => void;
    hideSpinner: () => void;
    initSwiper: () => void;
  }
}
