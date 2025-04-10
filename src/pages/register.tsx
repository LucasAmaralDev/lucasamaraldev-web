import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Router from "next/router";
import { Divider } from "../components/common";
import Button from "@/components/common/Button";
import Alert from "@/components/common/Alert";
import AuthLayout from "@/components/common/AuthLayout";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import { FaArrowLeft, FaRedo } from "react-icons/fa";

export default function Register() {
  const router = Router;

  // Estado para controlar se o formulário já foi submetido
  const [submitted, setSubmitted] = useState(false);
  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Mensagens de erro
  const [errors, setErrors] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Estados para alertas e loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const validateField = (field: string, value: string) => {
    // Somente validar se o formulário já foi submetido
    if (!submitted) return "";

    switch (field) {
      case "email":
        if (!value) return "Email é obrigatório";
        // Regex para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Formato de email inválido";
        return "";

      case "username":
        if (!value) return "Nome de usuário é obrigatório";
        if (value.length < 3)
          return "Nome de usuário deve ter pelo menos 3 caracteres";
        return "";

      case "password":
        if (!value) return "Senha é obrigatória";
        if (value.length < 6) return "Senha deve ter pelo menos 6 caracteres";
        return "";

      case "confirmPassword":
        if (!value) return "Confirmação de senha é obrigatória";
        if (value !== formData.password) return "As senhas não coincidem";
        return "";

      case "nome":
        if (!value) return "Nome é obrigatório";
        if (value.length < 2) return "Nome deve ter pelo menos 2 caracteres";
        return "";

      case "sobrenome":
        if (!value) return "Sobrenome é obrigatório";
        if (value.length < 2)
          return "Sobrenome deve ter pelo menos 2 caracteres";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar somente confirmPassword quando mudar (para verificar se senhas são iguais)
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleTryAgain = () => {
    setError("");
    setRetryCount((prev) => prev + 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    // Validar todos os campos
    const newErrors = {
      email: validateField("email", formData.email),
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
      nome: validateField("nome", formData.nome),
      sobrenome: validateField("sobrenome", formData.sobrenome),
    };

    setErrors(newErrors);

    // Verificar se há erros
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Erro ao registrar");
      }

      setSuccess("Registro realizado com sucesso! Redirecionando...");

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      console.error("Erro no registro:", err);
      if (err instanceof Error) {
        // Se o erro contiver informações específicas, destacar o campo correspondente
        if (err.message.includes("email já está em uso")) {
          setErrors((prev) => ({
            ...prev,
            email: "Este email já está em uso",
          }));
        } else if (err.message.includes("nome de usuário já está em uso")) {
          setErrors((prev) => ({
            ...prev,
            username: "Este nome de usuário já está em uso",
          }));
        }

        setError(err.message);
      } else {
        setError(
          "Ocorreu um erro durante o registro. Por favor, tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Registre-se para criar seu portfólio"
    >
      <Link
        href="/login"
        className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft className="mr-1" /> Voltar para login
      </Link>

      {error && (
        <Alert
          type="error"
          message={error}
          className="mb-6"
          onClose={() => setError("")}
        />
      )}
      {error && retryCount < 3 && (
        <div className="mb-6 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleTryAgain}
            startIcon={<FaRedo />}
          >
            Tentar novamente
          </Button>
        </div>
      )}
      {success && <Alert type="success" message={success} className="mb-6" />}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              id="nome"
              name="nome"
              type="text"
              label="Nome"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
              error={submitted ? errors.nome : ""}
              autoComplete="given-name"
            />
          </div>

          <div>
            <Input
              id="sobrenome"
              name="sobrenome"
              type="text"
              label="Sobrenome"
              placeholder="Digite seu sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              error={submitted ? errors.sobrenome : ""}
              autoComplete="family-name"
            />
          </div>

          <div>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              error={submitted ? errors.email : ""}
              autoComplete="email"
            />
          </div>

          <div>
            <Input
              id="username"
              name="username"
              type="text"
              label="Nome de usuário"
              placeholder="Digite seu nome de usuário"
              value={formData.username}
              onChange={handleChange}
              error={submitted ? errors.username : ""}
              autoComplete="username"
            />
          </div>

          <div>
            <PasswordInput
              id="password"
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              error={submitted ? errors.password : ""}
              autoComplete="new-password"
            />
          </div>

          <div>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={submitted ? errors.confirmPassword : ""}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processando..." : "Cadastrar"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition duration-150"
          >
            Faça login
          </Link>
        </p>
      </div>

      <Divider text="Ou registre-se com" />

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          startIcon={
            <svg className="h-5 w-5" fill="#4285F4" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"></path>
            </svg>
          }
        >
          Google
        </Button>
        <Button
          variant="outline"
          startIcon={
            <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.644c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
            </svg>
          }
        >
          Facebook
        </Button>
      </div>
    </AuthLayout>
  );
}
