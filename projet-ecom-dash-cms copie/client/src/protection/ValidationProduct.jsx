export default function ValidationProduct(values) {
  const errors = {};
  const name_pattern = /^[a-zA-Z\s]+$/;
  const price_pattern = /^\d+(\.\d{1,2})?$/;

  if (!values.name.trim()) {
    errors.name = "Un Nom est Requis !";
  } else if (!name_pattern.test(values.name)) {
    errors.name = "Le Nom est incorrect";
  }

  if (!values.price.trim()) {
    errors.price = "Un Prix est Requis !";
  } else if (!price_pattern.test(values.price)) {
    errors.price = "Le Prix est incorrect";
  }

  if (!values.description.trim()) {
    errors.description = "Une Description est Requise !";
  }

  if (!values.supply.trim()) {
    errors.supply = "Une Quantité est Requise !";
  } else if (isNaN(values.supply)) {
    errors.supply = "La Quantité doit être un nombre";
  }

  return errors;
}
