import { GlobalConfig, GlobalShared } from "./config";
import { Params } from "./api/Params";

export enum ParamValidationResult {
  VALID,
  INVALID,
  MISSING
}

// Utilities for the application
export namespace Util {
  // Generates the path for Express to listen to, to redirect shortened urls
  export function GetRedirectUrlPath(): string {
    return `/${GlobalConfig.PATH_REDIRECT_PREFIX}*`;
  }

  export function ValidateApiParam(param: Params): ParamValidationResult {
    if (param.url) {
      const url = decodeURI(param.url);
      // RegExp.test() function stores matching index in lastIndex, we only want to check if the test matched,
      // so, we should reset the index to 0.
      GlobalShared.VALID_URL_REGEX.lastIndex = 0;
      if (GlobalShared.VALID_URL_REGEX.test(url)) {
        return ParamValidationResult.VALID;
      } else {
        return ParamValidationResult.INVALID;
      }
    } else {
      return ParamValidationResult.MISSING;
    }
  }

  export function prependHttp(url: string): string {
    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      return `http://${url}`;
    }
    return url;
  }
}