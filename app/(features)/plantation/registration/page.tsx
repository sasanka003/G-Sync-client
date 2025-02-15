"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.object({
  plantationName: z.string().min(1, "Plantation name is required"),
  plantationType: z.string().min(1, "Plantation type is required"),
  plantType: z.string().min(1, "Plant type is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  plantationLength: z.string().min(1, "Plantation length is required"),
  plantationWidth: z.string().min(1, "Plantation width is required"),
  agreeToTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
});

const PlantationForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      plantationName: "",
      plantationType: "",
      plantType: "",
      city: "",
      province: "",
      country: "",
      plantationLength: "",
      plantationWidth: "",
      agreeToTerms: false,
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [plantationCount, setPlantationCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    form.reset();
    setCity("");
    setProvince("");
    setCountry("");

    if (plan === "Gardener") {
      setShowPopup(true);
      router.push("/dashboard");
    } else if (plan === "Enterprise") {
      setPlantationCount(plantationCount + 1);
      if (plantationCount + 1 >= 3) {
        // Logic to navigate to the next form if required
      }
    }
  };

  return (
    <div className="w-[992px] mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-h1 font-bold text-center text-common mt-1">
          Let's Get Started
        </h1>
        <p className="text-center text-accent-foreground">
          Add your plantation details to start gsync.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-h4 text-text font-semibold mr-6">
          Plantation ({plantationCount + 1}/3)
        </span>
        <span className="text-grey ml-2">
          you’re currently using gardener plan.
          <a href="#" className="text-text underline ml-1">
            Change my plan
          </a>
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-28 mt-6">
            <div className="max-w-[440px]">
              <div className="space-y-4">
                <div className="text-h4 text-common">General</div>
                <FormField
                  control={form.control}
                  name="plantationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">
                          Plantation Name
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter plantation name"
                          className="placeholder:text-p"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plantationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">
                          Plantation Type
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter plantation type"
                          className="placeholder:text-p"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plantType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">Plant Type</div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter plant type"
                          className="placeholder:text-p"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="max-w-[440px]">
              <div className="space-y-4">
                <div className="text-h4 text-common">Pricing</div>
                <FormField
                  control={form.control}
                  name="plantationLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">
                          Plantation Length
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter plantation length"
                          className="placeholder:text-p"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plantationWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">
                          Plantation Width
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter plantation width"
                          className="placeholder:text-p"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-10 flex mr-1">
                <div className="flex-1">
                  <div className="text-lead text-common">Total Price</div>
                  <div className="text-h4 font-semibold text-green">
                    20 USD*
                  </div>
                </div>
                <div className="flex-1.5 text-grey">
                  <div>*Total Price is calculated according to</div>
                  <div>
                    <a href="#" className="text-text underline">
                      Gsync pricing regulations
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-28 mt-6">
            <div className="max-w-[440px]">
              <div className="space-y-4">
                <div className="text-h4 text-common">Location</div>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">City</div>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={city}
                          onValueChange={(value) => {
                            setCity(value);
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full px-4 py-2 border rounded bg-transparent">
                            <input
                              type="text"
                              placeholder="Select City"
                              value={city}
                              readOnly
                              className="w-full bg-transparent placeholder:text-p text-gray-900"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="city1">City 1</SelectItem>
                            <SelectItem value="city2">City 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">Province</div>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={province}
                          onValueChange={(value) => {
                            setProvince(value);
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full px-4 py-2 border rounded bg-transparent">
                            <input
                              type="text"
                              placeholder="Select Province"
                              value={province}
                              readOnly
                              className="w-full bg-transparent placeholder:text-p text-gray-900"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="province1">
                              Province 1
                            </SelectItem>
                            <SelectItem value="province2">
                              Province 2
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-p text-common">Region/Country</div>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={country}
                          onValueChange={(value) => {
                            setCountry(value);
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full px-4 py-2 border rounded bg-transparent">
                            <input
                              type="text"
                              placeholder="Select Country"
                              value={country}
                              readOnly
                              className="w-full bg-transparent placeholder:text-p text-gray-900"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="country1">Country 1</SelectItem>
                            <SelectItem value="country2">Country 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="max-w-[440px] pt-2">
              <div className="text-p text-grey mb-4 mt-12">
                *After clicking, your request will be sent for approval. Our
                Gsync agents will contact you via email & contact number.
              </div>
              <div className="text-p text-grey mb-10">
                *You may make your payment once our agents visit your plantation
                & verify your request.
              </div>
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-small text-text">
                        I understand & agree to the terms above
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center mt-6">
                <Button
                  type="submit"
                  className="block w-full text-body-medium text-fill"
                >
                  Add Current Plantation
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlantationForm;
