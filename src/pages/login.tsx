import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import {
  AuthLayout,
  Input,
  PasswordInput,
  Button,
  Alert,
  Divider,
} from "../components/common";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [lembrarMe, setLembrarMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Verificar se há credenciais salvas
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setLembrarMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      // Salvar email no localStorage se "lembrar-me" estiver marcado
      if (lembrarMe) {
        localStorage.setItem("savedEmail", formData.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // Salvar token no localStorage
      localStorage.setItem("token", data.token);

      // Redirecionar para a página inicial
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro durante o login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      subtitle="Faça login para acessar sua conta"
    >
      <Link
        href="/"
        className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft className="mr-1" /> Voltar para home
      </Link>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="seu-email@exemplo.com"
          icon={<FaEnvelope className="text-gray-400" />}
        />

        <PasswordInput
          id="password"
          name="password"
          label="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Sua senha"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="lembrar-me"
              name="lembrar-me"
              type="checkbox"
              checked={lembrarMe}
              onChange={() => setLembrarMe(!lembrarMe)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="lembrar-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Lembrar meu email
            </label>
          </div>
          <Link
            href="/esqueci-senha"
            className="text-sm text-blue-600 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Entrar
        </Button>
      </form>

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

      <Divider text="Ou continue com" />

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
