// Configuration that is globally shared by the application
export namespace GlobalConfig {
  export const IP_ADDR: string = "0.0.0.0"
  export const PORT: number = 80;

  export const STATIC_DIR: string = 'public';

  export const PATH_REDIRECT_PREFIX: string = 'x';
  export const PATH_SHORTEN: string = '/shorten';
  export const PATH_ORIGINAL: string = '/original';
}

// Data shared globally by the application
export namespace GlobalShared {
  export const VALID_URL_REGEX: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
}