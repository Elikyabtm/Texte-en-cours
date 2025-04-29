export interface Contact {
  id: string
  name: string
  initials: string
  relationship: string
  color?: string
}

const contacts: Record<string, Contact> = {
  default: {
    id: "default",
    name: "Pote de classe",
    initials: "PC",
    relationship: "ami",
    color: "#9333ea",
  },
  thomas: {
    id: "thomas",
    name: "Thomas",
    initials: "TH",
    relationship: "ami",
    color: "#2563eb",
  },
  emma: {
    id: "emma",
    name: "Emma",
    initials: "EM",
    relationship: "amie",
    color: "#db2777",
  },
  lucas: {
    id: "lucas",
    name: "Lucas",
    initials: "LC",
    relationship: "ami",
    color: "#16a34a",
  },
  sarah: {
    id: "sarah",
    name: "Sarah",
    initials: "SA",
    relationship: "amie",
    color: "#ea580c",
  },
  groupe: {
    id: "groupe",
    name: "Groupe de classe",
    initials: "GC",
    relationship: "groupe",
    color: "#64748b",
  },
}

export function getContactInfo(contactId: string): Contact {
  return contacts[contactId] || contacts.default
}
