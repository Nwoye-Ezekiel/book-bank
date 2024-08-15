export interface QueryParams {
  q: string;
  startIndex: number;
  maxResults: number;
}

export interface BookVolume {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors?: string[];
    publisher?: string;
    description?: string;
    publishedDate: string;
    industryIdentifiers: Array<{
      type: string;
      identifier: string;
    }>;
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    contentVersion: string;
    allowAnonLogging: boolean;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
    language: string;
    infoLink: string;
    previewLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    buyLink: string;
    isEbook: boolean;
    saleability: string;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      downloadLink: string;
    };
    pdf: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
  searchInfo: {
    textSnippet: string;
  };
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items: BookVolume[];
}
