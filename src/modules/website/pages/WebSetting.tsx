"use client";

import TextField from "@/modules/base/components/TextField";

export default function WebSetting() {
  return (
    <>
      <div className="text">Website Info</div>

      <TextField
        id="email"
        label="Email Address"
        placeholder="test@company.com"
        type="email"
        // register={register("email", {
        //   required: "Email is required",
        //   pattern: {
        //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //     message: "Invalid email address",
        //   },
        // })}
        // error={errors.email?.message as string}
      />
    </>
  );
}
