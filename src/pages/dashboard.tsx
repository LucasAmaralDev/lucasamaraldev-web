import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type User = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    // Função para buscar os dados do usuário
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Se o token for inválido, redirecionar para login
          if (response.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro ao carregar os dados");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-xl font-bold text-gray-800"
              >
                Meu Portfólio
              </Link>
            </div>
            <div className="flex items-center">
              {user && (
                <div className="mr-4 text-sm text-gray-600">
                  Olá, {user.nome} {user.sobrenome}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">
            Bem-vindo ao seu Dashboard
          </h1>

          {user && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Suas informações</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nome completo</p>
                  <p className="font-medium">
                    {user.nome} {user.sobrenome}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conta criada em</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Meus Portfólios</h2>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Você ainda não criou nenhum portfólio. Clique no botão abaixo para
              criar seu primeiro portfólio.
            </p>

            <Link
              href="/portfolio/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Criar Novo Portfólio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
