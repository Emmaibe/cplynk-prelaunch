"use client";

import React from "react";
import { Mail, Phone, User, X } from "lucide-react";
import { useWaitlist } from "@/contexts/WaitlistContext";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(40, "Name is too long."),
    email: z.string().email("Enter a valid email address."),
    usage: z.string().min(1, "Please select how you plan to use CPlynk."),
    phone: z
        .string()
        .min(7, "Enter a valid phone number.")
        .max(15, "Enter a valid phone number.")
        .regex(/^[0-9]+$/, "Phone number must contain only digits."),
    city: z.string().min(1, "Please select a city."),
});

const usageOptions = ["Ride with others (Rider)", "Share my ride (Driver)"];
const cityOptions = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"];

const WaitlistForm = () => {
    const { setIsWaitlistModalOpen, setIsSuccessModalOpen } = useWaitlist();

    const form = useForm({
        defaultValues: { name: "", email: "", usage: "", phone: "", city: "" },
        validators: { onSubmit: schema },
        onSubmit: async ({ value }) => {
            toast("Waitlist submitted!", {
                description: (
                    <pre className="bg-black/40 text-white mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                        <code>{JSON.stringify(value, null, 2)}</code>
                    </pre>
                ),
                position: "bottom-right",
            });

            setIsWaitlistModalOpen(false);
            setIsSuccessModalOpen(true);
        },
    });

    const Label = ({ children }: { children: React.ReactNode }) => (
        <label className="text-[14px] font-medium text-white/90">
            {children} <span className="text-red-500">*</span>
        </label>
    );

    const hasMessage = (x: unknown): x is { message: unknown } =>
        typeof x === "object" && x !== null && "message" in x;

    const getErrorMessage = (err: unknown): string | undefined => {
        if (err == null) return undefined;

        if (typeof err === "string") return err;

        if (Array.isArray(err)) return getErrorMessage(err[0]);

        if (hasMessage(err)) {
            const msg = err.message;
            if (typeof msg === "string") return msg;
        }

        // last resort (handles numbers, booleans, objects without message)
        return typeof err === "object" ? JSON.stringify(err) : String(err);
    };

    const ErrorText = ({ err }: { err?: unknown }) => {
        const msg = getErrorMessage(err);
        return msg ? <p className="mt-2 text-sm text-red-400">{msg}</p> : null;
    };

    return (
        <div className="fixed w-full max-w-[588px] h-[85vh] rounded-[50px] bg-secondary z-30 px-3 py-14 flex flex-col items-center">
            <X
                onClick={() => setIsWaitlistModalOpen(false)}
                className="cursor-pointer absolute right-7 top-7 text-neutral-50"
                size={27}
            />

            {/* Header (does NOT scroll) */}
            <div className="text-center max-w-[450px] mx-auto shrink-0">
                <h2 className="font-bold text-[40px] text-primary">Join Waitlist</h2>
                <p className="text-[20px] text-neutral-50">
                    Get early access, updates, and exclusive perks when we launch.
                </p>
            </div>

            {/* Scroll area wrapper: THIS is the key */}
            <div className="mt-8 flex-1 min-h-0 w-full max-w-[471px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="h-full overflow-y-auto rounded-xl"
                >
                    <div className="space-y-7">
                        {/* Name */}
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <div>
                                        <Label>Name</Label>

                                        <div className="relative mt-3">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter your first name"
                                                autoComplete="given-name"
                                                aria-invalid={isInvalid}
                                                className="h-[50px] rounded-lg bg-white px-5 pr-14 text-[20px] text-[#1B1B1B]"
                                            />
                                            <User
                                                size={20}
                                                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-black/60"
                                            />
                                        </div>

                                        <ErrorText err={field.state.meta.errors?.[0]} />
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* Email */}
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <div>
                                        <Label>Email Address</Label>

                                        <div className="relative mt-3">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Enter your email address"
                                                autoComplete="email"
                                                aria-invalid={isInvalid}
                                                className="h-[50px] rounded-lg bg-white px-5 pr-14 text-[20px] text-[#1B1B1B]"
                                            />
                                            <Mail
                                                size={20}
                                                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-black/60"
                                            />
                                        </div>

                                        <ErrorText err={field.state.meta.errors?.[0]} />
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* Usage */}
                        <form.Field name="usage">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <div>
                                        <Label>How do you plan to use CPlynk</Label>

                                        <div className="mt-3">
                                            <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                                                <SelectTrigger
                                                    id={field.name}
                                                    aria-invalid={isInvalid}
                                                    className="w-full h-[50px] rounded-lg bg-white px-5 py-6 text-[#1B1B1B]"
                                                >
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>

                                                <SelectContent className="z-[80]">
                                                    {usageOptions.map((opt) => (
                                                        <SelectItem key={opt} value={opt}>
                                                            {opt}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <ErrorText err={field.state.meta.errors?.[0]} />
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* Phone */}
                        <form.Field name="phone">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <div>
                                        <Label>Phone Number</Label>

                                        <div className="relative mt-3">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                                <div className="h-6 w-6 overflow-hidden rounded-full border border-black/10">
                                                    <div className="flex h-full">
                                                        <div className="w-1/3 bg-green-600" />
                                                        <div className="w-1/3 bg-white" />
                                                        <div className="w-1/3 bg-green-600" />
                                                    </div>
                                                </div>
                                                <span className="text-[18px] text-black/70">+234</span>
                                                <span className="h-7 w-px bg-black/20" />
                                            </div>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                                                placeholder="Enter phone number"
                                                inputMode="numeric"
                                                aria-invalid={isInvalid}
                                                className="h-[50px] rounded-lg bg-white pl-[150px] pr-14 text-[20px] text-[#1B1B1B]"
                                            />

                                            <Phone
                                                size={20}
                                                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-black/60"
                                            />
                                        </div>

                                        <ErrorText err={field.state.meta.errors?.[0]} />
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* City */}
                        <form.Field name="city">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <div>
                                        <Label>City</Label>

                                        <div className="mt-3">
                                            <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                                                <SelectTrigger
                                                    id={field.name}
                                                    aria-invalid={isInvalid}
                                                    className="w-full h-[50px] rounded-lg bg-white px-5 py-6 text-[#1B1B1B]"
                                                >
                                                    <SelectValue placeholder="Select City" />
                                                </SelectTrigger>

                                                <SelectContent className="z-[80]">
                                                    {cityOptions.map((c) => (
                                                        <SelectItem key={c} value={c}>
                                                            {c}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <ErrorText err={field.state.meta.errors?.[0]} />
                                    </div>
                                );
                            }}
                        </form.Field>

                        {/* CTA */}
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.97 }}
                            className="mt-6 w-full cursor-pointer text-text_color px-6 py-3.5 rounded-[14px] bg-primary text-base font-bold"
                        >
                            Join Waitlist
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WaitlistForm;