"use strict";

let mimetypes;

class Person {
  constructor() {
    mimetypes = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/tiff": ".tiff",
      "image/bmp": ".bmp",
    };
  }

  getExtension(_mimeType) {
    if (_mimeType || typeof _mimeType !== "undefined") {
      return mimetypes[_mimeType]
        ? mimetypes[_mimeType]
        : console.error("Unsupported MIME type: " + _mimeType);
    }
  }
}

export default Person;
