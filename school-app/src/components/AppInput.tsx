import type { ChangeEvent } from "react";
import { IReactFC } from "@/types";
import { tailwindClassResolve } from "@/helper/util";
import Flatpickr from "react-flatpickr";

interface IInputParams {
  inputName: string;
  displayLabel?: string;
  placeholder?: string;
  handleChange: (event: ChangeEvent<any>) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  className?: string;
  inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
}

interface IInputParamsNumber extends IInputParams {
  value: number | undefined;
  type: "number";
}

interface IInputParamsString extends IInputParams {
  value: string;
  type?: "email" | "month" | "password" | "search" | "tel" | "text" | "url" | "textarea";
}

export const AppInput: IReactFC<IInputParamsString | IInputParamsNumber> = ({
  inputName,
  isDisabled,
  displayLabel,
  className,
  placeholder,
  handleChange,
  type,
  value,
  inputMode,
  isRequired,
  isReadOnly,
}) => {
  const className01 = tailwindClassResolve([
    "block p-2.5 w-full font-bold border",
    "text-brandark-900",
    "border-brandark-300",
    "focus:ring-brandark-400 focus:border-brandark-400",
    className,
  ]);

  return (
    <div className="mt-3">
      <label htmlFor={inputName} className="text-uppercase block mb-1 text-sm">
        {displayLabel || inputName}
        {isRequired && <span className="text-danger inline-block pl-[1px] text-xs">&#42;</span>}
      </label>
      <>
        {type === "textarea" ? (
          <textarea
            name={inputName}
            rows={4}
            value={value}
            className={className01}
            placeholder={placeholder}
            disabled={isDisabled === true}
            onChange={handleChange}
            inputMode={inputMode}
            required={isRequired === true}
            readOnly={isReadOnly === true}
          />
        ) : (
          <input
            type={type}
            value={value}
            name={inputName}
            disabled={isDisabled === true}
            placeholder={placeholder}
            onChange={handleChange}
            className={className01}
            inputMode={inputMode}
            required={isRequired === true}
            readOnly={isReadOnly === true}
          />
        )}
      </>
    </div>
  );
};

interface IDateInputParams {
  inputName: string;
  value: string;
  displayLabel?: string;
  placeholder?: string;
  handleChange: (event: string) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  className?: string;
  minDate?: string;
  maxDate?: string;
}

export const AppDateInput: IReactFC<IDateInputParams> = ({
  inputName,
  isDisabled,
  displayLabel,
  className,
  placeholder,
  handleChange,
  value,
  isRequired,
  isReadOnly,
  minDate,
  maxDate,
}) => {
  const className01 = tailwindClassResolve([
    "block p-2.5 w-full font-bold border",
    "text-brandark-900",
    "border-brandark-300",
    "focus:ring-brandark-400 focus:border-brandark-400",
    className,
  ]);

  return (
    <div className="mt-3">
      <label htmlFor={inputName} className="text-uppercase block mb-1 text-sm">
        {displayLabel || inputName}
        {isRequired && <span className="text-danger inline-block pl-[1px] text-xs">&#42;</span>}
      </label>
      <>
        <Flatpickr
          value={value}
          name={inputName}
          disabled={isDisabled === true}
          placeholder={placeholder}
          onChange={([date]) => {
            console.log({ date });
            handleChange(date.toISOString().split("T")[0]);
          }}
          className={className01}
          required={isRequired === true}
          readOnly={isReadOnly === true}
          max={maxDate}
          min={minDate}
          options={{
            maxDate,
            minDate,
            dateFormat: "Y-m-d",
          }}
        />
      </>
    </div>
  );
};

interface ISelectInputParams {
  inputName: string;
  value: string;
  displayLabel?: string;
  handleChange: (event: ChangeEvent<any>) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  type?: "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "url" | "textarea";
  className?: string;
  inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
}

export const AppSelectInput: IReactFC<ISelectInputParams> = ({
  inputName,
  isDisabled,
  displayLabel,
  className,
  handleChange,
  value,
  inputMode,
  isRequired,
  children,
}) => {
  const className01 = tailwindClassResolve([
    "block p-2.5 w-full font-bold border",
    "text-brandark-900",
    "border-brandark-300",
    "focus:ring-brandark-400 focus:border-brandark-400",
    className,
  ]);

  return (
    <div className="mt-3">
      <label htmlFor={inputName} className="text-uppercase block mb-1 text-sm">
        {displayLabel || inputName}
        {isRequired && <span className="text-danger inline-block pl-[1px] text-xs">&#42;</span>}
      </label>
      <select
        value={value}
        name={inputName}
        disabled={isDisabled === true}
        onChange={handleChange}
        className={className01}
        inputMode={inputMode}
        required={isRequired === true}
      >
        {children}
      </select>
    </div>
  );
};

export const AppSelectOption: IReactFC<{ value: string; disabled?: boolean }> = ({ children, disabled, value }) => {
  return (
    <option disabled={disabled} value={value}>
      {children}
    </option>
  );
};

export default AppInput;
