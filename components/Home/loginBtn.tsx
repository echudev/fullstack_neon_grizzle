"use client";

import { Button } from "@/components/ui/button";

export default function LoginBtn() {
  return (
    <Button
      variant="default"
      className="my-3"
      type="button"
      onClick={() => (window.location.href = "/login")}
    >
      Ingresa
    </Button>
  );
}
