import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, type, handleChange, name, value }) => {
  return (
    <Group>
      <Input
        type={type}
        required
        onChange={handleChange}
        name={name}
        value={value}
      />
      {label && <FormInputLabel shrink={value.length}>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
