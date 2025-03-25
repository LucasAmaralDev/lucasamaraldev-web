export interface Im {
  name: string;
  cargo: string;
  image: string;
  slogan: string[];
  descricao: string;
  areasAtuacao: AreasAtuacao[];
  infos: Info[];
  habilidades: Habilidade[];
  portfolio: Portfolio[];
  links: Link[];
  experiencias: Experiencia[];
  contatos: Contato[];
}

export interface AreasAtuacao {
  text: string;
  icon: string;
  color: string;
}

export interface Info {
  title: string;
  value: string;
}

export interface Habilidade {
  title: string;
  skills: string[];
  background: string;
}

export interface Portfolio {
  nome: string;
  descricao: string;
  imagens: string[];
  stacks: string[];
}

export interface Link {
  name: string;
  url: string;
}

export interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  local: string;
  descricao: string;
  atividades: string[];
}

export interface Contato {
  icon: string;
  title: string;
  value: string;
  link: string;
}
