import { ValidateError } from "./../util/validate";
import { useEffect } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { SignUpProps, LoginProps } from "../service/auth";

type FormProps = SignUpProps | LoginProps;

type UseFormProps<P extends FormProps, E extends ValidateError> = {
  initialValues: P;
  onSubmit(data: P): any;
  validate(data: P): E;
  successHandler?: () => void;
};

export default function useForm<P extends FormProps, E extends ValidateError>({
  initialValues,
  onSubmit,
  validate,
  successHandler,
}: UseFormProps<P, E>) {
  const [data, setData] = useState<P>(initialValues);
  const [errors, setErrors] = useState<E>({} as E);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    validate && setErrors(validate(data));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(data);
        setData(initialValues);
        successHandler && successHandler();
      }
      setSubmitting(false);
    }
  }, [errors, submitting]);

  return { data, errors, submitting, handleChange, handleSubmit };
}
