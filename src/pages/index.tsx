/* eslint-disable @typescript-eslint/no-explicit-any */
import CardContato from "@/components/IndexComponents/CardContato";
import CardExperiencia from "@/components/IndexComponents/CardExperiencia";
import CardHabilidades from "@/components/IndexComponents/CardHabilidades";
import CardInfo from "@/components/IndexComponents/CardInfo";
import CardPortfolio from "@/components/IndexComponents/CardPortfolio";
import ComponentsAreaAtuacao from "@/components/IndexComponents/ComponentsAreaAtuacao";
import { Im } from "@/interfaces/Im.interface";
import Image from "next/image";
import { useEffect, useState, useRef, RefObject } from "react";
import {
  FaBars,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";
import SEO from "@/components/SEO";

export default function App({ serverIm }: { serverIm: string }) {
  const [activeSection, setActiveSection] = useState("sobre");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sobreRef = useRef<HTMLElement>(null);
  const habilidadesRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const experienciaRef = useRef<HTMLElement>(null);
  const contatoRef = useRef<HTMLElement>(null);

  const im: Im = JSON.parse(serverIm);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determinar a seção ativa com base na posição de rolagem
      const scrollPosition = window.scrollY + 100;

      if (
        contatoRef.current &&
        scrollPosition >= contatoRef.current.offsetTop
      ) {
        setActiveSection("contato");
      } else if (
        experienciaRef.current &&
        scrollPosition >= experienciaRef.current.offsetTop
      ) {
        setActiveSection("experiencia");
      } else if (
        portfolioRef.current &&
        scrollPosition >= portfolioRef.current.offsetTop
      ) {
        setActiveSection("portfolio");
      } else if (
        habilidadesRef.current &&
        scrollPosition >= habilidadesRef.current.offsetTop
      ) {
        setActiveSection("habilidades");
      } else {
        setActiveSection("sobre");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionRef: RefObject<HTMLElement>) => {
    setIsMobileMenuOpen(false);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-gray-50">
      <SEO
        title="Desenvolvedor Full Stack"
        description="Portfolio profissional de Lucas Amaral, desenvolvedor Full Stack especializado em desenvolvimento web moderno. Conheça meus projetos, habilidades e experiências."
        keywords="desenvolvedor full stack, programador, web developer, react, next.js, typescript, javascript, portfolio, desenvolvimento web"
        canonicalUrl="https://lucasamaraldev.com"
      />
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-blue-600">{im.name}</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection(sobreRef as any)}
              className={`font-medium transition-colors ${
                activeSection === "sobre"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection(habilidadesRef as any)}
              className={`font-medium transition-colors ${
                activeSection === "habilidades"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Habilidades
            </button>
            <button
              onClick={() => scrollToSection(portfolioRef as any)}
              className={`font-medium transition-colors ${
                activeSection === "portfolio"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection(experienciaRef as any)}
              className={`font-medium transition-colors ${
                activeSection === "experiencia"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Experiência
            </button>
            <button
              onClick={() => scrollToSection(contatoRef as any)}
              className={`font-medium transition-colors ${
                activeSection === "contato"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Contato
            </button>
          </div>

          {/* Hamburguer Telas Pequenas */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-md">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection(sobreRef as any)}
                className={`font-medium py-2 transition-colors ${
                  activeSection === "sobre" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection(habilidadesRef as any)}
                className={`font-medium py-2 transition-colors ${
                  activeSection === "habilidades"
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                Habilidades
              </button>
              <button
                onClick={() => scrollToSection(portfolioRef as any)}
                className={`font-medium py-2 transition-colors ${
                  activeSection === "portfolio"
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                Portfólio
              </button>
              <button
                onClick={() => scrollToSection(experienciaRef as any)}
                className={`font-medium py-2 transition-colors ${
                  activeSection === "experiencia"
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                Experiência
              </button>
              <button
                onClick={() => scrollToSection(contatoRef as any)}
                className={`font-medium py-2 transition-colors ${
                  activeSection === "contato"
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Content with padding for fixed navbar */}
      <div className="max-w-6xl mx-auto px-4 pt-20">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {im.name}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-6">
                {im.cargo}
              </p>
              <p className="text-white text-opacity-90 text-base md:text-lg max-w-2xl">
                {im.slogan.map((slogan, index) => (
                  <span key={index}>
                    {slogan}
                    <br />
                  </span>
                ))}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection(contatoRef as any)}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-md transition-all"
                >
                  Entre em contato
                </button>
                <button
                  onClick={() => scrollToSection(portfolioRef as any)}
                  className="bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Ver portfólio
                </button>
              </div>
            </div>
            <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={im.image}
                  alt={`Avatar de ${im.name}`}
                  className="w-full h-full object-cover bg-stone-300"
                  width={240}
                  height={240}
                />
              </div>
            </div>
          </div>
        </div>

        <main className="bg-white rounded-xl shadow-md p-6 md:p-8 min-h-[60vh] space-y-16">
          <section ref={sobreRef} id="sobre" className="scroll-mt-24">
            <h2 className="text-blue-600 mb-6 pb-2 border-b-2 border-blue-500 text-2xl font-bold">
              Sobre Mim
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  Sou um desenvolvedor full stack apaixonado por transformar
                  ideias em soluções digitais completas e performáticas. Minha
                  especialidade está em construir sistemas robustos e
                  escaláveis, integrando backend, frontend e infraestrutura para
                  entregar experiências fluidas e funcionais em diversas
                  plataformas.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Com experiência em projetos diversos, desde sistemas de
                  georreferenciamento até plataformas de jogos online, meu
                  objetivo é sempre entregar código limpo, eficiente e escalável
                  que resolva problemas reais.
                </p>
              </div>

              <ComponentsAreaAtuacao areasAtuacao={im.areasAtuacao} />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {im.infos.map((info, index) => {
                return (
                  <CardInfo key={index} title={info.title} value={info.value} />
                );
              })}
            </div>
          </section>

          <section
            ref={habilidadesRef}
            id="habilidades"
            className="scroll-mt-24"
          >
            <h2 className="text-blue-600 mb-6 pb-2 border-b-2 border-blue-500 text-2xl font-bold">
              Minhas Habilidades
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {im.habilidades.map((habilidade, index) => {
                return (
                  <CardHabilidades
                    key={index}
                    title={habilidade.title}
                    skills={habilidade.skills}
                    background={habilidade.background}
                  />
                );
              })}
            </div>
          </section>

          <section ref={portfolioRef} id="portfolio" className="scroll-mt-24">
            <h2 className="text-blue-600 mb-6 pb-2 border-b-2 border-blue-500 text-2xl font-bold">
              Meu Portfólio
            </h2>
            <p className="text-gray-700 mb-8">
              Confira alguns dos projetos em que trabalhei recentemente:
            </p>

            <div className="space-y-12">
              {im.portfolio.map((projeto, index) => (
                <CardPortfolio
                  key={index}
                  nome={projeto.nome}
                  descricao={projeto.descricao}
                  imagens={projeto.imagens}
                  stacks={projeto.stacks}
                />
              ))}
            </div>
          </section>

          <section
            ref={experienciaRef}
            id="experiencia"
            className="scroll-mt-24"
          >
            <h2 className="text-blue-600 mb-6 pb-2 border-b-2 border-blue-500 text-2xl font-bold">
              Experiência Profissional
            </h2>

            {im.experiencias.map((experiencia, index) => {
              return (
                <CardExperiencia
                  key={index}
                  empresa={experiencia.empresa}
                  cargo={experiencia.cargo}
                  periodo={experiencia.periodo}
                  local={experiencia.local}
                  descricao={experiencia.descricao}
                  atividades={experiencia.atividades}
                />
              );
            })}
          </section>

          <section ref={contatoRef} id="contato" className="scroll-mt-24">
            <h2 className="text-blue-600 mb-6 pb-2 border-b-2 border-blue-500 text-2xl font-bold">
              Entre em Contato
            </h2>
            <p className="text-gray-700 mb-6">
              Interessado em trabalhar juntos? Entre em contato comigo através
              dos canais abaixo:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl shadow-md">
                <h3 className="text-blue-600 font-semibold mb-6 text-center">
                  Informações de Contato
                </h3>

                {im.contatos.map((contato, index) => {
                  return (
                    <CardContato
                      key={index}
                      icon={contato.icon}
                      title={contato.title}
                      value={contato.value}
                      link={contato.link}
                    />
                  );
                })}
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">
                <h3 className="text-blue-700 mb-6 font-semibold text-xl">
                  Envie uma mensagem
                </h3>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Seu nome"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Seu email"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      placeholder="Sua mensagem"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base min-h-[150px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-base transition-all hover:from-blue-600 hover:to-blue-700 flex items-center"
                  >
                    <span>Enviar mensagem</span>
                    <FaEnvelope className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center mt-12 p-6 text-gray-600">
          <p className="font-medium">
            &copy; 2022-{new Date().getFullYear()} {im.name} - {im.cargo}
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={im.links[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={im.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={im.links[2].url}
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(_context: { req: any; res: any }) {
  const serverIm: Im = {
    name: "Lucas Amaral",
    cargo: "Desenvolvedor Full Stack",
    image: "/images/img.png",
    slogan: [
      "Transformando ideias em soluções digitais robustas e escaláveis.",
      "Especialista em React, Node.js e arquitetura de sistemas completos.",
    ],
    descricao:
      "Sou um desenvolvedor full stack apaixonado por transformar ideias em soluções digitais completas e performáticas. Minha especialidade está em construir sistemas robustos e escaláveis, integrando backend, frontend e infraestrutura para entregar experiências fluidas e funcionais em diversas plataformas.",
    areasAtuacao: [
      {
        text: "Desenvolvimento Frontend",
        icon: "FaReact",
        color: "blue",
      },
      {
        text: "Desenvolvimento Backend",
        icon: "FaNodeJs",
        color: "green",
      },
      {
        text: "Banco de Dados",
        icon: "FaDatabase",
        color: "purple",
      },
      {
        text: "Infraestrutura",
        icon: "FaServer",
        color: "red",
      },
      {
        text: "Integração de APIs",
        icon: "FaCode",
        color: "orange",
      },
    ],
    infos: [
      {
        title: "Anos de experiência",
        value: "3+",
      },
      {
        title: "Projetos concluídos",
        value: "10+",
      },
      {
        title: "Tecnologias dominadas",
        value: "5+",
      },
    ],
    habilidades: [
      {
        title: "Frontend",
        skills: [
          "React.js",
          "Next.js",
          "Electron.js",
          "JavaScript",
          "TypeScript",
        ],
        background: "blue",
      },
      {
        title: "Backend",
        skills: ["Node.js", "Express.js", "TypeORM", "JWT", "WebSockets"],
        background: "green",
      },
      {
        title: "Banco de Dados",
        skills: ["Microsoft SQL Server", "PostgreSQL", "MongoDB"],
        background: "purple",
      },
      {
        title: "Infraestrutura",
        skills: ["Nginx", "Docker", "Windows Server", "Linux"],
        background: "red",
      },
      {
        title: "Outros",
        skills: ["ActionScript", "C#", "API REST", "Graylog", "Sentry"],
        background: "yellow",
      },
    ],
    portfolio: [
      {
        nome: "Sistema de Gestão Territorial",
        descricao:
          "Plataforma completa para gerenciamento de dados geográficos e regularização fundiária, com visualização de mapas interativos e integração com GeoServer.",
        imagens: ["/images/portfolio/wcogeo/1.png"],
        stacks: [
          "React.js",
          "Node.js",
          "PostgreSQL",
          "GeoServer",
          "OpenLayers",
        ],
      },
      {
        nome: "Plataforma de Jogos Online",
        descricao:
          "Ecossistema completo para jogo online incluindo site, sistema de pagamentos, integrações e dashboard administrativo.",
        imagens: [
          "/images/portfolio/ddtankUniverse/1.png",
          "/images/portfolio/ddtankUniverse/2.png",
          "/images/portfolio/ddtankUniverse/3.png",
          "/images/portfolio/ddtankUniverse/4.png",
          "/images/portfolio/ddtankUniverse/5.png",
          "/images/portfolio/ddtankUniverse/6.png",
          "/images/portfolio/ddtankUniverse/7.png",
        ],
        stacks: ["Next.js", "Express.js", "SQL Server", "WebSockets", "Docker"],
      },
      {
        nome: "Aplicativo MT Cidadão",
        descricao:
          "Aplicativo mobile oficial do estado de Mato Grosso que reúne diversos serviços públicos em uma única plataforma, permitindo aos cidadãos acessar informações e serviços do governo de forma prática e rápida.",
        imagens: [],
        stacks: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase"],
      },
    ],
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/lucas-amaral-desenvolvedor/",
      },
      {
        name: "GitHub",
        url: "https://github.com/LucasAmaralDev",
      },
      {
        name: "Email",
        url: "mailto:lucasamaraltecnologia@gmail.com",
      },
    ],
    experiencias: [
      {
        empresa: "DDTank Universe",
        cargo: "Desenvolvedor Full Stack",
        periodo: "Set 2024 - Atual (7 meses)",
        local: "Remoto",
        descricao:
          "Atuo como desenvolvedor full stack no DDTank Universe, um servidor inovador e completo do clássico jogo DDTank. Faço parte da equipe responsável por todo o ecossistema digital, desde o site oficial até o sistema do jogo, versão mobile, plataforma de pagamentos e sistemas de recompensas.",
        atividades: [
          "Desenvolvimento Frontend: Construção de interfaces modernas e responsivas com React.js, Next.js e Electron.js.",
          "Desenvolvimento Backend: Implementação de APIs robustas em Node.js com Express.js, autenticação JWT e WebSockets.",
          "Banco de Dados: Modelagem e otimização de consultas em Microsoft SQL Server, utilizando TypeORM.",
          "Infraestrutura: Configuração de servidores com Nginx para entrega eficiente de conteúdos e segurança.",
        ],
      },
      {
        empresa: "Empresa Mato-grossense de Tecnologia da Informação",
        cargo: "Desenvolvedor de Software",
        periodo: "Fev 2024 - Mar 2025 (1 ano e 2 meses)",
        local: "Remoto",
        descricao:
          "Atuei no desenvolvimento e padronização de templates para React e Node.js, acelerando o início de novos projetos e garantindo maior consistência entre equipes.",
        atividades: [
          "Manutenção e evolução dos sistemas do Detran-MT e do aplicativo MT Cidadão.",
          "Correção de bugs críticos e melhoria de performance em plataformas mobile e web.",
          "Refatoração de código para aumentar a legibilidade e facilitar a manutenção.",
        ],
      },
      {
        empresa: "WCOGEO",
        cargo: "Desenvolvedor Full Stack - Georeferenciamento e Integrações",
        periodo: "Ago 2023 - Out 2024 (1 ano e 3 meses)",
        local: "Presencial",
        descricao:
          "Atuei no desenvolvimento de um sistema SaaS completo de georreferenciamento, voltado para otimizar a gestão de prefeituras em processos de regularização fundiária e administração territorial.",
        atividades: [
          "Arquitetura e implementação de serviços backend com Node.js, TypeORM e PostgreSQL/SQL Server.",
          "Integração com GeoServer para processamento de dados geográficos.",
          "Desenvolvimento de interfaces interativas com ReactJS e OpenLayers.",
          "Gerenciamento de infraestrutura de servidores Windows e Linux.",
          "Configuração de Nginx e implementação de Docker containers para escalabilidade.",
        ],
      },
    ],
    contatos: [
      {
        icon: "FaEnvelope",
        title: "Email",
        value: "lucasamaraltecnologia@gmail.com",
        link: "mailto:lucasamaraltecnologia@gmail.com",
      },
      {
        icon: "FaLinkedin",
        title: "LinkedIn",
        value: "lucas-amaral-desenvolvedor",
        link: "https://www.linkedin.com/in/lucas-amaral-desenvolvedor/",
      },
      {
        icon: "FaGithub",
        title: "GitHub",
        value: "LucasAmaralDev",
        link: "https://github.com/LucasAmaralDev",
      },
      {
        icon: "FaWhatsapp",
        title: "WhatsApp",
        value: "55 (65) 9 99361-3207",
        link: "https://wa.me/55659993613207",
      },
    ],
  };

  return {
    props: {
      serverIm: JSON.stringify(serverIm),
    },
  };
}
