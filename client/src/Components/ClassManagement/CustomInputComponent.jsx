const CustomInputComponent = () => {
  return (
    <div className="w-[75%] mb-3">
      {props.type === "checkbox" ? (
        <div className="flex">
          <input type="checkbox" />
          <p className="ml-4 text-[16px]">{label}</p>
        </div>
      ) : (
        <>
          <p className="text-[13px] mb-[6px] font-medium">{label}</p>
          <input
            className={`w-full h-10 px-2 border-[1px] border-black/30 rounded-[5px] ${
              meta.error && meta.touched && "input-error"
            }`}
            {...field}
            {...props}
          />
          {meta.error && meta.touched && (
            <div className="text-[13px] text-red-600 ml-1">{meta.error}</div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomInputComponent;
