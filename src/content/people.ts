export type PersonId = "pedro" | "caroline" | "davi" | "henry";

export type Person = {
  id: PersonId;
  displayName: string;
  photoHref?: string;
};

export const PEOPLE: Person[] = [
  {
    id: "pedro",
    displayName: "Pedro",
    photoHref: "/documents/people/pedro/digital-photo.png",
  },
  {
    id: "caroline",
    displayName: "Caroline",
    photoHref: "/documents/people/caroline/digital-photo.png",
  },
  {
    id: "davi",
    displayName: "Davi",
    photoHref: "/documents/people/davi/digital-photo.png",
  },
  {
    id: "henry",
    displayName: "Henry",
    photoHref: "/documents/people/henry/digital-photo.png",
  },
];

export const FAMILY_PEOPLE = PEOPLE;

export function getPerson(id: string): Person | undefined {
  return PEOPLE.find((person) => person.id === id);
}

export const PERSON_PATH_PREFIX = "/immigration/documents/person";

export function personDocumentsPath(id: PersonId): string {
  return `${PERSON_PATH_PREFIX}/${id}`;
}
