"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validación del nombre de usuario
    if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validación básica de la contraseña
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const resetForm = () => {
    if (!rememberMe) {
      setFormData({
        name: "",
        password: "",
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
    setErrors({});
    setServerError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setServerError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rememberMe,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error en el inicio de sesión");
      }

      setSuccess("¡Inicio de sesión exitoso!");
      resetForm();
      // Aquí podrías agregar una redirección
      // setTimeout(() => router.push('/dashboard'), 1000);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("JSON")) {
          setServerError("Error de conexión con el servidor");
        } else if (err.message.includes("credenciales")) {
          setServerError("Credenciales inválidas");
        } else {
          setServerError(err.message);
        }
      } else {
        setServerError("Ocurrió un error durante el inicio de sesión");
      }
      console.error("Error en el login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        {serverError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de Usuario</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre de usuario"
              required
              className={`w-full ${
                errors.name ? "border-red-500 focus:ring-red-500" : ""
              }`}
              autoComplete="username"
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
                className={`w-full pr-10 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : ""
                }`}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="remember" className="ml-2 text-sm">
                Recordar usuario
              </Label>
            </div>
            <Button variant="link" className="text-sm p-0" type="button">
              ¿Olvidaste tu contraseña?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Button variant="link" className="p-0">
            Regístrate
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
