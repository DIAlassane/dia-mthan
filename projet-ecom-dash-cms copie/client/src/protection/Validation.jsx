export default function Validation(values) {
  const errors = {};
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const phoneNumber_pattern = /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/;

  if (!values.name.trim()) {
    errors.name = "Un Nom est Requis !";
  }

  if (!values.country.trim()) {
    errors.country = "Ce champ est Requis !";
  }

  if (!values.occupation.trim()) {
    errors.occupation = "Ce champ est Requis !";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Un Numéro est Requis !";
  } else if (!phoneNumber_pattern.test(values.phoneNumber)) {
    errors.phoneNumber = "Le Numéro est incorrect";
  }

  if (!values.email.trim()) {
    errors.email = "Un Email est Requis !";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "L'email est incorrect";
  }

  if (!values.password.trim()) {
    errors.password = "Un Mot-de-passe est Requis !";
  } else if (values.password.length < 8) {
    errors.password = "Le Mot-de-passe doit contenir au moins 8 caractères.";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Le Mot-de-passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.";
  }

  return errors;
}
