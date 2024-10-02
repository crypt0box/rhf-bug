import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { ChangeEvent, useState } from "react";

const scheme = z.object({
  date: z.date(),
});

type Scheme = z.infer<typeof scheme>;

function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Scheme>({
    resolver: zodResolver(scheme),
    mode: "onChange",
  });

  const [text, setText] = useState<string>("");

  const onSubmit = (data: Scheme) => {
    console.log("Valid date:", data.date);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                type="text"
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setText(e.target.value);
                  const dateValue = new Date(e.target.value);
                  onChange(dateValue);
                }}
              />
            )}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
