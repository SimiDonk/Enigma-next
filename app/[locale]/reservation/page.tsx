"use client";

import Navigation from "../ui/Navigation";
import { useTranslations } from "next-intl";
import { Button, Input, Select, SelectItem, Textarea, Card, CardBody } from "@heroui/react";
import { useState } from "react";

export default function ReservationPage() {
  const t = useTranslations("reservations");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    room: "",
    date: "",
    time: "",
    participants: "2",
    specialRequests: ""
  });
  const [errors, setErrors] = useState({});

  const rooms = [
    { key: "room1", label: t("rooms.room1") },
    { key: "room2", label: t("rooms.room2") },
    { key: "room3", label: t("rooms.room3") },
    { key: "room4", label: t("rooms.room4") },
    { key: "room5", label: t("rooms.room5") },
    { key: "room6", label: t("rooms.room6") }
  ];

  const timeSlots = [
    { key: "10:00", label: t("timeSlots.10:00") },
    { key: "12:00", label: t("timeSlots.12:00") },
    { key: "14:00", label: t("timeSlots.14:00") },
    { key: "16:00", label: t("timeSlots.16:00") },
    { key: "18:00", label: t("timeSlots.18:00") },
    { key: "20:00", label: t("timeSlots.20:00") }
  ];

  const participantOptions = [
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = t("requiredField");
    if (!formData.lastName.trim()) newErrors.lastName = t("requiredField");
    if (!formData.email.trim()) {
      newErrors.email = t("requiredField");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("invalidEmail");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("requiredField");
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = t("invalidPhone");
    }
    if (!formData.room) newErrors.room = t("requiredField");
    if (!formData.date) newErrors.date = t("requiredField");
    if (!formData.time) newErrors.time = t("requiredField");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Submit to Supabase or API
      console.log("Form submitted:", formData);
      alert("Booking submitted successfully! We will contact you soon to confirm.");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-red-800 mb-4 border-b-2 border-red-800 pb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </div>

          <Card className="bg-gray-900 border border-gray-700">
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-2xl font-bold text-red-700 mb-4">{t("personalInfo")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={t("firstName")}
                      placeholder={t("firstName")}
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      isInvalid={!!errors.firstName}
                      errorMessage={errors.firstName}
                      classNames={{
                        input: "bg-gray-800 text-white",
                        inputWrapper: "bg-gray-800 border-gray-600"
                      }}
                      required
                    />
                    <Input
                      label={t("lastName")}
                      placeholder={t("lastName")}
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      isInvalid={!!errors.lastName}
                      errorMessage={errors.lastName}
                      classNames={{
                        input: "bg-gray-800 text-white",
                        inputWrapper: "bg-gray-800 border-gray-600"
                      }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label={t("email")}
                      placeholder="example@email.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      isInvalid={!!errors.email}
                      errorMessage={errors.email}
                      classNames={{
                        input: "bg-gray-800 text-white",
                        inputWrapper: "bg-gray-800 border-gray-600"
                      }}
                      required
                    />
                    <Input
                      label={t("phone")}
                      placeholder="+36 20 123 4567"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      isInvalid={!!errors.phone}
                      errorMessage={errors.phone}
                      classNames={{
                        input: "bg-gray-800 text-white",
                        inputWrapper: "bg-gray-800 border-gray-600"
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Booking Details Section */}
                <div>
                  <h2 className="text-2xl font-bold text-red-700 mb-4">{t("bookingDetails")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label={t("selectRoom")}
                      placeholder={t("selectRoom")}
                      value={formData.room}
                      onChange={(e) => handleInputChange("room", e.target.value)}
                      isInvalid={!!errors.room}
                      errorMessage={errors.room}
                      classNames={{
                        trigger: "bg-gray-800 border-gray-600",
                        value: "text-white"
                      }}
                      required
                    >
                      {rooms.map((room) => (
                        <SelectItem key={room.key} value={room.key}>
                          {room.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      label={t("selectDate")}
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      isInvalid={!!errors.date}
                      errorMessage={errors.date}
                      classNames={{
                        input: "bg-gray-800 text-white",
                        inputWrapper: "bg-gray-800 border-gray-600"
                      }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Select
                      label={t("selectTime")}
                      placeholder={t("selectTime")}
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      isInvalid={!!errors.time}
                      errorMessage={errors.time}
                      classNames={{
                        trigger: "bg-gray-800 border-gray-600",
                        value: "text-white"
                      }}
                      required
                    >
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.key} value={slot.key}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label={t("participants")}
                      description={t("participantsHelp")}
                      value={formData.participants}
                      onChange={(e) => handleInputChange("participants", e.target.value)}
                      classNames={{
                        trigger: "bg-gray-800 border-gray-600",
                        value: "text-white"
                      }}
                      defaultSelectedKeys={["2"]}
                    >
                      {participantOptions.map((option) => (
                        <SelectItem key={option.key} value={option.key}>
                          {option.label} {t("participantsHelp").includes("participants") ? "participants" : "résztvevő"}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <Textarea
                    label={t("specialRequests")}
                    placeholder={t("specialRequestsPlaceholder")}
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    maxRows={4}
                    classNames={{
                      input: "bg-gray-800 text-white",
                      inputWrapper: "bg-gray-800 border-gray-600"
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-red-900 hover:bg-red-800 text-white font-bold px-8 py-3 text-lg"
                  >
                    {t("submitButton")}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
