import { IForm } from "../../react-app-env";

export const newstage: IForm[] = [
  {
    id: "titre",
    type: "text",
    label: "Titre",
    required: true,
    span: {
      sm: 12,
    },
    row: 1,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "entreprise",
    type: "text",
    label: "Entreprise",
    required: true,
    span: {
      sm: 12,
      md: 6,
    },
    row: 2,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "ville",
    type: "text",
    label: "Ville",
    required: true,
    span: {
      sm: 12,
      md: 6,
    },
    row: 2,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "description",
    type: "textarea",
    label: "Description du stage",
    required: true,
    span: {
      sm: 12,
    },
    row: 3,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "emploiApresStage",
    type: "checkbox",
    label: "Emploi possible après le stage",
    required: false,
    span: {
      sm: 6,
    },
    row: 4,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      return "";
    },
  },
  {
    id: "remunere",
    type: "checkbox",
    label: "Rémunéré",
    required: false,
    span: {
      sm: 6,
    },
    row: 4,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      return "";
    },
  },
  {
    id: "nbHeuresSemaine",
    type: "text",
    label: "Nb. heures / semaine",
    required: true,
    span: {
      sm: 6,
    },
    row: 5,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      } else if (/\D/.test(value)) {
        return "Ce champs n'accepte que des chiffres.";
      } else if (parseInt(value) >= 41) {
        return "Voulez-vous vraiment tuer votre stagiaire?";
      }
    },
  },
  {
    id: "salaire",
    type: "text",
    label: "Salaire",
    required: false,
    span: {
      sm: 6,
    },
    row: 5,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      } else if (/\D|\s/.test(value)) {
        return "Ce champs n'accepte que des chiffres.";
      }
    },
  },
  {
    id: "informationsSupplementaires",
    type: "textarea",
    label: "Informations supplémentaires",
    required: false,
    span: {
      sm: 12,
    },
    row: 6,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "dateDebut",
    type: "datepicker",
    label: "Date de début",
    required: true,
    span: {
      sm: 12,
      md: 4,
    },
    row: 7,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "dateFin",
    type: "datepicker",
    label: "Date de fin",
    required: true,
    span: {
      sm: 12,
      md: 4,
    },
    row: 7,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      }
    },
  },
  {
    id: "duree",
    type: "text",
    label: "Durée (en semaine)",
    required: false,
    span: {
      sm: 12,
      md: 4,
    },
    row: 7,
    values: null,
    value: "",
    validate: function (value: string) {
      this.value = value;
      if (!value.length) {
        return "Ce champs est obligatoire.";
      } else if (/\D|\s/.test(value)) {
        return "Ce champs n'accepte que des chiffres.";
      }
    },
  },
];

newstage.forEach((input) => (input.values = newstage));
