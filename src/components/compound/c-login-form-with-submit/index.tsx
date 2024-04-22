"use client";
import { useCookies } from "next-client-cookies";
import { LoginController } from "@root/lib/login-handler";
import { Button } from "@src/components/root";
import { BtnColorSchema } from "@src/types/root";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "@src/types/compound/c-login-form-with-submit";

export const CLoginFormWithSubmit = () => {
  const cookies = useCookies();
  const route = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await LoginController(formData);
    } catch (err) {
      setPayload("Somethings went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <Button
          btnText={isLoading ? "Loading.." : "Login"}
          colorSchema={BtnColorSchema.SolidBgGrayTextViolet}
          isArrow={false}
          clickHandler={handleSubmit}
        />
        <span className={`text-bold `}>{payload}</span>
      </form>
    </div>
  );
};
