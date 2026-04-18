interface Props {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  register?: any;
  error?: string;
  className?: string;
}

export default function TextField({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
  className,
}: Props) {
  return (
    <>
      <div className="mb-6">
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          // required
          className="field-input"
          placeholder={placeholder}
          {...register}
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    </>
  );
}
