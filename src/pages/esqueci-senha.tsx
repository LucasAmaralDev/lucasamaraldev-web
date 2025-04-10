import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { AuthLayout, Input, Button, Alert } from "../components/common";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validação em tempo real para email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError("Por favor, insira um email válido");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validação final
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um email válido");
      return;
    }

    try {
      setLoading(true);

      // Aqui seria implementada a chamada real à API
      // Por enquanto, apenas simularemos o sucesso após 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mostrar mensagem de sucesso
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao processar sua solicitação");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Recuperar Senha"
      subtitle="Enviaremos um link para redefinir sua senha"
    >
      <Link
        href="/login"
        className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft className="mr-1" /> Voltar para login
      </Link>

      {error && <Alert type="error" message={error} className="mb-6" />}

      {success ? (
        <div className="text-center py-8">
          <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Email enviado!</h2>
          <p className="text-gray-600 mb-6">
            Enviamos instruções para redefinir sua senha para {email}. Por
            favor, verifique sua caixa de entrada.
          </p>
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Voltar para login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            required
            placeholder="seu-email@exemplo.com"
            icon={<FaEnvelope className="text-gray-400" />}
            error={emailError}
          />

          <Button type="submit" loading={loading} fullWidth>
            Enviar instruções
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition duration-150"
          >
            Registre-se agora
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
