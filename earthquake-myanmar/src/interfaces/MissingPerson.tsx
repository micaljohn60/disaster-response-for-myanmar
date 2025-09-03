interface MissingPerson {
  name: string;
  location: string;
  image: string;
  lat: number;
  lng: number;
  noticeable_mark: string;
}

interface MissingPersonCard {
  missingPerson: MissingPerson[];
}
